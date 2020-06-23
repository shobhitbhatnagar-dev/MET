namespace MET.API.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoMapper;
    using MET.API.Data;
    using MET.API.Dtos;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly IMETRepository _repo;
        private readonly IMapper _mapper;
        public RequestsController(IMETRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetRequests()
        {
            var requests = await _repo.GetRequests();

            var requestToReturn = _mapper.Map<IEnumerable<RequestforlistDto>>(requests);

            return Ok(requestToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequest(int id)
        {
            var request = await _repo.GetRequest(id);

            var requestToReturn = _mapper.Map<RequestforDetailsDto>(request);

            return Ok(requestToReturn);
        }

    }
}