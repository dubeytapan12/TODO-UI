import { Injectable } from "@angular/core";
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { SecurityService } from "./security.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivateChild {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.securityService.securityModel &&
      this.securityService.securityModel.isAuthenticated &&
      this.securityService.securityModel[next.data.routeAccess]
    ) {
      return true;
    } else {
      if (
        this.securityService.securityModel &&
        !this.securityService.securityModel[next.data.routeAccess]
      ) {
        alert("not authorize to access this url");
        return this.router.createUrlTree([""]);
      } else {
        return this.router.createUrlTree([""], {
          queryParams: { returnUrl: state.url },
        });
      }
    }
  }
}
