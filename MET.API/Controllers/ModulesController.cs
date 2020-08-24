using System.Threading.Tasks;
using MET.API.Data;
using MET.API.Dtos;
using MET.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MET.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ModulesController : ControllerBase
    {
        private readonly IMETRepository _repo;
        public ModulesController(IMETRepository repo)
        {
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetModules()
        {
            var modules = await _repo.GetModules();

            return Ok(modules);
        }

        [HttpGet("byproject/{id}")]
        public async Task<IActionResult> GetModulebyProject(int id)
        {
            var modules = await _repo.GetModulesByProject(id);
            return Ok(modules);
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetModule(int id)
        {
            var module = await _repo.GetModule(id);
            return Ok(module);
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddModuleDto module)
        {
          if(await _repo.CheckModule(module.ModuleName))
          {
               return BadRequest("Module Name already exists");
          }
          if(!await _repo.CheckProjectId(module.projectId))
          {
               return BadRequest("Project Name is Mandatory");
          }
          var projectofMoule = await _repo.GetProject(module.projectId);
          var moduleToCreate = new Module {
              Project = projectofMoule,
              ModuleName = module.ModuleName
          };

          var createdModule = await _repo.AddModule(moduleToCreate);
          
          return Ok(createdModule); 

        }
    }
}