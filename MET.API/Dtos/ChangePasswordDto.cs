using System.ComponentModel.DataAnnotations;

namespace MET.API.Dtos
{
    public class ChangePasswordDto
    {
        [Required]
        public string Password { get; set; }
    }
}