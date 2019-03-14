import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard } from './../../../cms/guards/cms-page.guard';
import { NgModule } from '@angular/core';
import { ResetNewPasswordLayoutModule } from './../../layout/reset-new-password-layout/reset-new-password-layout.module';
import { ResetNewPasswordComponent } from './reset-new-password-page.component';
import { NotAuthGuard } from '@spartacus/core';

const routes: Routes = [
  {
    path: null,
    canActivate: [NotAuthGuard, CmsPageGuard],
    component: ResetNewPasswordComponent,
    data: { pageLabel: 'homepage', cxPath: 'resetPassword' }
  }
];
@NgModule({
  imports: [ResetNewPasswordLayoutModule, RouterModule.forChild(routes)],
  declarations: [ResetNewPasswordComponent],
  exports: [ResetNewPasswordComponent]
})
export class ResetNewPasswordPageModule {}
