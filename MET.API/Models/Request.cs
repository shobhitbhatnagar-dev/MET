using System;

namespace MET.API.Models
{
    public class Request
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Project Project { get; set; }
        public Module  Module { get; set; }
        public string Title { get; set; }
        public string Requierment { get; set; }
        public string Priority { get; set; }
        public string Justification { get; set; }
        public Attachment Attachment { get; set; }
        public Effort Effort { get; set; }
        public Approval Approval { get; set; }
        public Release Release { get; set; }
        public Timeline Timeline { get; set; }
        public DateTime CreationDate { get; set; }= DateTime.Now;
        public string Status { get; set; }
    }
}