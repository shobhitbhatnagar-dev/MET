using System;

namespace MET.API.Dtos
{
    public class AddUATDto
    {
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime SignOffDate { get; set; } = DateTime.Now;
        public string UATApproval { get; set; }
        public string Title { get; set; }
        public string PublicId { get; set; }
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
    }
}