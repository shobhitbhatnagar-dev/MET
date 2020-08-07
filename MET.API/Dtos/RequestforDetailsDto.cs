using System;
using MET.API.Models;

namespace MET.API.Dtos
{
    public class RequestforDetailsDto
    {
        public int Id { get; set; }
        public UserDto User { get; set; }
        public ProjectDto Project { get; set; }
        public ModuleDto Module { get; set; }
        public string Title { get; set; }
        public string Requierment { get; set; }
        public string Priority { get; set; }
        public string Justification { get; set; }
        public string AttachmentUrl { get; set; }
        public string AttachmentTitle { get; set; }
        public Effort Effort { get; set; }
        public Approval Approval { get; set; }
        public Release Release { get; set; }
        public Timeline Timeline { get; set; }
        public UAT UAT { get; set; }
        public DateTime CreationDate { get; set; }
        public string Status { get; set; }
    }
}