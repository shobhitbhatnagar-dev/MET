using System;

namespace MET.API.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string EmailId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastActive { get; set; }
        public string Department { get; set; }
        public int Role { get; set; }
        public bool Status { get; set; }
    }
}