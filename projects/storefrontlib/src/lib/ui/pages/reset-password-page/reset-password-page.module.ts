import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ResetPasswordPageComponent } from './reset-password-page.component';
import { NotAuthGuard } from './../../../auth/guards/not-auth.guard';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ResetPasswordPageLayoutModule } from '../../layout/reset-password-page-layout/reset-password-page-layout.module';
import { ConfigurableRoutes } from '@spartacus/core';

const routes: ConfigurableRoutes = [
  {
    path: null,
    canActivate: [NotAuthGuard, CmsPageGuards],
    component: ResetPasswordPageComponent,
    data: { pageLabel: 'login', cxPath: 'resetPassword' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResetPasswordPageComponent],
  exports: [ResetPasswordPageComponent]
})
export class ResetPasswordPageModule {}
