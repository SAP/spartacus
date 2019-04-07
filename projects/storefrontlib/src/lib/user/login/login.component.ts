import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, User, UserService, UserToken } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  isLogin = false;

  subscription: Subscription;

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.user$ = this.userService.get();

    this.subscription = this.auth
      .getUserToken()
      .subscribe((token: UserToken) => {
        if (token && token.access_token && !this.isLogin) {
          this.isLogin = true;
          this.userService.load(token.userId);
          this.auth.login();
        } else if (token && !token.access_token && this.isLogin) {
          this.isLogin = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
