import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ResetPasswordPageComponent } from './reset-password-page.component';
import { CmsPageGuards } from '../../../../cms/guards/cms-page.guard';
import { NotAuthGuard } from '@spartacus/core';
import { PageTemplateModule } from '../../../layout/page-template/page-template.module';
import { UserComponentModule } from '../../../../user';

const routes: Routes = [
  {
    path: null,
    canActivate: [NotAuthGuard, CmsPageGuards],
    component: ResetPasswordPageComponent,
    data: { pageLabel: 'login', cxPath: 'forgotPassword' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageTemplateModule,
    UserComponentModule
  ],
  declarations: [ResetPasswordPageComponent],
  exports: [ResetPasswordPageComponent]
})
export class ResetPasswordPageModule {}
