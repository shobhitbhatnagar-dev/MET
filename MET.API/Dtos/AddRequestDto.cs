using System;
using MET.API.Models;

namespace MET.API.Dtos
{
    public class AddRequestDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public int ModuleId { get; set; }
        public string Title { get; set; }
        public string Requierment { get; set; }
        public string Priority { get; set; }
        public string Justification { get; set; }
        public string AttachmentUrl { get; set; }
        public string AttachmentTitle { get; set; }
        public string Status { get; set; }
    }
}