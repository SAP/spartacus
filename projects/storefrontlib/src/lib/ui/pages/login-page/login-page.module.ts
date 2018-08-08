import { NgModule } from '@angular/core';
import { LoginPageLayoutModule } from './../../layout/login-page-layout/login-page-layout.module';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  imports: [LoginPageLayoutModule],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent]
})
export class LoginPageModule {}
