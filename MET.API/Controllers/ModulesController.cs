using System.Threading.Tasks;
using MET.API.Data;
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

        
    }
}