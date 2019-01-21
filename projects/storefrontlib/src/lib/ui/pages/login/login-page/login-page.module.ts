import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from './../../../../cms/guards/cms-page.guard';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
import { NotAuthGuard, UrlTranslationModule } from '@spartacus/core';

import { PageLayoutModule } from '../../../../cms/page-layout/page-layout.module';
import { LoginModule } from '../../../../user';

const routes: Routes = [
  {
    path: null,
    canActivate: [NotAuthGuard, CmsPageGuards],
    component: LoginPageComponent,
    data: { pageLabel: 'login', cxPath: 'login' }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    UrlTranslationModule,
    PageLayoutModule,
    LoginModule
  ],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent]
})
export class LoginPageModule {}
