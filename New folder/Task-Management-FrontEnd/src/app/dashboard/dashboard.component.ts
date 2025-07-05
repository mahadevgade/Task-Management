import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskDto } from '../../Model/task-dto';
import { DashboardServiceService } from '../../Services/dashboard-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  taskForm!: FormGroup; 
  showForm = false; // toggle flag //hiding form button
  showTaskTable = false;
  taskList: TaskDto[] = []; // Store tasks


  constructor(private fb: FormBuilder, private taskService: DashboardServiceService, private router:Router) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required]
    });

  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.showTaskTable = false; // hide table when form is shown
    }
  }


  getTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.taskList = data;
        this.showTaskTable = true;    //  Show table
        this.showForm = false;        //  Hide form
        console.log('Tasks fetched:', data);

      },
      error: (err) => {
        console.error('Error fetching tasks', err);
      }
    });
  }


  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const taskData: TaskDto = this.taskForm.value;
    this.taskService.createTask(taskData).subscribe({
      next: (response) => {
        console.log('Task created successfully', response);
        this.taskForm.reset();
      },
      error: (error) => {
        console.error('Error creating task', error);
      }
    });
  }

  logout(): void {
    console.log('Logout user..!!!');
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
