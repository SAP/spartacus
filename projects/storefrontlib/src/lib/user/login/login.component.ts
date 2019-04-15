import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { LoginComponentService } from './login.component.service';
import { UserService } from '../../../../../core/src/user/facade';
import { AuthService } from '../../../../../core/src/auth';
import { User } from '../../../../../core/src/occ/occ-models';

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
      map(token => {
        if (token && !!token.access_token && !this.loginService.isLogin) {
          this.loginService.isLogin = true;
          this.userService.load(token.userId);
          this.auth.login();
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
