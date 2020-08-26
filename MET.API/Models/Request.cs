using System;

namespace MET.API.Models
{
    public class Request
    {
        public int Id { get; set; }
        public virtual User User { get; set; }
        public virtual Project Project { get; set; }
        public virtual Module  Module { get; set; }
        public string Title { get; set; }
        public string Requierment { get; set; }
        public string Priority { get; set; }
        public string Justification { get; set; }
        public virtual Attachment Attachment { get; set; }
        public virtual Effort Effort { get; set; }
        public virtual Approval Approval { get; set; }
        public virtual Release Release { get; set; }
        public virtual Timeline Timeline { get; set; }
        public virtual UAT UAT { get; set; }
        public DateTime CreationDate { get; set; }= DateTime.Now;
        public string Status { get; set; }
    }
}