import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login } from "../account/login/Login";
import { SecurityModel } from "./securityModel";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SecurityService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  private _securityModel: SecurityModel;
  get securityModel() {
    return this._securityModel;
  }
  set securityModel(value: SecurityModel) {
    this._securityModel = value;
  }
  public logout() {
    this.clearSecurityModel();
    sessionStorage.removeItem("todoBearerToken");
  }
  public getUserDetails(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}userdetails`);
  }
  public clearSecurityModel() {
    this.securityModel = {
      userName: "",
      isAuthenticated: false,
      bearerToken: "",
      canAccessTODO: false,
      canAccessDashboard: false,
      canAccessAdmin: false,
    };
  }

  public Login(userForm: Login): Observable<SecurityModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient
      .post<SecurityModel>(
        `${this.apiUrl}userdetails/Login`,
        userForm,
        httpOptions
      )
      .pipe(
        tap((result) => {
          this.clearSecurityModel();
          Object.assign(this.securityModel, result);
          //Now check if Authenticated is true store token in sessionStorage
          if (this.securityModel.isAuthenticated) {
            sessionStorage.setItem(
              "todoBearerToken",
              this.securityModel.bearerToken
            );
          } else {
            this.clearSecurityModel();
          }
        })
      );
  }
}
