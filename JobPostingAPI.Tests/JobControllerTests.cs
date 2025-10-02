using Xunit;
using Microsoft.AspNetCore.Mvc;
using JobPostingAPI.Controllers;
using JobPostingAPI.Models;
using System;

public class JobControllerTests
{
    [Fact]
    public void Add_InvalidClosingDate_ReturnsBadRequest()
    {
        // Arrange
        var controller = new JobsController();
        var jobWithInvalidDate = new Job
        {
            Title = "Test Job",
            Description = "...",
            Location = "Remote",
            Type = "Full-Time",
            // Closing date is set to a past date (or exactly now)
            ClosingDate = DateTime.Now.AddDays(-1)
        };

        // Act
        var result = controller.Add(jobWithInvalidDate);

        // Assert
        // The API returns a 400 Bad Request with a message for invalid input
        Assert.IsType<BadRequestObjectResult>(result);
        var badRequestResult = result as BadRequestObjectResult;
        Assert.Equal("Closing date must be in the future.", badRequestResult?.Value);
    }
}