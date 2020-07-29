using System;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MET.API.Data;
using MET.API.Dtos;
using MET.API.Helpers;
using MET.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MET.API.Controllers
{
    [Authorize]
    [Route("api/attachments/{requestId}")]
    [ApiController]
    public class AttachmentsController : ControllerBase
    {
        private readonly IMETRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _CloudinaryConfig;
        private Cloudinary _cloudinary;

        public AttachmentsController(IMETRepository repo, IMapper mapper, IOptions<CloudinarySettings> CloudinaryConfig)
        {
            _CloudinaryConfig = CloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _CloudinaryConfig.Value.CloudName,
                _CloudinaryConfig.Value.ApiKey,
                _CloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);

        }

        [HttpGet("{id}", Name = "GetAttachment")]
        public async Task<IActionResult> GetAttachment(int id)
        {
            var attachmentFromRepo = await _repo.GetAttachment(id);

            return Ok(attachmentFromRepo);
        }


        [HttpPost]
        public async Task<IActionResult> AddAttachment(int requestId, [FromForm]AttachmentDto attachmentDto)
        {
            var requestfromRepo = await _repo.GetRequest(requestId);
            if (requestfromRepo == null)
            {
                throw new Exception($"Unable to find Request Id - {requestId}");
            }

            var file = attachmentDto.File;

            var uploadResult = new RawUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new RawUploadParams()
                    {
                        File = new FileDescription(file.FileName , stream)
                    };

                   uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            var attachmentToCreate = new Attachment{
                Url = uploadResult.Url.ToString(),
                PublicId = uploadResult.PublicId,
                Title = attachmentDto.File.FileName,
            };

            var addedAttachment = await _repo.AddAttachment(attachmentToCreate);

            if(addedAttachment == null)
            {
                return BadRequest("Could not upload the attachment");
            }

            return CreatedAtRoute("GetAttachment", new {id = addedAttachment.Id}, addedAttachment);
        }
    }
}