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
    public class ProjectsController : ControllerBase
    {
        private readonly IMETRepository _repo;
        public ProjectsController(IMETRepository repo)
        {
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var projects = await _repo.GetProjects();
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _repo.GetProject(id);
            return Ok(project);
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddProjectDto project)
        {
          var projectToCreate = new Project {
              ProjectName = project.ProjectName
          };

          var createdProject = await _repo.AddProject(projectToCreate);
          
          return Ok(createdProject); 

        }

    }
}