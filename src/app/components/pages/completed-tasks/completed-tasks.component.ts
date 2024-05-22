import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss'
})
export class CompletedTasksComponent {
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
    this.httpService.addTask(this.newTask).subscribe(() => {
      console.log("Added");
      this.newTask = "";
      this.getAllTasks();
    })
  }

  getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any) => {
    this.initialTaskList = this.taskList = result.filter((x:any) => x.complete == true)      
    })
  }

  onImportant(task:any){
    task.important = !task.important;
    console.log("Important", task);
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
