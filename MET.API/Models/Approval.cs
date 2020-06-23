using System;

namespace MET.API.Models
{
    public class Approval
    {
        public int Id { get; set; }
        public int FinalEfforts { get; set; }
        public string Approver { get; set; }
        public int ApproverId { get; set; }
        public DateTime ApprovalDate { get; set; } = DateTime.Now;
    }
}