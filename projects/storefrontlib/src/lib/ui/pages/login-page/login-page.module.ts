import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from './../../../cms/guards/cms-page.guard';
import { NgModule } from '@angular/core';
import { LoginPageLayoutModule } from './../../layout/login-page-layout/login-page-layout.module';
import { LoginPageComponent } from './login-page.component';
import { NotAuthGuard } from '@spartacus/core';

const routes: Routes = [
  {
    path: null,
    canActivate: [NotAuthGuard, CmsPageGuards],
    component: LoginPageComponent,
    data: { pageLabel: 'login', cxPath: 'login', breadcrumb: '/ Login' }
  }
];
@NgModule({
  imports: [LoginPageLayoutModule, RouterModule.forChild(routes)],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent]
})
export class LoginPageModule {}
