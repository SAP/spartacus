import { NgModule } from '@angular/core';
import { LoginEventBuilder } from './login-event.builder';
import { LogoutEventBuilder } from './logout-event.builder';

@NgModule({})
export class UserAuthEventModule {
  constructor(
    _logoutEventBuilder: LogoutEventBuilder,
    _loginEventBuilder: LoginEventBuilder
  ) {}
}
