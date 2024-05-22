import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-important-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './important-tasks.component.html',
  styleUrl: './important-tasks.component.scss'
})
export class ImportantTasksComponent {
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
    this.initialTaskList= this.taskList = result.filter((x:any) => x.important == true)      
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
