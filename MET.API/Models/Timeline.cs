using System;

namespace MET.API.Models
{
    public class Timeline
    {
        public int Id { get; set; }
        public DateTime PlannedDate{ get; set; }
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
    }
}