using System;

namespace MET.API.Models
{
    public class Approval
    {
        public int Id { get; set; }
        public int FinalEfforts { get; set; }
        public string Approver { get; set; }
        public int ApproverId { get; set; }
        public string ApprovalMail { get; set; }
        public string Title { get; set; }
        public string PublicId { get; set; }
        public bool UAT { get; set; }= false;
        public DateTime ApprovalDate { get; set; } = DateTime.Now;
    }
}