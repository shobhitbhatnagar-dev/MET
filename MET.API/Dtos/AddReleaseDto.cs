using System;
using System.ComponentModel.DataAnnotations;

namespace MET.API.Dtos
{
    public class AddReleaseDto
    {
        [Required]
        public DateTime ReleaseDate { get; set; }
        public string ReleaseNoteUrl { get; set; }
        public string PublicId { get; set; }
        public string Title { get; set; }
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
    }
}