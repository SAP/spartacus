import { NgModule } from '@angular/core';
import { UserEventBuilder } from './user-event.builder';

@NgModule({})
export class UserEventModule {
  constructor(_userEventBuilder: UserEventBuilder) {}
}
