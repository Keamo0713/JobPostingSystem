using Microsoft.EntityFrameworkCore;
using JobPostingAPI.Data;
using JobPostingAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// USE IN-MEMORY DATABASE
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseInMemoryDatabase("JobPostingInMemoryDB");
    options.EnableSensitiveDataLogging(true);
    options.EnableDetailedErrors(true);
});

// Add CORS - Updated for production
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins(
            "http://localhost:4200", 
            "https://localhost:4200",
            "https://your-frontend-app.netlify.app", // Update after frontend deployment
            "https://job-posting-frontend.netlify.app" // Common Netlify URL pattern
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();

// SEED THE IN-MEMORY DATABASE WITH SOUTH AFRICAN SAMPLE DATA
using (var scope = app.Services.CreateScope())
{
   var services = scope.ServiceProvider;;
    var context = services.GetRequiredService<ApplicationDbContext>();
    var logger = services.GetRequiredService<ILogger<Program>>();

    try
    {
        logger.LogInformation("🧪 SEEDING IN-MEMORY DATABASE WITH SOUTH AFRICAN SAMPLE DATA...");

        // Clear any existing data
        context.Jobs.RemoveRange(context.Jobs);
        await context.SaveChangesAsync();

        // Add South African sample jobs
        var sampleJobs = new[]
        {
            new Job {
                Title = "Senior Software Engineer",
                Description = "Develop and maintain scalable web applications using .NET and Angular for financial services",
                Location = "Johannesburg, Gauteng",
                Type = "Full-Time",
                ClosingDate = DateTime.Now.AddDays(30),
                Salary = "R900,000 - R1,200,000 per annum",
                Requirements = "5+ years experience with C#, .NET, SQL Server, Angular, and financial systems"
            },
            new Job {
                Title = "Frontend Developer",
                Description = "Create modern user interfaces with Angular and TypeScript for e-commerce platforms",
                Location = "Sandton, Gauteng",
                Type = "Full-Time",
                ClosingDate = DateTime.Now.AddDays(45),
                Salary = "R600,000 - R800,000 per annum",
                Requirements = "3+ years Angular experience, TypeScript, RxJS, SCSS, responsive design"
            },
            new Job {
                Title = "DevOps Engineer",
                Description = "Manage cloud infrastructure and CI/CD pipelines for banking applications",
                Location = "Pretoria, Gauteng",
                Type = "Contract",
                ClosingDate = DateTime.Now.AddDays(60),
                Salary = "R700 - R900 per hour",
                Requirements = "Azure, Docker, Kubernetes, Terraform, CI/CD, banking security standards"
            },
            new Job {
                Title = "Data Analyst",
                Description = "Analyze business data and create insightful reports for retail banking",
                Location = "Midrand, Gauteng",
                Type = "Full-Time",
                ClosingDate = DateTime.Now.AddDays(25),
                Salary = "R450,000 - R650,000 per annum",
                Requirements = "SQL, Power BI, Excel, Statistical analysis, banking data models"
            },
            new Job {
                Title = "Product Manager",
                Description = "Lead product strategy and work with development teams on fintech solutions",
                Location = "Rosebank, Gauteng",
                Type = "Full-Time",
                ClosingDate = DateTime.Now.AddDays(40),
                Salary = "R950,000 - R1,300,000 per annum",
                Requirements = "5+ years product management, Agile, User research, financial services"
            },
            new Job {
                Title = "QA Engineer",
                Description = "Ensure software quality through manual and automated testing for mobile banking",
                Location = "Centurion, Gauteng",
                Type = "Part-Time",
                ClosingDate = DateTime.Now.AddDays(35),
                Salary = "R350,000 - R500,000 per annum",
                Requirements = "Selenium, Manual testing, Test planning, mobile app testing"
            }
        };

        foreach (var job in sampleJobs)
        {
            context.Jobs.Add(job);
        }

        await context.SaveChangesAsync();

        var finalCount = context.Jobs.Count();
        logger.LogInformation($"✅ IN-MEMORY DATABASE SEEDED WITH {finalCount} SOUTH AFRICAN JOBS");

        // Log the seeded jobs
        var jobs = context.Jobs.ToList();
        foreach (var job in jobs)
        {
            logger.LogInformation($"   📍 {job.Id}: {job.Title} | {job.Location} | {job.Type}");
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "💥 ERROR SEEDING IN-MEMORY DATABASE");
    }
}

// RENDER DEPLOYMENT CONFIGURATION - ADD THIS AT THE END
var port = Environment.GetEnvironmentVariable("PORT") ?? "5269";
app.Run($"http://0.0.0.0:{port}");
