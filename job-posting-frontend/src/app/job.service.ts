import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  type: string;
  closingDate: string;
  salary?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:5269/api/jobs';

  constructor(private http: HttpClient) { }

  getAllJobs(type?: string, location?: string): Observable<Job[]> {
    let params = new HttpParams();

    // Only add parameters if they have values
    if (type && type.trim() !== '') {
      params = params.set('type', type.trim());
    }

    if (location && location.trim() !== '') {
      params = params.set('location', location.trim());
    }

    console.log(`📡 Making API call to: ${this.apiUrl}`, { type, location });
    return this.http.get<Job[]>(this.apiUrl, { params });
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/${id}`, job);
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
