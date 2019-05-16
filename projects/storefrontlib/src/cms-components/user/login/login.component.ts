import { Component } from '@angular/core';
import { User, UserService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  get user$(): Observable<User> {
    return this.userService
      .get()
      .pipe(map(user => (Object.keys(user).length !== 0 ? user : undefined)));
  }
}
