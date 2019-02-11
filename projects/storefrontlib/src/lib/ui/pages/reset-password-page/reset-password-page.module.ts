import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ResetPasswordPageComponent } from './reset-password-page.component';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { NotAuthGuard } from '@spartacus/core';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { UserComponentModule } from '../../../user/user.module';
import { OutletRefModule } from '../../../outlet/outlet-ref/outlet-ref.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [NotAuthGuard, CmsPageGuards],
    component: ResetPasswordPageComponent,
    data: { pageLabel: 'updatePassword', cxPath: 'forgotPassword' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    UserComponentModule,
    OutletRefModule
  ],
  declarations: [ResetPasswordPageComponent],
  exports: [ResetPasswordPageComponent]
})
export class ResetPasswordPageModule {}
