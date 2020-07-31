using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MET.API.Data;
using MET.API.Dtos;
using MET.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MET.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;

        }

        // GET api/values
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await _context.Values.ToListAsync();
            return Ok(values);
        }
        [AllowAnonymous]
        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync( x => x.Id == id);
            return Ok(value);
        }
        
        [HttpGet("bytype/{type}")]
        public async Task<IActionResult> GetValuebytype(string type)
        { 
            var values = await _context.Values.Where(v => v.Type == type).ToListAsync();
            return Ok(values);
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> AddValue(AddValueDto addValueDto)
        {
            var valueToAdd = new Value {
                Name = addValueDto.Name,
                Type = addValueDto.Type
            };

            await _context.AddAsync(valueToAdd);
            var valueCreated = await _context.SaveChangesAsync();

            return Ok(valueCreated);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
