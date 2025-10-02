import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService, Job } from '../job.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  filterType = '';
  filterLocation = '';
  isLoading = true;
  errorMessage = '';

  // Hardcoded South African locations
  availableLocations: string[] = [
    'Johannesburg',
    'Sandton',
    'Pretoria',
    'Cape Town',
    'Durban',
    'Port Elizabeth',
    'Bloemfontein',
    'East London',
    'Polokwane',
    'Nelspruit',
    'Rustenburg',
    'Kimberley',
    'Remote'
  ];

  // Hardcoded job types
  availableTypes: string[] = [
    'Full-Time',
    'Part-Time',
    'Contract',
    'Remote',
    'Internship',
    'Freelance'
  ];

  // Sample hardcoded jobs with South African context
  sampleJobs: Job[] = [
    {
      id: 1,
      title: 'Senior Software Developer',
      description: 'Develop and maintain enterprise software solutions',
      requirements: '5+ years experience, C#, Angular, SQL',
      salary: 'R85,000 - R110,000',
      type: 'Full-Time',
      location: 'Johannesburg',
      closingDate: '2024-12-31'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      description: 'Create responsive web applications using modern frameworks',
      requirements: '3+ years experience, React, TypeScript, CSS',
      salary: 'R45,000 - R65,000',
      type: 'Contract',
      location: 'Cape Town',
      closingDate: '2024-11-15'
    },
    {
      id: 3,
      title: 'Data Analyst',
      description: 'Analyze business data and provide insights',
      requirements: 'SQL, Python, Power BI, 2+ years experience',
      salary: 'R35,000 - R50,000',
      type: 'Full-Time',
      location: 'Sandton',
      closingDate: '2024-10-30'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      description: 'Manage cloud infrastructure and CI/CD pipelines',
      requirements: 'AWS, Docker, Kubernetes, 4+ years experience',
      salary: 'R75,000 - R95,000',
      type: 'Full-Time',
      location: 'Pretoria',
      closingDate: '2024-12-15'
    },
    {
      id: 5,
      title: 'UX/UI Designer',
      description: 'Design user interfaces and experiences for web and mobile',
      requirements: 'Figma, Adobe Creative Suite, 3+ years experience',
      salary: 'R40,000 - R55,000',
      type: 'Part-Time',
      location: 'Durban',
      closingDate: '2024-11-20'
    },
    {
      id: 6,
      title: 'IT Support Specialist',
      description: 'Provide technical support and maintain IT systems',
      requirements: 'CompTIA A+, Windows Server, 2+ years experience',
      salary: 'R25,000 - R35,000',
      type: 'Full-Time',
      location: 'Port Elizabeth',
      closingDate: '2024-10-25'
    },
    {
      id: 7,
      title: 'Mobile App Developer',
      description: 'Develop cross-platform mobile applications',
      requirements: 'React Native, iOS/Android, 3+ years experience',
      salary: 'R50,000 - R70,000',
      type: 'Remote',
      location: 'Remote',
      closingDate: '2024-12-10'
    },
    {
      id: 8,
      title: 'Software Engineering Intern',
      description: 'Learn and contribute to software development projects',
      requirements: 'Computer Science student, basic programming knowledge',
      salary: 'R15,000 - R20,000',
      type: 'Internship',
      location: 'Johannesburg',
      closingDate: '2024-11-05'
    },
    {
      id: 9,
      title: 'Project Manager',
      description: 'Manage software development projects and teams',
      requirements: 'PMP certification, Agile methodology, 5+ years experience',
      salary: 'R65,000 - R85,000',
      type: 'Full-Time',
      location: 'Cape Town',
      closingDate: '2024-12-20'
    },
    {
      id: 10,
      title: 'Database Administrator',
      description: 'Manage and optimize database systems',
      requirements: 'SQL Server, MySQL, 4+ years experience',
      salary: 'R55,000 - R75,000',
      type: 'Contract',
      location: 'Bloemfontein',
      closingDate: '2024-11-30'
    }
  ];

  @Output() jobsUpdated = new EventEmitter<number>();

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.isLoading = true;
    this.errorMessage = '';

    // Use hardcoded sample data instead of API call
    setTimeout(() => {
      this.jobs = this.sampleJobs;
      this.filteredJobs = [...this.jobs];
      this.isLoading = false;
      this.jobsUpdated.emit(this.jobs.length);

      console.log('Loaded hardcoded jobs:', this.jobs.length);
      console.log('Available types:', this.availableTypes);
      console.log('Available locations:', this.availableLocations);
    }, 1000); // Simulate API delay
  }

  // This method is called whenever filter inputs change
  onFilterChange(): void {
    console.log(`🔍 Filter changed - Type: '${this.filterType}', Location: '${this.filterLocation}'`);

    // Apply filter immediately
    this.applyFilter();
  }

  applyFilter(): void {
    if (!this.filterType && !this.filterLocation) {
      // If no filters, show all jobs
      this.filteredJobs = [...this.jobs];
      console.log('No filters applied, showing all jobs');
      return;
    }

    // Use client-side filtering for immediate response
    this.filteredJobs = this.jobs.filter(job => {
      const typeMatch = this.filterType ?
        this.checkMatch(job.type, this.filterType) : true;

      const locationMatch = this.filterLocation ?
        this.checkMatch(job.location, this.filterLocation) : true;

      return typeMatch && locationMatch;
    });

    console.log(`✅ Filtered to ${this.filteredJobs.length} jobs`);
  }

  // Improved matching function - more flexible
  private checkMatch(text: string, searchTerm: string): boolean {
    if (!text || !searchTerm) return false;

    const textLower = text.toLowerCase().trim();
    const searchLower = searchTerm.toLowerCase().trim();

    // Return true if the text contains the search term anywhere
    return textLower.includes(searchLower);
  }

  clearFilters(): void {
    this.filterType = '';
    this.filterLocation = '';
    this.filteredJobs = [...this.jobs];
    console.log('🗑️ Filters cleared, showing all jobs');
  }

  // Helper method to get filter suggestions
  getTypeSuggestions(): string[] {
    if (!this.filterType) return [];
    return this.availableTypes.filter(type =>
      type.toLowerCase().includes(this.filterType.toLowerCase())
    );
  }

  getLocationSuggestions(): string[] {
    if (!this.filterLocation) return [];
    return this.availableLocations.filter(location =>
      location.toLowerCase().includes(this.filterLocation.toLowerCase())
    );
  }

  deleteJob(id: number) {
    const jobToDelete = this.jobs.find(job => job.id === id);
    const jobTitle = jobToDelete ? jobToDelete.title : 'Unknown Job';

    if (confirm(`Are you sure you want to delete "${jobTitle}" (ID: ${id})?`)) {
      console.log(`🗑️ Attempting to delete job with ID: ${id}`);

      // Remove from both arrays
      this.jobs = this.jobs.filter(job => job.id !== id);
      this.filteredJobs = this.filteredJobs.filter(job => job.id !== id);

      // Emit the updated count
      this.jobsUpdated.emit(this.jobs.length);

      alert(`Job "${jobTitle}" deleted successfully!`);
    }
  }

  // Helper methods for styling
  getTypeClass(type: string): string {
    const typeMap: { [key: string]: string } = {
      'Full-Time': 'full-time',
      'Part-Time': 'part-time',
      'Contract': 'contract',
      'Remote': 'remote',
      'Internship': 'internship',
      'Freelance': 'contract'
    };
    return typeMap[type] || 'default';
  }

  isExpiringSoon(closingDate: string): boolean {
    try {
      const closing = new Date(closingDate);
      const today = new Date();
      const diffTime = closing.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0;
    } catch {
      return false;
    }
  }

  getStatus(closingDate: string): string {
    try {
      const closing = new Date(closingDate);
      const today = new Date();

      if (closing < today) {
        return 'Expired';
      } else if (this.isExpiringSoon(closingDate)) {
        return 'Expiring Soon';
      } else {
        return 'Active';
      }
    } catch {
      return 'Unknown';
    }
  }

  getStatusClass(closingDate: string): string {
    const status = this.getStatus(closingDate);
    return status.toLowerCase().replace(' ', '-');
  }
}
