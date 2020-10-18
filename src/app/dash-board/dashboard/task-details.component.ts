import { Component, Input, OnInit } from '@angular/core';
import { TODO } from 'src/app/todo/todo/todo';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task:TODO;
  constructor() { }

  ngOnInit(): void {
  }

}
