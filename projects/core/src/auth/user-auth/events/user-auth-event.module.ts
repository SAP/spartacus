import { NgModule } from '@angular/core';
import { LogoutEventBuilder } from './logout-event.builder';

@NgModule({})
export class UserAuthEventModule {
  constructor(_LogoutEventBuilder: LogoutEventBuilder) {}
}
