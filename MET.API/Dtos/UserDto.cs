using System;

namespace MET.API.Dtos
{
    public class UserDto
    {
         public int Id { get; set; }
        public string Username { get; set; }
        public string EmailId { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Department { get; set; }
        public string Role { get; set; }
        public int Status { get; set; }
    }
}