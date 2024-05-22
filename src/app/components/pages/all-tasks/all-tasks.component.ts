import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DatePipe, NgFor } from '@angular/common';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [FormsModule, PageTitleComponent, TaskListComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss'
})
export class AllTasksComponent {
  newTask = "";
  taskList: any[] = [];
  initialTaskList: any[] = [];

  httpService = inject(HttpService)
  stateService = inject(StateService)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.stateService.searchSubject.subscribe((value) => {
      if (value) {
        this.taskList = this.initialTaskList.filter(x => x.title.toLowerCase().includes(value.toLowerCase()))
      }  else{
        this.taskList = this.initialTaskList;
      }  
    })
    this.getAllTasks();
  }
  addTask(){
    console.log("AddTask", this.newTask);
    this.httpService.addTask(this.newTask).subscribe((res) => {
      console.log("Added");
      this.newTask = "";
      this.getAllTasks();
    })
  }

  getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any) => {
      this.initialTaskList = this.taskList = result.sort(result.complete);  
      console.log("sorted");
      console.log(this.taskList.sort(result.complete));
      
    })
  }

  onImportant(task:any){
    task.important = !task.important;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    })
  }

  onComplete(task:any){
    task.complete = !task.complete;
    console.log("Complete", task);
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    })
  }

  onDelete(task:any){
    this.httpService.deleteTask(task).subscribe(() => {
      console.log("Deleted", task.title);
      this.getAllTasks();
    })
  }
}
