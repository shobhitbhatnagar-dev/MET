using System.Threading.Tasks;
using MET.API.Models;

namespace MET.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username, string email);
         Task<User> GetUser(int Id);
         Task<bool> UpdateLastActive(int Id);
    }
}