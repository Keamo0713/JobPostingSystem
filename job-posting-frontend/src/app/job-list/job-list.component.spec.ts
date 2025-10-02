import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobList } from './job-list';

describe('JobList', () => {
  let component: JobList;
  let fixture: ComponentFixture<JobList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
/**Frontend: Test to Ensure Job Filtering Works (Angular)
For Angular, you'd use Jasmine (the default testing framework) and Karma (the test runner). The test should ensure that calling applyFilter() triggers a call to the JobService's getJobs method with the correct filter parameters.

In job-list.component.spec.ts:
 *
 *
 * import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobListComponent } from './job-list.component';
import { JobService } from '../job.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs'; // For mocking the Observable return value

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;
  let jobServiceSpy: jasmine.SpyObj<JobService>;

  beforeEach(async () => {
    // 1. Create a spy object for the JobService
    jobServiceSpy = jasmine.createSpyObj('JobService', ['getJobs']);
    // Set up a default mock return value for getJobs
    jobServiceSpy.getJobs.and.returnValue(of([])); 

    await TestBed.configureTestingModule({
      // Import FormsModule for [(ngModel)] in the template
      imports: [FormsModule], 
      declarations: [JobListComponent],
      // Provide the spy instead of the real service
      providers: [
        { provide: JobService, useValue: jobServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    // Call ngOnInit to run component setup, including the initial loadJobs
    fixture.detectChanges(); 
  });

  it('should call getJobs with correct filters when applyFilter is called', () => {
    // Arrange
    component.filterType = 'Full-Time';
    component.filterLocation = 'Remote';

    // Act
    component.applyFilter();

    // Assert
    // Check if the getJobs service method was called with the filters
    expect(jobServiceSpy.getJobs).toHaveBeenCalledWith('Full-Time', 'Remote');
  });

  // A helpful secondary test:
  it('should call getJobs without filters on initialization', () => {
    // Assert - checks the call made in ngOnInit
    expect(jobServiceSpy.getJobs).toHaveBeenCalledWith('', '');
  });
}); */
