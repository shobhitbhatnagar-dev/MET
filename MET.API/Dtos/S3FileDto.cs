using System;

namespace MET.API.Dtos
{
    public class S3FileDto
    {
        public string Bucket{ get; set; }
        public string Key { get; set; }
        public string Url { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.Now;
    }
}