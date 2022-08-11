import { NgModule } from '@angular/core';
import { UserAccountEventListener } from './user-account-event.listener';

@NgModule({})
export class UserAccountEventModule {
  constructor(_userAccountEventListener: UserAccountEventListener) {}
}
