namespace MET.API.Dtos
{
    public class ITDashboadDto
    {
        public int RequestsCount { get; set; }
        public int PendingEffortCount { get; set; }
        public int PendingApprovalCount { get; set; }
        public int PendingTimelinesCount { get; set; }
        public int PendingUATCount { get; set; }
        public int PendingReleaseCount { get; set; }
        public int CompletedCount { get; set; }
    }
}