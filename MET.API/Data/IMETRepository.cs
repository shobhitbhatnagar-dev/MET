using System.Collections.Generic;
using System.Threading.Tasks;
using MET.API.Dtos;
using MET.API.Helpers;
using MET.API.Models;

namespace MET.API.Data
{
    public interface IMETRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
        Task<IEnumerable<Project>> GetProjects();
        Task<Project> GetProject(int id);
        Task<IEnumerable<Module>> GetModules();
        Task<Module> GetModule(int id);
        Task<IEnumerable<Module>> GetModulesByProject(int projectId);
        Task<Request> GetRequest(int requestId);
         Task<int> GetRequestsCountbyStatus(string status);
        Task<PagedList<Request>> GetRequests(RequestPrams requestPrams );
        Task<PagedList<Request>> GetRequestsbyUser(int id, RequestPrams requestPrams);
        Task<PagedList<Request>> GetRequestsbyStatus(string status, RequestPrams requestPrams);
        Task<Request> AddRequests(Request request);
        Task<Attachment> AddAttachment(Attachment attachment);
        Task<Effort> AddEfforts(Effort Effort);
        Task<Approval> AddApproval(Approval Approval);
        Task<Timeline> AddTimeline(Timeline Timeline);
        Task<UAT> AddUAT(UAT UAT);
        Task<Release> AddRelease(Release Release);
        Task<Project> AddProject(Project Project);
        Task<Module> AddModule(Module Module);
        Task<Attachment> GetAttachment(int id);
    }
}