import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from './../../../cms/guards/cms-page.guard';
import { NgModule } from '@angular/core';
import { ResetNewPasswordLayoutModule } from './../../layout/reset-new-password-layout/reset-new-password-layout.module';
import { ResetNewPasswordComponent } from './reset-new-password-page.component';
import { NotAuthGuard } from '@spartacus/core';

const routes: Routes = [
  {
    path: 'reset-new-password/:token',
    canActivate: [NotAuthGuard, CmsPageGuards],
    data: { pageLabel: 'homepage' },
    component: ResetNewPasswordComponent
  }
];
@NgModule({
  imports: [ResetNewPasswordLayoutModule, RouterModule.forChild(routes)],
  declarations: [ResetNewPasswordComponent],
  exports: [ResetNewPasswordComponent]
})
export class ResetNewPasswordPageModule {}
