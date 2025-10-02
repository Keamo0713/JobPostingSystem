using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobPostingAPI.Models;
using JobPostingAPI.Data;

namespace JobPostingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JobsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? type, [FromQuery] string? location)
        {
            try
            {
                Console.WriteLine($"🎯 GET /api/jobs - Type: '{type}', Location: '{location}'");

                var query = _context.Jobs.AsQueryable();

                // IMPROVED FILTERING: More flexible matching
                if (!string.IsNullOrEmpty(type) && type.Trim() != "")
                {
                    var typeFilter = type.Trim().ToLower();
                    query = query.Where(j =>
                        j.Type.ToLower().Contains(typeFilter) ||
                        j.Type.ToLower().StartsWith(typeFilter) ||
                        j.Type.ToLower().EndsWith(typeFilter));
                    Console.WriteLine($"🔍 Filtering by type: '{typeFilter}'");
                }

                if (!string.IsNullOrEmpty(location) && location.Trim() != "")
                {
                    var locationFilter = location.Trim().ToLower();
                    query = query.Where(j =>
                        j.Location.ToLower().Contains(locationFilter) ||
                        j.Location.ToLower().StartsWith(locationFilter) ||
                        j.Location.ToLower().EndsWith(locationFilter));
                    Console.WriteLine($"🔍 Filtering by location: '{locationFilter}'");
                }

                var jobs = await query.ToListAsync();

                Console.WriteLine($"✅ RETURNING {jobs.Count} JOBS AFTER FILTERING");

                // Log what jobs were found for debugging
                foreach (var job in jobs)
                {
                    Console.WriteLine($"   📍 {job.Id}: {job.Title} | {job.Location} | {job.Type}");
                }

                return Ok(jobs);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"💥 ERROR in GetAll: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // ... rest of your methods remain the same
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var job = await _context.Jobs.FindAsync(id);
                if (job == null)
                {
                    Console.WriteLine($"❌ Job with ID {id} not found");
                    return NotFound($"Job with ID {id} not found.");
                }

                Console.WriteLine($"✅ Found job: {job.Title} (ID: {id})");
                return Ok(job);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"💥 ERROR in GetById: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(Job job)
        {
            try
            {
                if (string.IsNullOrEmpty(job.Title))
                    return BadRequest("Title is required.");

                if (job.ClosingDate <= DateTime.Now)
                    return BadRequest("Closing date must be in the future.");

                Console.WriteLine($"➕ ADDING JOB: {job.Title}");

                _context.Jobs.Add(job);
                await _context.SaveChangesAsync();

                Console.WriteLine($"✅ JOB ADDED WITH ID: {job.Id}");

                return Ok(job);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"💥 ERROR adding job: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                Console.WriteLine($"🗑️ ATTEMPTING TO DELETE JOB WITH ID: {id}");

                var existing = await _context.Jobs.FindAsync(id);
                if (existing == null)
                {
                    Console.WriteLine($"❌ Job with ID {id} not found for deletion");
                    return NotFound($"Job with ID {id} not found.");
                }

                Console.WriteLine($"🗑️ DELETING JOB: {existing.Title} (ID: {id})");

                _context.Jobs.Remove(existing);
                await _context.SaveChangesAsync();

                Console.WriteLine($"✅ JOB DELETED SUCCESSFULLY: ID {id}");

                return Ok(new
                {
                    Message = "Job deleted successfully",
                    DeletedJob = new { existing.Id, existing.Title }
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"💥 ERROR deleting job: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Add this diagnostic endpoint to see what data is available
        [HttpGet("debug-data")]
        public IActionResult DebugData()
        {
            try
            {
                var jobs = _context.Jobs.ToList();
                var uniqueTypes = jobs.Select(j => j.Type).Distinct().ToList();
                var uniqueLocations = jobs.Select(j => j.Location).Distinct().ToList();

                return Ok(new
                {
                    TotalJobs = jobs.Count,
                    AvailableTypes = uniqueTypes,
                    AvailableLocations = uniqueLocations,
                    AllJobs = jobs.Select(j => new {
                        j.Id,
                        j.Title,
                        Type = j.Type,
                        Location = j.Location
                    })
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }
    }
}