import { Injectable } from "@angular/core";
import { AccountModule } from "./account.module";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Register } from "./register/register";
import { environment } from "src/environments/environment";

@Injectable()
export class AccountService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  public getUserEmails(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${this.apiUrl}userdetails/UserEmails`
    );
  }

  /**
   * name
   */
  public saveUserRegistration(userForm: Register): Observable<Register> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.post<Register>(
      `${this.apiUrl}userdetails`,
      userForm,
      httpOptions
    );
  }
}
