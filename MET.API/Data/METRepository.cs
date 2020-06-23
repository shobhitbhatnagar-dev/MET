using System.Collections.Generic;
using System.Threading.Tasks;
using MET.API.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

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
            var modules = await _context.Modules.Include(p => p.Project).Where(m => m.Project.Id == projectId).ToListAsync();
            return modules;
        }

        public async Task<Project> GetProject(int id)
        {
            var projects = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id);
            return projects;
        }

        public async Task<IEnumerable<Project>> GetProjects()
        {
            var projects = await _context.Projects.ToListAsync();

            return projects;
        }

        public async Task<IEnumerable<Request>> GetRequests()
        {
            var requests = await _context.Requests
            .Include(p => p.Project)
            .Include(m => m.Module)
            .Include(e => e.Effort)
            .Include(a => a.Approval)
            .Include(t => t.Timeline)
            .Include(r => r.Release)
            .Include(u => u.User)
            .Include(a => a.Attachment)
            .ToListAsync();

            return requests;
        }

        public async Task<Request> GetRequest(int requestId)
        {
            var request = await _context.Requests
            .Include(p => p.Project)
            .Include(m => m.Module)
            .Include(e => e.Effort)
            .Include(a => a.Approval)
            .Include(t => t.Timeline)
            .Include(r => r.Release)
            .Include(u => u.User)
            .Include(a => a.Attachment)
            .FirstOrDefaultAsync(r => r.Id == requestId);

            return request;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync( u => u.Id == id);

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
    }
}