import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home.component";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./account/login/login.component";
import { RegisterComponent } from "./account/register/register.component";
import { NotFoundComponent } from "./not-found.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AccountModule } from "./account/account.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { from } from "rxjs";
import { HttpAuthInterceptor } from "./Interceptor/http-auth.interceptor";
import { AuthGuard } from "./security/auth.guard";
import { DatePipe } from "@angular/common";
const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "Register",
    component: RegisterComponent,
  },
  {
    path: "Home",
    component: HomeComponent,
    children: [
      {
        path: "",
        canActivateChild: [AuthGuard],
        data: { routeAccess: "canAccessDashboard" },
        loadChildren: () =>
          import("./dash-board/dash-board.module").then(
            (u) => u.DashBoardModule
          ),
      },
      {
        path: "todo",
        canActivateChild: [AuthGuard],
        data: { routeAccess: "canAccessTODO" },
        loadChildren: () =>
          import("./todo/todo.module").then((u) => u.TodoModule),
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    AccountModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
