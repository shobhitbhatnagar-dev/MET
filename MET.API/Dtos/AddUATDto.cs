using System;

namespace MET.API.Dtos
{
    public class AddUATDto
    {
        public DateTime StartDate { get; set; }
        public DateTime SignOffDate { get; set; }
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
    }
}