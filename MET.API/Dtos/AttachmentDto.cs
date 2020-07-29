using Microsoft.AspNetCore.Http;

namespace MET.API.Dtos
{
    public class AttachmentDto
    {
        public int Id { get; set; }
        public IFormFile File { get; set; }
        public string Title { get; set; }
        public string PublicId { get; set; }
    }
}