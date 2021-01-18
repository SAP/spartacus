import { NgModule } from '@angular/core';
import {
  LoginFormModule,
  LoginModule,
  LoginRegisterModule,
} from './components/index';

@NgModule({
  imports: [LoginModule, LoginFormModule, LoginRegisterModule],
})
export class UserDetailsModule {}
