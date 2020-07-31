
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using MET.API.Data;
using MET.API.Dtos;
using MET.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MET.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config )
        {
            _config = config;
            _repo = repo;
        }

        [HttpPost("register")]

        public async Task<ActionResult> Register(UserForRegisterDto userForrRegisterDto)
        {
            //  validate request

            userForrRegisterDto.Username = userForrRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userForrRegisterDto.Username, userForrRegisterDto.Email))
            {
                return BadRequest("Username or Email Id already exists");
            }

            var userToCreate = new User
            {
                Username = userForrRegisterDto.Username,
                EmailId = userForrRegisterDto.Email,
                Department = userForrRegisterDto.Department,
                Role = userForrRegisterDto.Role,
                Status = 1
            };

            var createdUser = await _repo.Register(userToCreate, userForrRegisterDto.Password);

            return StatusCode(201);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userForRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userForRepo == null)
                return Unauthorized();

            if (userForRepo.Status == 0)
                return Unauthorized("User is Disabled");

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userForRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userForRepo.Username),
                new Claim(ClaimTypes.Role, userForRepo.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials( key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        } 
    }
}