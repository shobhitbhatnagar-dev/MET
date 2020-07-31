using System;

namespace MET.API.Models
{
    public class Release
    {
        public int Id { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string ReleaseNoteUrl { get; set; }
        public string PublicId { get; set; }
        public string Title { get; set; }
        public DateTime UpdatedOn { get; set; }= DateTime.Now;
        
    }
}