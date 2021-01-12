import { NgModule } from '@angular/core';
import { UserAuthEventBuilder } from './user-auth-event.builder';

@NgModule({})
export class UserAuthEventModule {
  constructor(_userAuthEventBuilder: UserAuthEventBuilder) {}
}
