using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace MET.API.Controllers
{
    public class FallbackController : Microsoft.AspNetCore.Mvc.Controller
    {
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(),"wwwroot", "index.html"), "text/HTML");
        }   
    }
}