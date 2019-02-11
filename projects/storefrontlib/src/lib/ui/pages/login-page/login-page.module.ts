import { RouterModule } from '@angular/router';
import { CmsPageGuards } from './../../../cms/guards/cms-page.guard';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
import { NotAuthGuard, UrlTranslationModule } from '@spartacus/core';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { LoginModule } from '../../../user/login/login.module';
import { OutletRefModule } from '../../../outlet/outlet-ref/outlet-ref.module';

@NgModule({
  imports: [
    // TODO: drop this module once components have been moved to cms components
    RouterModule.forChild([
      {
        path: null,
        canActivate: [NotAuthGuard, CmsPageGuards],
        component: LoginPageComponent,
        data: { pageLabel: 'login', cxPath: 'login' }
      }
    ]),
    PageLayoutModule,
    LoginModule,
    UrlTranslationModule,
    OutletRefModule
  ],
  declarations: [LoginPageComponent]
})
export class LoginPageModule {}
