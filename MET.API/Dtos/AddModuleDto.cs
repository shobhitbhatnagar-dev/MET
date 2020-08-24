using System;
using System.ComponentModel.DataAnnotations;

namespace MET.API.Dtos
{
    public class AddModuleDto
    {
        [Required]
        public string ModuleName { get; set; }
        [Required]
        public int projectId { get; set; }
        public DateTime CreatedOn { get; set; }= DateTime.Now;
    }
}