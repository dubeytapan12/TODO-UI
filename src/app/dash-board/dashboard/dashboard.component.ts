import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SecurityService } from "src/app/security/security.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  userDetails: any[];
  constructor(
    private route: ActivatedRoute,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.securityService
      .getUserDetails()
      .subscribe((item) => (this.userDetails = item));
  }
}
