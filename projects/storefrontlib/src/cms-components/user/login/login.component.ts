import { Component, OnInit } from '@angular/core';
import { User, UserService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user$: Observable<User>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.get();
  }
}
