import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo/todo.service';
import { TODO } from 'src/app/todo/todo/todo';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: TODO[] = [];
  constructor(private service: TodoService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.service.getTodos().subscribe((items) => {
      items.forEach((item) => {
        this.tasks.push({
          ...item,
          autoCloseVM: item.autoClose ? "Yes" : "No",
          startDateVM: this.datepipe.transform(item.startDate, "longDate"),
          endDateVM: this.datepipe.transform(item.endDate, "longDate"),
          status: this.getStatus(item.endDate? new Date(item.endDate):null,new Date(item.startDate)),
          buttonText:this.getButtonText(item.endDate? new Date(item.endDate):null,new Date(item.startDate))
        });
      });
    });
  }

  private getStatus(endDate:Date, startDate:Date)
  {
    const currentDate = new Date();
    if(!endDate)
   {
    return 'Constant';
   }
   else if(endDate < currentDate)
    {
      return 'Completed';
    }
    else if (startDate > currentDate)
    {
      return 'Upcoming';
    }
    else{
      return 'Ongoing';
    }
  }

  private getButtonText(endDate:Date, startDate:Date)
  {
    const currentDate = new Date();
    if(!endDate)
   {
    return 'Mark it as Done';
   }
   else if(endDate < currentDate)
    {
      return 'Reopen';
    }
    else if (startDate > currentDate)
    {
      return 'Mark it as Done';
    }
    else{
      return 'Mark it as Done';
    }
  }
}
