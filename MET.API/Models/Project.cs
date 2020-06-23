using System;
namespace MET.API.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string ProjectName { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}