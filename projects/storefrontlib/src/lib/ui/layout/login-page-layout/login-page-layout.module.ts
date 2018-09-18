import { NgModule } from '@angular/core';

import { LoginModule } from '../../../user/components/login/login.module';
import { LoginPageLayoutComponent } from './login-page-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [LoginModule, RouterModule],
  declarations: [LoginPageLayoutComponent],
  exports: [LoginPageLayoutComponent]
})
export class LoginPageLayoutModule {}
