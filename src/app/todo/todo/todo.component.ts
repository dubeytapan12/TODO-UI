import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { TodoService } from "../todo.service";
import { TODO } from "./todo";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  todos: TODO[] = [];
  constructor(private service: TodoService, private datepipe: DatePipe) {}

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.service.getTodos().subscribe((items) => {
      items.forEach((item) => {
        this.todos.push({
          ...item,
          autoCloseVM: item.autoClose ? "Yes" : "No",
          startDateVM: this.datepipe.transform(item.startDate, "longDate"),
          endDateVM: this.datepipe.transform(item.endDate, "longDate"),
        });
      });
    });
  }
}
