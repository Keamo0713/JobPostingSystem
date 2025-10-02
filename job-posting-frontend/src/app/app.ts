import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobFormComponent } from './job-form/job-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    JobListComponent,
    JobFormComponent,
    RouterModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  @ViewChild(JobListComponent) jobListComponent!: JobListComponent;
  totalJobs = 0;

  onJobAdded() {
    console.log('New job added - refreshing job list');
    // Refresh the job list when a new job is added
    if (this.jobListComponent) {
      this.jobListComponent.loadJobs();
    }
  }

  onJobsUpdated(count: number) {
    this.totalJobs = count;
  }
}
