namespace MET.API.Helpers
{
    public class RequestPrams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; }

        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize: value ; }
        }
        
    }
}