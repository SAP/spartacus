import { NgModule } from '@angular/core';

import { LoginModule } from '../../../user/components/login/login.module';
import { LoginPageLayoutComponent } from './login-page-layout.component';
import { RouterModule } from '@angular/router';
import { UrlTranslationModule } from '@spartacus/core';

@NgModule({
  imports: [LoginModule, RouterModule, UrlTranslationModule],
  declarations: [LoginPageLayoutComponent],
  exports: [LoginPageLayoutComponent]
})
export class LoginPageLayoutModule {}
