import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskDto } from '../Model/task-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  private createTaskAPI = 'http://localhost:8081/tasks';
  private fetchAllTaskAPI = 'http://localhost:8081/tasks';

  constructor(private http: HttpClient) { }

  // Create a new task; adds the JWT token to the Authorization header.
  createTask(task: TaskDto): Observable<any> {
    console.log("Creating task:", task.taskTitle, task.taskDescription);
  
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    return this.http.post(this.createTaskAPI, task, {
      headers,
      responseType: 'text' as 'json' // Treat plain text as 'json'
    });
  }
  
  
 // GET method to fetch all tasks
getAllTasks(): Observable<TaskDto[]> {
  const token = localStorage.getItem('token'); // or from your AuthService
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get<TaskDto[]>(this.fetchAllTaskAPI, { headers });
}


}