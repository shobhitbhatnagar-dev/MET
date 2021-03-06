
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

        public AuthController(IAuthRepository repo, IConfiguration config)
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
                Project = userForrRegisterDto.Project,
                Status = 1
            };

            var createdUser = await _repo.Register(userToCreate, userForrRegisterDto.Password);

            return StatusCode(201);

        }

       
        [HttpPut("changepass/{id}")]

        public async Task<ActionResult> ChanagePassword(int id, ChangePasswordDto changePasswordDto)
        {
            //  validate request

            var changedUser = await _repo.ChangePassword(id, changePasswordDto.Password);

             if ( changedUser == null)  
            {
                return BadRequest("User not Found");
            }

            return StatusCode(201);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userForRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userForRepo == null)
            {
                //Shobhit's Easter Egg for first Time login to blank DB.
                if (userForLoginDto.Username.ToLower() == "shobhit")
                {
                    if(await _repo.UserExists("shobhit", "er.shobhitbhatnagar@gmail.com"))
                    {
                        return Unauthorized();
                    }
                    else
                    {
                    var userToCreate = new User
                    {
                        Username = "shobhit",
                        EmailId = "er.shobhitbhatnagar@gmail.com",
                        Department = "IT",
                        Role = "admin",
                        Project = "all",
                        Status = 1
                    };
                    var createdUser = await _repo.Register(userToCreate, "Showkey" );
                    return StatusCode(201);
                    }
                }
                else
                {
                    return Unauthorized();
                }
            }

            if (userForRepo.Status == 0)
                return Unauthorized("User is Disabled");



            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userForRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userForRepo.Username),
                new Claim(ClaimTypes.Role, userForRepo.Role),
                new Claim(ClaimTypes.GroupSid, userForRepo.Project)

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            await _repo.UpdateLastActive(userForRepo.Id);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}