using System.Collections.Generic;
using System.Linq;
using MET.API.Models;
using Newtonsoft.Json;

namespace MET.API.Data
{
    public class Seed
    {
        public static void SeedValues(DataContext context)
        {
            if(!context.Values.Any())
            {
                var ValueData  = System.IO.File.ReadAllText("Data/ValueSeedData.json");
                var Values = JsonConvert.DeserializeObject<List<Value>>(ValueData);
                foreach (var Value in Values)
                {
                    context.Add(Value);   
                }

                context.SaveChanges();
            }
        }
    }
}