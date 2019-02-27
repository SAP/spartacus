import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { GuestLoginPageComponent } from './guest-login-page.component';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { NotAuthGuard } from '@spartacus/core';
import { GuestLoginModule } from '../../../user/guest-login/guest-login.module';
import { OutletRefModule } from '../../../outlet';

const routes: Routes = [
  {
    path: null,
    canActivate: [NotAuthGuard, CmsPageGuards],
    component: GuestLoginPageComponent,
    data: { pageLabel: 'checkout-login', cxPath: 'guestLogin' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GuestLoginModule,
    PageLayoutModule,
    OutletRefModule
  ],
  declarations: [GuestLoginPageComponent],
  exports: [GuestLoginPageComponent]
})
export class GuestLoginPageModule {}
