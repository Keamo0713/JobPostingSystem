﻿//Job Model
//Job Model
namespace JobPostingAPI.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public DateTime ClosingDate { get; set; }
        public string Salary { get; set; } = string.Empty;
        public string Requirements { get; set; } = string.Empty;
    }
}