using System.Linq;
using System.Threading.Tasks;
using MET.API.Data;
using MET.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MET.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        private readonly DataContext _context;

        public AnalyticsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCountsByStatus()
        {
            var requests = _context.Requests.AsQueryable();

            var iTdashboardDto = new ITDashboadDto { };
            iTdashboardDto.RequestsCount = await requests.CountAsync();
            iTdashboardDto.PendingEffortCount =
                await requests.Where(r => r.Status == "new").CountAsync();
            iTdashboardDto.PendingApprovalCount =
                await requests.Where(r => r.Status == "effort").CountAsync();
            iTdashboardDto.PendingTimelinesCount =
                await requests.Where(r => r.Status == "approval").CountAsync();
            iTdashboardDto.PendingUATCount =
                await requests.Where(r => r.Status == "uat").CountAsync();
            iTdashboardDto.PendingReleaseCount =
                await requests.Where(r => r.Status == "release").CountAsync();
            iTdashboardDto.CompletedCount =
                await requests.Where(r => r.Status == "complete").CountAsync();

            return Ok(iTdashboardDto);
        }

        [HttpGet("bymodules")]
        public async Task<IActionResult> GetModuleWiseCount()
        {
            var Query =
                from request in _context.Requests.Include(m => m.Module)
                group request by request.Module.Id
                into
                grp
                select
                new {
                    ModuleName = grp.First().Module.ModuleName,
                    RequestCount = grp.Count()
                };

            var result = await Query.ToListAsync();

            return Ok(result);
        }

        [HttpGet("byprojects")]
        public async Task<IActionResult> GetProjectWiseCount()
        {
            var Query =
                from request in _context.Requests.Include(m => m.Project)
                group request by request.Project.Id
                into
                grp
                select
                new {
                    ProjectName = grp.First().Project.ProjectName,
                    RequestCount = grp.Count()
                };

            var result = await Query.ToListAsync();

            return Ok(result);
        }

        [HttpGet("bydepartment")]
        public async Task<IActionResult> GetDepartmentWiseCount()
        {
            var Query =
                from request in _context.Requests.Include(m => m.User)
                group request by request.User.Department
                into
                grp
                select
                new {
                    Department = grp.First().User.Department,
                    RequestCount = grp.Count()
                };

            var result = await Query.ToListAsync();

            return Ok(result);
        }

        [HttpGet("byuser")]
        public async Task<IActionResult> GetUserWiseCount()
        {
            var Query =
                from request in _context.Requests.Include(m => m.User)
                group request by request.User.Id
                into
                grp
                select
                new {
                    UserName = grp.First().User.Username,
                    RequestCount = grp.Count()
                };

            var result = await Query.ToListAsync();

            return Ok(result);
        }

        [HttpGet("bydate")]
        public async Task<IActionResult> GetCountbyStatusbyDates([FromQuery]AnalyticsPramDto analyticsPramDto)
        {
            var requests = _context.Requests.Include(a => a.Approval).AsQueryable();

            requests = requests.Where(r => r.Approval.ApprovalDate > analyticsPramDto.StartDate && r.Approval.ApprovalDate < analyticsPramDto.EndDate);

            var iTdashboardDto = new ITDashboadDto { };
            iTdashboardDto.RequestsCount = await requests.CountAsync();
            iTdashboardDto.PendingEffortCount =
                await requests.Where(r => r.Status == "new").CountAsync();
            iTdashboardDto.PendingApprovalCount =
                await requests.Where(r => r.Status == "effort").CountAsync();
            iTdashboardDto.PendingTimelinesCount =
                await requests.Where(r => r.Status == "approval").CountAsync();
            iTdashboardDto.PendingUATCount =
                await requests.Where(r => r.Status == "uat").CountAsync();
            iTdashboardDto.PendingReleaseCount =
                await requests.Where(r => r.Status == "release").CountAsync();
            iTdashboardDto.CompletedCount =
                await requests.Where(r => r.Status == "complete").CountAsync();

            return Ok(iTdashboardDto);
        }

        [HttpGet("bymodulesbydate")]
        public async Task<IActionResult> GetModuleWiseCountbydate([FromQuery]AnalyticsPramDto analyticsPramDto)
        {
            var Query =
                from request in _context.Requests.Include(m => m.Module).Include(a => a.Approval)
                .Where(r => r.Approval.ApprovalDate > analyticsPramDto.StartDate && r.Approval.ApprovalDate < analyticsPramDto.EndDate)
                group request by request.Module.Id
                into
                grp
                select
                new {
                    ModuleName = grp.First().Module.ModuleName,
                    RequestCount = grp.Count(),
                    ApprovedEffort = grp.Sum(a => a.Approval.FinalEfforts)
                };

            var result = await Query.ToListAsync();

            return Ok(result);
        }

        [HttpGet("bydepartmentbydate")]
        public async Task<IActionResult> GetDepartmentWiseCountbyDate([FromQuery]AnalyticsPramDto analyticsPramDto)
        {
            var Query =
                from request in _context.Requests.Include(m => m.User).Include(a => a.Approval)
                .Where(r => r.Approval.ApprovalDate > analyticsPramDto.StartDate && r.Approval.ApprovalDate < analyticsPramDto.EndDate)
                group request by request.User.Department
                into
                grp
                select
                new {
                    Department = grp.First().User.Department,
                    RequestCount = grp.Count(),
                    ApprovedEffort = grp.Sum(a => a.Approval.FinalEfforts)
                };

            var result = await Query.ToListAsync();

            return Ok(result);
        }
    }
}
