using System.Collections.Generic;
using System.Threading.Tasks;
using MET.API.Models;

namespace MET.API.Data
{
    public interface IMETRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
         Task<IEnumerable<Project>> GetProjects();
        Task<Project> GetProject(int id);
        Task<IEnumerable<Module>> GetModules();
        Task<Module> GetModule(int id); 
        Task<IEnumerable<Module>> GetModulesByProject(int projectId);
        Task<Request> GetRequest(int requestId);     
        Task<IEnumerable<Request>> GetRequests();

    }
}