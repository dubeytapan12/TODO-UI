import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TodoComponent } from "./todo/todo.component";
import { Routes, RouterModule } from "@angular/router";
import { SaveTodoComponent } from "./todo/save-todo.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmSaveTodoGuard } from "./confirm-save-todo.guard";
import { TableModule } from "primeng/table";
const routes: Routes = [
  {
    path: "",
    component: TodoComponent,
  },
  {
    path: ":id",
    component: SaveTodoComponent,
    canDeactivate: [ConfirmSaveTodoGuard],
  },
];

@NgModule({
  declarations: [TodoComponent, SaveTodoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TableModule,
    NgbModule,
  ],
})
export class TodoModule {}
