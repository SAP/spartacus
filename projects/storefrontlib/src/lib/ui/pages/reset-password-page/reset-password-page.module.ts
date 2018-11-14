import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordPageComponent } from './reset-password-page.component';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ResetPasswordPageLayoutModule } from '../../layout/reset-password-page-layout/reset-password-page-layout.module';
import { NotAuthGuard } from '@spartacus/core';

const routes: Routes = [
  {
    path: 'reset-password',
    canActivate: [NotAuthGuard, CmsPageGuards],
    data: { pageLabel: 'login' },
    component: ResetPasswordPageComponent
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
