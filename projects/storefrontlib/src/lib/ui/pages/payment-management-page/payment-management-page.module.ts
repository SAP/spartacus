import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PaymentManagementPageComponent } from './payment-management-page.component';
import { PaymentManagementPageLayoutModule } from '../../layout/payment-management-page-layout/payment-management-page-layout.module';
import { AuthGuard } from './../../../auth/guards/auth.guard';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

const routes: Routes = [
  {
    path: 'payment-management',
    canActivate: [AuthGuard, CmsPageGuards],
    data: { pageLabel: 'homepage' }, // TODO temporary hack: 'homepage' should be changed to proper value when we have dedicated CMS page
    component: PaymentManagementPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    PaymentManagementPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentManagementPageComponent],
  exports: [PaymentManagementPageComponent]
})
export class PaymentManagementPageModule {}
