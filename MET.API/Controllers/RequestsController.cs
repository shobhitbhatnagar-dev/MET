namespace MET.API.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoMapper;
    using MET.API.Data;
    using MET.API.Dtos;
    using MET.API.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly IMETRepository _repo;
        private readonly IMapper _mapper;
        private readonly IAuthRepository _auth;
        public RequestsController(IMETRepository repo, IMapper mapper, IAuthRepository auth)
        {
            _auth = auth;
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

        [HttpPost("add")]
        public async Task<IActionResult> Add(AddRequestDto request)
        {
            var user = await _auth.GetUser(request.UserId);
            var project = await _repo.GetProject(request.ProjectId);
            var module = await _repo.GetModule(request.ModuleId);


            var newRequest = new Request
            {
                User = user,
                Project = project,
                Module = module,
                Title = request.Title,
                Requierment = request.Requierment,
                Priority = request.Priority,
                Justification = request.Justification,
                Status = "new"
            };

            if (request.AttachmentTitle != null || request.AttachmentTitle != null)
            {
                var newattachment = new Attachment
                {
                    Title = request.AttachmentTitle,
                    Url = request.AttachmentUrl
                };
                var createdattachment = await _repo.AddAttachment(newattachment);
                newRequest.Attachment = createdattachment;
            }


            var createdRequest = await _repo.AddRequests(newRequest);

            return Ok(createdRequest.Id);
        }
    }
}