using System;
using System.ComponentModel.DataAnnotations;
namespace MET.API.Dtos
{
    public class AddProjectDto
    {
        [Required]
        public string ProjectName { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}