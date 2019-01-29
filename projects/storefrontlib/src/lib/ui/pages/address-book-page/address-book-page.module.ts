import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { AddressBookPageLayoutModule } from '../../layout/address-book-page-layout/address-book-page-layout.module';
import { AddressBookPageComponent } from './address-book-page.component';
import { AuthGuard } from '@spartacus/core';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuards],
    data: { pageLabel: 'address-book', cxPath: 'addressBook' },
    component: AddressBookPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    AddressBookPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddressBookPageComponent],
  exports: [AddressBookPageComponent]
})
export class AddressBookPageModule {}
