using System;

namespace MET.API.Models
{
    public class UAT
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime SignOffDate { get; set; }
        public string UATApproval { get; set; }
        public string Title { get; set; }
        public string PublicId { get; set; }
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
    }
}