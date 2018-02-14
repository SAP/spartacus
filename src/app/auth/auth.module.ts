import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [CommonModule, LoginModule],
  declarations: []
})
export class AuthModule { }
