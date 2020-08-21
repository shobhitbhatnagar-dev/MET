using System;

namespace MET.API.Dtos
{
    public class AnalyticsPramDto
    {
        public DateTime StartDate { get; set; } = System.DateTime.Now.AddDays(-30);
        public DateTime EndDate { get; set; } = System.DateTime.Now ;
        
    }
}