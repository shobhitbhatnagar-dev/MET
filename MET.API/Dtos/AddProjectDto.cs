using System;

namespace MET.API.Dtos
{
    public class AddProjectDto
    {
        public string ProjectName { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}