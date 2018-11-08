import { NgModule } from '@angular/core';

import { LoginModule } from '../../../user/components/login/login.module';
import { LoginPageLayoutComponent } from './login-page-layout.component';
import { RouterModule } from '@angular/router';
import { PathModule } from '@spartacus/core';

@NgModule({
  imports: [LoginModule, RouterModule, PathModule],
  declarations: [LoginPageLayoutComponent],
  exports: [LoginPageLayoutComponent]
})
export class LoginPageLayoutModule {}
