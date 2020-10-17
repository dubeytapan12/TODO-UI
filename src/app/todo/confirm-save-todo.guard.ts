import { Injectable } from "@angular/core";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { SaveTodoComponent } from "./todo/save-todo.component";

@Injectable({
  providedIn: "root",
})
export class ConfirmSaveTodoGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: SaveTodoComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.todoForm.dirty) {
      return confirm("do you want to navigate from save TODO Page?");
    }
    return true;
  }
}
