import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from './../../../cms/guards/cms-page.guard';
import { NotAuthGuard } from './../../../auth/guards/not-auth.guard';
import { NgModule } from '@angular/core';
import { LoginPageLayoutModule } from './../../layout/login-page-layout/login-page-layout.module';
import { LoginPageComponent } from './login-page.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [NotAuthGuard, CmsPageGuards],
    data: { pageLabel: 'login' },
    component: LoginPageComponent
  }
];
@NgModule({
  imports: [LoginPageLayoutModule, RouterModule.forChild(routes)],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent]
})
export class LoginPageModule {}
