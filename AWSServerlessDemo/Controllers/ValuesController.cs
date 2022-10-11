using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.Model;
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
            var records = await scan.GetRemainingAsync();

            return records.OrderByDescending(x => x.Updated);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(DbRecord))]
        public async Task<IActionResult> Get(string id)
        {
            var record = await _repo.LoadAsync<DbRecord>(id);
            if (record == null) return NotFound();

            return Ok(record);
        }

        // POST api/values
        [HttpPost]
        public async Task<string> Post([FromBody]StringDto value)
        {
            var record = new DbRecord
            {
                Value = value.Value,
                Updated = DateTime.UtcNow,
            };

            await _repo.SaveAsync(record);

            return record.Id;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]StringDto value)
        {
            var record = await _repo.LoadAsync<DbRecord>(id);
            if (record == null) return NotFound();

            record.Value = value.Value;
            record.Updated = DateTime.UtcNow;
            await _repo.SaveAsync(record);

            return Ok();
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
        public DateTime Updated { get; set; }
    }
}
