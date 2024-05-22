import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';

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

  httpService = inject(HttpService)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
    this.taskList = result.filter((x:any) => x.important == true)      
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
}
