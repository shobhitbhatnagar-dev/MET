using System;

namespace MET.API.Dtos
{
    public class AddApproval
    {
        public int FinalEfforts { get; set; }
        public string Approver { get; set; }
        public int ApproverId { get; set; }
        public DateTime ApprovalDate { get; set; } = DateTime.Now;
    }
}