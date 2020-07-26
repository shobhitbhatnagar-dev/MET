using System;
using MET.API.Models;

namespace MET.API.Dtos
{
    public class AddModuleDto
    {
        public string ModuleName { get; set; }
        public int projectId { get; set; }
        public DateTime CreatedOn { get; set; }= DateTime.Now;
    }
}