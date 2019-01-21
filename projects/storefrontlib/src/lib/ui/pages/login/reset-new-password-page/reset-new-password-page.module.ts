import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from './../../../../cms/guards/cms-page.guard';
import { NgModule } from '@angular/core';
import { ResetNewPasswordComponent } from './reset-new-password-page.component';
import { NotAuthGuard } from '@spartacus/core';
import { PageLayoutModule } from '../../../../cms/page-layout/page-layout.module';

import { ResetNewPasswordModule } from '../../../../user/components/reset-new-password/reset-new-password.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [NotAuthGuard, CmsPageGuards],
    component: ResetNewPasswordComponent,
    data: { pageLabel: 'homepage', cxPath: 'resetPassword' }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PageLayoutModule,
    ResetNewPasswordModule
  ],
  declarations: [ResetNewPasswordComponent],
  exports: [ResetNewPasswordComponent]
})
export class ResetNewPasswordPageModule {}
