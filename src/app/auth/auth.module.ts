import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStatusModule } from './login-status/login-status.module';

@NgModule({
  imports: [CommonModule, LoginStatusModule],
  declarations: []
})
export class AuthModule {}
