import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../../cms/guards/cms-page.guard';

import { AddressBookPageComponent } from './address-book-page.component';
import { AuthGuard } from '@spartacus/core';
import { PageLayoutModule } from '../../../../cms/page-layout/page-layout.module';
import { AddressBookModule } from '../../../../my-account/address-book/address-book.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuards],
    data: { pageLabel: 'address-book', cxPath: 'addressBook' },
    // after implementing the JSP include, we can use the standard `PageLayoutComponent`
    component: AddressBookPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    // As long as we do not have a JSP inlcude component (#1079) and
    // a specific CMS implementation for the adddress book, we stick to this hardcoded
    // `AddressBookModule` module.
    AddressBookModule
  ],
  declarations: [AddressBookPageComponent],
  exports: [AddressBookPageComponent]
})
export class AddressBookPageModule {}
