using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AWSServerlessDemo.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly DemoDbContext _dbContext;

        public ValuesController(DemoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET api/values
        [HttpGet]
        public async Task<IEnumerable<DbRecord>> Get()
        {
            return await _dbContext.DbRecords.AsNoTracking().OrderByDescending(x => x.Updated).ToListAsync();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(DbRecord))]
        public async Task<IActionResult> Get(string id)
        {
            var record = await _dbContext.DbRecords.AsNoTracking().WithId(id).FirstOrDefaultAsync();
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

            await _dbContext.DbRecords.AddAsync(record);

            await _dbContext.SaveChangesAsync();

            return record.Id;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]StringDto value)
        {
            var record = await _dbContext.DbRecords.WithId(id).FirstOrDefaultAsync();
            if (record == null) return NotFound();

            record.Value = value.Value;
            record.Updated = DateTime.UtcNow;
            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            var record = await _dbContext.DbRecords.WithId(id).FirstOrDefaultAsync();
            if (record == null)
                return;

            _dbContext.DbRecords.Remove(record);

            await _dbContext.SaveChangesAsync();
        }
    }

    public class StringDto
    {
        public string Value { get; set; }
    }

    public class DbRecord
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Value { get; set; }
        public DateTime Updated { get; set; }

        /*
            create table dbRecords (
                id nvarchar (128) not null,
                primary key (id),
                value nvarchar(max) not null,
                updated datetime not null,
            )
         */
    }

    public class DemoDbContext : DbContext
    {
        public DbSet<DbRecord> DbRecords { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Integrated Security=SSPI;Initial Catalog=test");

            base.OnConfiguring(optionsBuilder);
        }
    }

    public static class Extensions
    {
        public static IQueryable<DbRecord> WithId(this IQueryable<DbRecord> self, string id)
        {
            return self.Where(x => x.Id == id);
        }
    }
}
