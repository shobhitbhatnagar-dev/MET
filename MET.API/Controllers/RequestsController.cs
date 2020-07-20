namespace MET.API.Controllers
{
    using System;
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
        
        [HttpGet("bystatus/{status}")]
        public async Task<IActionResult> GetRequestsbyStatus(string status)
        {
            var requests = await _repo.GetRequestsbyStatus(status);

            var requestToReturn = _mapper.Map<IEnumerable<RequestforlistDto>>(requests);

            return Ok(requestToReturn);
        }

        [HttpGet("byuser/{id}")]
        public async Task<IActionResult> GetRequestsbyUser(int id)
        {
            var requests = await _repo.GetRequestsbyUser(id);

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


        [HttpPut("effort/{id}")]
        public async Task<IActionResult> UpdateEffort(int id, AddEffortDto EffortDto)
        {
            var requestfromRepo = await _repo.GetRequest(id);
            if(requestfromRepo == null)
            {
                throw new Exception($"Unable to find Request Id - {id}");
            }

            var effortToAdd = new Effort
            {
                Estimation = EffortDto.Estimation,
                WbsUrl = EffortDto.WbsUrl
            };

            var newEffort = await _repo.AddEfforts(effortToAdd);

            if(newEffort == null)
            {
                throw new Exception($"Unable to update efforts for Request Id - {id}");
            }

            requestfromRepo.Effort = newEffort;  
            requestfromRepo.Status = "effort";
        
            if(await _repo.SaveAll() )
            return NoContent();
            
            throw new Exception($"Updating Efforts for Request - {id} failed on Save");
        }

        [HttpPut("timeline/{id}")]
        public async Task<IActionResult> UpdateTimeline(int id, AddTimelineDto AddTimelineDto)
        {
            var requestfromRepo = await _repo.GetRequest(id);
            if(requestfromRepo == null)
            {
                throw new Exception($"Unable to find Request Id - {id}");
            }

            var TimelineToAdd = new Timeline
            {
                PlannedDate = AddTimelineDto.PlannedDate
            };

            var newTimeline = await _repo.AddTimeline(TimelineToAdd);

            if (newTimeline == null)
            {
                throw new Exception($"Unable to update efforts for Request Id - {id}");
            }

            requestfromRepo.Timeline = newTimeline;  
            requestfromRepo.Status = "timelines";
        
            if(await _repo.SaveAll() )
            return NoContent();
            
            throw new Exception($"Updating Efforts for Request - {id} failed on Save");
        }

         [HttpPut("release/{id}")]
        public async Task<IActionResult> UpdateRelease(int id, AddReleaseDto AddReleaseDto)
        {
            var requestfromRepo = await _repo.GetRequest(id);
            if(requestfromRepo == null)
            {
                throw new Exception($"Unable to find Request Id - {id}");
            }

            var ReleaseToAdd = new Release
            {
                ReleaseDate = AddReleaseDto.ReleaseDate,
                ReleaseNoteUrl = AddReleaseDto.ReleaseNoteUrl
                
            };

            var newRelease = await _repo.AddRelease(ReleaseToAdd);

            if (newRelease == null)
            {
                throw new Exception($"Unable to update efforts for Request Id - {id}");
            }

            requestfromRepo.Release = newRelease;  
            requestfromRepo.Status = "Complete";
        
            if(await _repo.SaveAll() )
            return NoContent();
            
            throw new Exception($"Updating Efforts for Request - {id} failed on Save");
        }
    }
}