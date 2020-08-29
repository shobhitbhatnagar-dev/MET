using System;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MET.API.Data;
using MET.API.Helpers;
using MET.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;

namespace MET.API.Controllers
{
    [Authorize]
    [Route("api/attachments/")]
    [ApiController]
    public class AttachmentsController : ControllerBase
    {
        private readonly IMETRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _CloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly IHostingEnvironment _eve;

        public AttachmentsController(IMETRepository repo, IMapper mapper, IHostingEnvironment eve, IOptions<CloudinarySettings> CloudinaryConfig)
        {
            _eve = eve;
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

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> AddAttachment([FromForm] IFormFile fileRecived)
        {
            var file = Request.Form.Files[0];

            // var uploadResult = new RawUploadResult();
            try
            {
                if (file == null)
                {
                    return BadRequest();
                }
                // Setting up File Directory\
                var dir = _eve.ContentRootPath; 
                var folderName = Path.Combine("Files");
                var pathToSave = Path.Combine(dir, folderName);

                //Creating randomfilename
                var guid = Guid.NewGuid().ToString();
                var extention = Path.GetExtension(file.FileName);
                var fileName = guid + "_" + file.FileName ;// + extention;
                var OrginalfileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                //Final Path and URl to store in db
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                if (file.Length > 0)
                {
                    //Checking if this Directory Exsists
                    if (!Directory.Exists(pathToSave))
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    //Creating File on Server and coping content
                    using (FileStream filestream = System.IO.File.Create(fullPath))
                    {
                        await file.CopyToAsync(filestream);
                        filestream.Flush();
                    }

                    //Prepring response
                    var attachmentToCreate = new Attachment
                    {
                        Url = "https://nsdcit.azurewebsites.net/" + dbPath,
                        //Url = "https://localhost:5000/" + dbPath,
                        PublicId = guid,
                        Title = OrginalfileName
                    };
                    return Ok(attachmentToCreate);
                }
                else
                {
                    return BadRequest("Blank File can not be upload");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
            return BadRequest("Some Issue has occured");
        }
    }
}

// Refence for File Upload to server process : https://code-maze.com/upload-files-dot-net-core-angular/