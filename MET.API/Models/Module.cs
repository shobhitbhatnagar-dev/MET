using System;

namespace MET.API.Models
{
    public class Module
    {
        public int Id { get; set; }
        public string ModuleName { get; set; }
        public DateTime CreatedOn { get; set; }= DateTime.Now;
        public virtual Project Project { get; set; }
    }
}