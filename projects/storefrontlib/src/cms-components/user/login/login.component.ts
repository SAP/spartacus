import { Component } from '@angular/core';
import { AuthService, User, UserService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { LoginComponentService } from './login.component.service';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private loginService: LoginComponentService
  ) {}

  get user$(): Observable<User> {
    return this.auth.getUserToken().pipe(
      map(token => {
        if (token && !!token.access_token && !this.loginService.isLogin) {
          this.loginService.isLogin = true;
          this.userService.load();
        } else if (token && !token.access_token && this.loginService.isLogin) {
          this.loginService.isLogin = false;
        }
        return token;
      }),
      filter(token => token && !!token.access_token),
      switchMap(() => this.userService.get())
    );
  }
}
