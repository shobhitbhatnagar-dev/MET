using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MET.API.Data;
using MET.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MET.API.Controller
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMETRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IMETRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            var usertoreturn = _mapper.Map<IEnumerable<UserDto>>(users);
            return Ok(usertoreturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var usertoreturn = _mapper.Map<UserDto>(user);
            
            return Ok(usertoreturn);
        }

    }
}