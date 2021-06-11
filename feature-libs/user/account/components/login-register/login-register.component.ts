import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cx-login-register',
  templateUrl: './login-register.component.html',
})
export class LoginRegisterComponent implements OnInit {
  loginAsGuest = false;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loginAsGuest = this.activatedRoute.snapshot.queryParams['forced'];
  }
}
