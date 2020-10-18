import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TaskDetailsComponent } from './dashboard/task-details.component';
import { TaskListComponent } from './dashboard/task-list.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
];
@NgModule({
  declarations: [DashboardComponent, TaskDetailsComponent, TaskListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule],
})
export class DashBoardModule {}
