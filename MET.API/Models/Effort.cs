using System;

namespace MET.API.Models
{
    public class Effort
    {
        public int Id { get; set; }
        public int Estimation { get; set; }
        public string WbsUrl { get; set; }
        public string Title { get; set; }
        public string PublicId { get; set; }
        public DateTime SubmittedDate { get; set; }= DateTime.Now;
    }
}