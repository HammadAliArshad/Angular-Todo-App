import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  @Input() taskList: any[] = [];
  @Output() important = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();



  markImportant(task:any){
    this.important.emit(task);
    console.log(task)
  }

  markComplete(task:any){
    this.complete.emit(task);
  }

  onDelete(task:any){
    this.delete.emit(task);
  }

}
