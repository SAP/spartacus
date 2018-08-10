import { NgModule } from '@angular/core';

import { LoginModule } from '../../../user/components/login/login.module';
import { LoginPageLayoutComponent } from './login-page-layout.component';

@NgModule({
  imports: [LoginModule],
  declarations: [LoginPageLayoutComponent],
  exports: [LoginPageLayoutComponent]
})
export class LoginPageLayoutModule {}
