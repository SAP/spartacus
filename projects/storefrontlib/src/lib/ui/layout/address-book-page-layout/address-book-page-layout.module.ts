import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountModule } from '../../../my-account/my-account.module';

import { AddressBookPageLayoutComponent } from './address-book-page-layout.component';

@NgModule({
  imports: [CommonModule, MyAccountModule],
  declarations: [AddressBookPageLayoutComponent],
  exports: [AddressBookPageLayoutComponent]
})
export class AddressBookPageLayoutModule {}
