import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService, Job } from '../job.service';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent {
  title = '';
  description = '';
  requirements = '';
  salary = '';
  type = '';
  location = '';
  closingDate = '';
  isSubmitting = false;
  message = '';
  isSuccess = false;

  @Output() jobAdded = new EventEmitter<void>();

  constructor(private jobService: JobService) { }

  addJob() {
    if (!this.title || !this.description || !this.type || !this.location || !this.closingDate) {
      this.showMessage('Title, Description, Type, Location, and Closing Date are required!', false);
      return;
    }

    // Validate closing date is in the future
    const closingDateObj = new Date(this.closingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (closingDateObj <= today) {
      this.showMessage('Closing date must be in the future!', false);
      return;
    }

    this.isSubmitting = true;
    this.message = '';

    const newJob: Job = {
      id: 0,
      title: this.title,
      description: this.description,
      requirements: this.requirements,
      salary: this.salary,
      type: this.type,
      location: this.location,
      closingDate: this.closingDate
    };

    this.jobService.addJob(newJob).subscribe({
      next: (savedJob) => {
        this.isSubmitting = false;
        this.showMessage('Job added successfully!', true);
        this.jobAdded.emit();
        this.resetForm();
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error adding job:', error);
        this.showMessage('Error adding job. Please try again.', false);
      }
    });
  }

  private showMessage(text: string, success: boolean) {
    this.message = text;
    this.isSuccess = success;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  private resetForm() {
    this.title = '';
    this.description = '';
    this.requirements = '';
    this.salary = '';
    this.type = '';
    this.location = '';
    this.closingDate = '';
  }

  getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }
}
