import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, User, UserService } from '@spartacus/core';
import { switchMap, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLogin = false;

  constructor(private auth: AuthService, private userService: UserService) {}

  get user$(): Observable<User> {
    return this.auth.getUserToken().pipe(
      filter(data => data && !!data.access_token),
      tap(token => {
        if (!this.isLogin) {
          this.isLogin = true;
          this.userService.load(token.userId);
          this.auth.login();
        }
      }),
      switchMap(() => this.userService.get())
    );
  }
}
