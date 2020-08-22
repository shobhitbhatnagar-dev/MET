using System;
using System.Threading.Tasks;
using MET.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MET.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync( x => x.Username == username);

            if(user == null)
            return null;

            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            return null;

            return user;
        }   

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i=0 ; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
                return true;
            }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

          
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }
        
         public async Task<User> ChangePassword(int UserId, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);

            if(user != null)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);
                
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;

                await _context.SaveChangesAsync();

                return user;
            }
            else
            {
                return null;
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
           {
               passwordSalt = hmac.Key;
               passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

           }
        }

        public async Task<bool> UserExists(string username, string email)
        {
            if(await _context.Users.AnyAsync(x => x.Username == username))
            return true;
            if(await _context.Users.AnyAsync(x => x.EmailId == email))
            return true;
            
            return false;
        }

        public async Task<User> GetUser(int Id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == Id);
            return user;
        }

        public async Task<bool> UpdateLastActive(int Id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == Id);
            user.LastActive = DateTime.Now;
            return true;
        }

    }
}