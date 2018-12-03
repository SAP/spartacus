import { NgModule } from '@angular/core';

import { LoginModule } from '../../../user/components/login/login.module';
import { LoginPageLayoutComponent } from './login-page-layout.component';
import { RouterModule } from '@angular/router';
import { UrlTranslatorModule } from '@spartacus/core';

@NgModule({
  imports: [LoginModule, RouterModule, UrlTranslatorModule],
  declarations: [LoginPageLayoutComponent],
  exports: [LoginPageLayoutComponent]
})
export class LoginPageLayoutModule {}
