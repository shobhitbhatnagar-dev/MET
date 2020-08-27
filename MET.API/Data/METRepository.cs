using System.Collections.Generic;
using System.Threading.Tasks;
using MET.API.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MET.API.Helpers;
using System;

namespace MET.API.Data
{
    public class METRepository : IMETRepository
    {
        private readonly DataContext _context;
        public METRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Module> GetModule(int id)
        {
            var module = await _context.Modules.FirstOrDefaultAsync(m => m.Id == id);

            return module;
        }

        public async Task<IEnumerable<Module>> GetModules()
        {
            var modules = await _context.Modules.ToListAsync();

            return modules;
        }

        public async Task<IEnumerable<Module>> GetModulesByProject(int projectId)
        {
            var modules = await _context.Modules.Where(m => m.Project.Id == projectId).ToListAsync();
            return modules;
        }

        public async Task<Project> GetProject(int id)
        {
            var projects = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id);
            return projects;
        }

        public async Task<bool> CheckProject(string projectName)
        {
            if( await _context.Projects.AnyAsync(p => p.ProjectName == projectName))
            {
              return true;
            }

            return false;
        }

        public async Task<bool> CheckProjectId(int projectId)
        {
            if( await _context.Projects.AnyAsync(p => p.Id == projectId))
            {
              return true;
            }

            return false;
        }

         public async Task<bool> CheckModule(string moduleName)
        {
            if( await _context.Modules.AnyAsync(m => m.ModuleName == moduleName))
            {
              return true;
            }

            return false;
        }

        public async Task<IEnumerable<Project>> GetProjects()
        {
            var projects = await _context.Projects.ToListAsync();

            return projects;
        }

        public async Task<PagedList<Request>> GetRequests(RequestPrams requestPrams)
        {
            var requests = _context.Requests.OrderByDescending(CreationDate => CreationDate).AsQueryable();

            if(requestPrams.ProjectId != 0)
            { 
                requests = requests.Where(r => r.Project.Id == requestPrams.ProjectId);
            }
            

            return await PagedList<Request>.CreateAsync(requests, requestPrams.PageNumber, requestPrams.PageSize);
        }

        public async Task<Request> GetRequest(int requestId)
        {
            var request = await _context.Requests.FirstOrDefaultAsync(r => r.Id == requestId);

            return request;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Request> AddRequests(Request request)
        {
            await _context.Requests.AddAsync(request);
            await _context.SaveChangesAsync();

            return request;
        }

        public async Task<Attachment> AddAttachment(Attachment attachment)
        {
            await _context.Attachments.AddAsync(attachment);
            await _context.SaveChangesAsync();

            return attachment;
        }

        public async Task<PagedList<Request>> GetRequestsbyStatus(string status, RequestPrams requestPrams)
        {
            var requests = _context.Requests.OrderByDescending(CreationDate => CreationDate).AsQueryable();

            requests = requests.Where(r => r.Status == status);

            if(requestPrams.ProjectId != 0)
            { 
                requests = requests.Where(r => r.Project.Id == requestPrams.ProjectId) ;
            }

            return await PagedList<Request>.CreateAsync(requests, requestPrams.PageNumber, requestPrams.PageSize);
        }

        public async Task<PagedList<Request>> GetRequestsbyUser(int id, RequestPrams requestPrams)
        {
            var requests = _context.Requests.OrderByDescending(CreationDate => CreationDate).AsQueryable();
            
            requests = requests.Where(u => u.User.Id == id);

            if(requestPrams.ProjectId != 0)
            { 
                requests = requests.Where(r => r.Project.Id == requestPrams.ProjectId) ;
            }

            return await PagedList<Request>.CreateAsync(requests, requestPrams.PageNumber, requestPrams.PageSize);
        }

        public async Task<Effort> AddEfforts(Effort Effort)
        {
            await _context.Efforts.AddAsync(Effort);
            await _context.SaveChangesAsync();

            return Effort;
        }

        public async Task<Approval> AddApproval(Approval Approval)
        {
            await _context.Approvals.AddAsync(Approval);
            await _context.SaveChangesAsync();

            return Approval;
        }

        public async Task<Timeline> AddTimeline(Timeline Timeline)
        {
            await _context.AddAsync(Timeline);
            await _context.SaveChangesAsync();

            return Timeline;
        }

        public async Task<UAT> AddUAT(UAT UAT)
        {
            await _context.AddAsync(UAT);
            await _context.SaveChangesAsync();

            return UAT;
        }

        public async Task<Release> AddRelease(Release Release)
        {
            await _context.AddAsync(Release);
            await _context.SaveChangesAsync();

            return Release;
        }

        public async Task<Project> AddProject(Project Project)
        {
            await _context.AddAsync(Project);
            await _context.SaveChangesAsync();

            return Project;
        }

        public async Task<Module> AddModule(Module Module)
        {
            await _context.AddAsync(Module);
            await _context.SaveChangesAsync();

            return Module;
        }

        public async Task<Attachment> GetAttachment(int id)
        {
            var attachment = await _context.Attachments.FirstOrDefaultAsync(a => a.Id == id);

            return attachment;
        }

         public async Task<IEnumerable<Request>> GetRequestbyApprovalDate(DateTime StartDate, DateTime EndDate)
        {
             var requests = _context.Requests.AsQueryable();

            requests =  requests.Where(r => r.Approval.ApprovalDate > StartDate && r.Approval.ApprovalDate < EndDate);

            var result = await requests.ToListAsync();

            return result;
        }

        public async Task<IEnumerable<Request>> GetRequestbyCreatedDate(DateTime StartDate, DateTime EndDate)
        {
             var requests = _context.Requests.AsQueryable();

            requests =  requests.Where(r => r.CreationDate > StartDate && r.CreationDate < EndDate);

            var result = await requests.ToListAsync();

            return result;
        }

        public async Task<bool> CheckModulevsProject(int ModuleId, int ProjectId)
        {
            var module = await _context.Modules.FirstOrDefaultAsync(m => m.Id == ModuleId);

            if(module.Project.Id == ProjectId)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}