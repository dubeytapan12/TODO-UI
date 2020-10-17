import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TODO } from "./todo/todo";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  public getTodos(): Observable<TODO[]> {
    return this.httpClient.get<TODO[]>(`${this.apiUrl}TODOTasks`);
  }
  public saveTodo(userForm: TODO): Observable<TODO> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.post<TODO>(
      `${this.apiUrl}TODOTasks`,
      userForm,
      httpOptions
    );
  }
}
