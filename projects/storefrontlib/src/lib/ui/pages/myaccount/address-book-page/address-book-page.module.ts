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
    path: 'my-account/address-book',
    canActivate: [AuthGuard, CmsPageGuards],
    // @TODO: Change page label to dedicated when will be ready on backend side.
    data: { pageLabel: 'orders' },
    component: AddressBookPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    AddressBookModule
  ],
  declarations: [AddressBookPageComponent],
  exports: [AddressBookPageComponent]
})
export class AddressBookPageModule {}
