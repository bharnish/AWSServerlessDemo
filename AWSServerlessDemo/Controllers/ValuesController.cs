using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;

namespace AWSServerlessDemo.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly IDynamoDBContext _repo;

        public ValuesController(IDynamoDBContext repo)
        {
            _repo = repo;
        }

        // GET api/values
        [HttpGet]
        public async Task<IEnumerable<DbRecord>> Get()
        {
            var scan = _repo.ScanAsync<DbRecord>(null);
            return await scan.GetRemainingAsync();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<DbRecord> Get(string id)
        {
            return await _repo.LoadAsync<DbRecord>(id);
        }

        // POST api/values
        [HttpPost]
        public async Task Post([FromBody]StringDto value)
        {
            var record = new DbRecord
            {
                Value = value.Value,
            };

            await _repo.SaveAsync(record);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task Put(string id, [FromBody]StringDto value)
        {
            var record = await _repo.LoadAsync<DbRecord>(id);
            record.Value = value.Value;
            await _repo.SaveAsync(record);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _repo.DeleteAsync<DbRecord>(id);
        }
    }

    public class StringDto
    {
        public string Value { get; set; }
    }

#if DEBUG
    [DynamoDBTable("AWSServerless-Demo")]
#else
    [DynamoDBTable("AWSServerlessDemo")]
#endif
    public class DbRecord
    {
        [DynamoDBHashKey] public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Value { get; set; }
    }
}
