import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, User, UserService } from '@spartacus/core';
import { switchMap, filter, tap } from 'rxjs/operators';
import { LoginComponentService } from './login.component.service';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private loginService: LoginComponentService
  ) {}

  get user$(): Observable<User> {
    return this.auth.getUserToken().pipe(
      filter(data => data && !!data.access_token),
      tap(token => {
        if (!this.loginService.isLogin) {
          this.loginService.isLogin = true;
          this.userService.load(token.userId);
          this.auth.login();
        }
      }),
      switchMap(() => this.userService.get())
    );
  }
}
