import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Login } from "./Login";
import { SecurityService } from "src/app/security/security.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private securityService: SecurityService,
    private activatedRoute: ActivatedRoute
  ) {}
  loginViewModel: Login;
  Login(): void {
    this.securityService.Login(this.loginViewModel).subscribe(
      (item) => {
        if (this.activatedRoute.snapshot.queryParams.returnUrl) {
          this.router.navigateByUrl(
            this.activatedRoute.snapshot.queryParams.returnUrl
          );
        } else {
          this.router.navigate(["Home", { name: item.userName }]);
        }
      },
      (error) => {
        alert("invalid username or password");
      }
    );
  }
  ngOnInit(): void {
    this.loginViewModel = { email: "", password: "" };
  }
}
