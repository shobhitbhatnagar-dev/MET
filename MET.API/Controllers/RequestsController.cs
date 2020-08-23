using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MET.API.Data;
using MET.API.Dtos;
using MET.API.Helpers;
using MET.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MET.API.Controllers
{
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
        public async Task<IActionResult> GetRequests([FromQuery]RequestPrams requestPram)
        {
            var requests = await _repo.GetRequests(requestPram);

            var requestToReturn = _mapper.Map<IEnumerable<RequestforlistDto>>(requests);
            Response.AddPagination(requests.CurrentPage, requests.PageSize, requests.TotalCount, requests.TotalPages);
            
            return Ok(requestToReturn);
        }

        [HttpGet("bystatus/{status}")]
        public async Task<IActionResult> GetRequestsbyStatus(string status,[FromQuery] RequestPrams requestPrams)
        {
            var requests = await _repo.GetRequestsbyStatus(status, requestPrams);

            var requestToReturn = _mapper.Map<IEnumerable<RequestforlistDto>>(requests);
            Response.AddPagination(requests.CurrentPage, requests.PageSize, requests.TotalCount, requests.TotalPages);

            return Ok(requestToReturn);
        }

        [HttpGet("byuser/{id}")]
        public async Task<IActionResult> GetRequestsbyUser(int id,[FromQuery] RequestPrams requestPrams)
        {
            var requests = await _repo.GetRequestsbyUser(id, requestPrams);

            var requestToReturn = _mapper.Map<IEnumerable<RequestforlistDto>>(requests);
            Response.AddPagination(requests.CurrentPage, requests.PageSize, requests.TotalCount, requests.TotalPages);

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

            if (request.AttachmentTitle != null && request.AttachmentUrl != null && request.PublicId != null)
            {
                var attachmentToCreate = new Attachment
                {
                    Url = request.AttachmentUrl,
                    Title = request.AttachmentTitle,
                    PublicId = request.PublicId,
                };

                var addedAttachment = await _repo.AddAttachment(attachmentToCreate);

                newRequest.Attachment = addedAttachment;
            }

            var createdRequest = await _repo.AddRequests(newRequest);

            return Ok(createdRequest.Id);
        }


        [HttpPut("effort/{id}")]
        public async Task<IActionResult> UpdateEffort(int id, AddEffortDto EffortDto)
        {

            var requestfromRepo = await _repo.GetRequest(id);
            if (requestfromRepo == null)
            {
                throw new Exception($"Unable to find Request Id - {id}");
            }

            var effortToAdd = new Effort
            {
                Estimation = EffortDto.Estimation,
                WbsUrl = EffortDto.WbsUrl,
                Title = EffortDto.Title,
                PublicId = EffortDto.PublicId
            };

            var newEffort = await _repo.AddEfforts(effortToAdd);

            if (newEffort == null)
            {
                throw new Exception($"Unable to update efforts for Request Id - {id}");
            }

            requestfromRepo.Effort = newEffort;
            requestfromRepo.Status = "effort";

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating Efforts for Request - {id} failed on Save");
        }

        [HttpPut("approval/{id}")]
        public async Task<IActionResult> UpdateTimeline(int id, AddApprovalDto AddApprovalDto)
        {
            var requestfromRepo = await _repo.GetRequest(id);
            if (requestfromRepo == null)
            {
                throw new Exception($"Unable to find Request Id - {id}");
            }

            var ApprovalToAdd = new Approval
            {
                FinalEfforts = AddApprovalDto.FinalEfforts,
                Approver = AddApprovalDto.Approver,
                ApproverId = AddApprovalDto.ApproverId,
                ApprovalMail = AddApprovalDto.ApprovalMail,
                Title = AddApprovalDto.Title,
                PublicId = AddApprovalDto.PublicId,
                UAT = AddApprovalDto.UAT
            };

            var newApproval = await _repo.AddApproval(ApprovalToAdd);

            if (newApproval == null)
            {
                throw new Exception($"Unable to update efforts for Request Id - {id}");
            }

            requestfromRepo.Approval = newApproval;
            requestfromRepo.Status = "approval";

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating Efforts for Request - {id} failed on Save");
        }


        [HttpPut("timeline/{id}")]
        public async Task<IActionResult> UpdateTimeline(int id, AddTimelineDto AddTimelineDto)
        {
            var requestfromRepo = await _repo.GetRequest(id);
            if (requestfromRepo == null)
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
            if(requestfromRepo.Approval.UAT)
            {
                requestfromRepo.Status = "uat";
            }
            else
            {
                requestfromRepo.Status = "release";
            }
            

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating Efforts for Request - {id} failed on Save");
        }

        [HttpPut("uat/{id}")]
        public async Task<IActionResult> UpdateUAT(int id, AddUATDto AddUATDto)
        {
            var requestfromRepo = await _repo.GetRequest(id);
            if (requestfromRepo == null)
            {
                throw new Exception($"Unable to find Request Id - {id}");
            }

            var UATToAdd = new UAT
            {
                StartDate = AddUATDto.StartDate,
                SignOffDate = AddUATDto.SignOffDate,
                PublicId = AddUATDto.PublicId,
                UATApproval = AddUATDto.UATApproval,
                Title = AddUATDto.Title
            };

            var newUAT = await _repo.AddUAT(UATToAdd);

            if (newUAT == null)
            {
                throw new Exception($"Unable to update efforts for Request Id - {id}");
            }

            requestfromRepo.UAT = newUAT;
            requestfromRepo.Status = "release";

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating Efforts for Request - {id} failed on Save");
        }

        [HttpPut("release/{id}")]
        public async Task<IActionResult> UpdateRelease(int id, AddReleaseDto AddReleaseDto)
        {
            var requestfromRepo = await _repo.GetRequest(id);
            if (requestfromRepo == null)
            {
                throw new Exception($"Unable to find Request Id - {id}");
            }

            var ReleaseToAdd = new Release
            {
                ReleaseDate = AddReleaseDto.ReleaseDate,
                ReleaseNoteUrl = AddReleaseDto.ReleaseNoteUrl,
                Title = AddReleaseDto.Title,
                PublicId = AddReleaseDto.PublicId
            };

            var newRelease = await _repo.AddRelease(ReleaseToAdd);

            if (newRelease == null)
            {
                throw new Exception($"Unable to update efforts for Request Id - {id}");
            }

            requestfromRepo.Release = newRelease;
            requestfromRepo.Status = "complete";

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating Efforts for Request - {id} failed on Save");
        }

        [HttpGet("byapprovaldate")]
        public async Task<IActionResult> GetRequestsbyApprovalDates([FromQuery]AnalyticsPramDto analyticsPramDto)
        {
           var requests = await _repo.GetRequestbyApprovalDate(analyticsPramDto.StartDate, analyticsPramDto.EndDate);

           return Ok(requests);
        }

        [HttpGet("bycreateddate")]
        public async Task<IActionResult> GetRequestsbyCreatedDates([FromQuery]AnalyticsPramDto analyticsPramDto)
        {
           var requests = await _repo.GetRequestbyCreatedDate(analyticsPramDto.StartDate, analyticsPramDto.EndDate);

           return Ok(requests);
        }
    }
}