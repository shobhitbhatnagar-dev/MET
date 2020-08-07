using System;
using System.IO;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Transfer;
using MET.API.Helpers;
using Microsoft.Extensions.Options;

namespace MET.API.Data
{
    public class AwsRepository : IAwsRepository
    {
        private readonly IOptions<AWS> _AWS;

        private AmazonS3Client _client;

        public AwsRepository(IOptions<AWS> AWS)
        {
            _AWS = AWS;
           // _client = new AmazonS3Client(_AWS.Value.AwsAccessKey,_AWS.Value.AwsSecretKey, Amazon.RegionEndpoint.AFSouth1);
            
        }


        public async void AddFiletoS3(string key, string bucketName, Stream fileStream, string ContentType, string type)
        {
            _client = new AmazonS3Client("AKIAUAHEAGYWZ5GCRVI3", "EPj/hctOxgIP5a4x94KZ5i1rYBcALavNUmhKz3Cz", Amazon.RegionEndpoint.APSouth1);
            
            TransferUtility fileTransferUtility = new TransferUtility(_client);
            
            TransferUtilityUploadRequest fileTransferUtilityRequest = new TransferUtilityUploadRequest{
                BucketName = bucketName,
                Key = key,
                InputStream = fileStream,
                CannedACL = S3CannedACL.PublicRead,
                ContentType = ContentType
            };

            fileTransferUtilityRequest.Metadata.Add("uploadedOn", DateTime.Now.ToString());
            fileTransferUtilityRequest.Metadata.Add("uploadedOn", DateTime.Now.ToString());
            fileTransferUtilityRequest.Metadata.Add("Type", type);

            await fileTransferUtility.UploadAsync(fileTransferUtilityRequest);       
        }
    }

}