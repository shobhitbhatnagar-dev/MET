using System.ComponentModel.DataAnnotations;

namespace MET.API.Dtos
{
    public class UserForLoginDto
    {   [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}