using System;
using System.ComponentModel.DataAnnotations;

namespace MET.API.Dtos
{
    public class AddEffortDto
    {
        [Required]
        public int Estimation { get; set; }
        public string WbsUrl { get; set; }
        public string Title { get; set; }
        public string PublicId { get; set; }
        public DateTime SubmittedDate { get; set; }= DateTime.Now;
    }
}