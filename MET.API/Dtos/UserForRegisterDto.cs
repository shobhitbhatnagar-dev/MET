using System.ComponentModel.DataAnnotations;

namespace MET.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(12, MinimumLength = 6, ErrorMessage = "Please Enter a Password with atleat 6 characters and maximum 12 characters")]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Department { get; set; }
        public string Role { get; set; }
        public string Project { get; set; }

    }
}