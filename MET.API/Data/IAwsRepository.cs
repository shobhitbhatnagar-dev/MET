using System.IO;
using System.Threading.Tasks;

namespace MET.API.Data
{
    public interface IAwsRepository
    {
         void AddFiletoS3(string key, string bucketName, Stream fileStream, string ContentType, string type);
    }
}