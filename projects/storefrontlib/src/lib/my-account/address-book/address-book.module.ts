import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressBookComponent } from './address-book.component';
import { AddressCardComponent } from './address-card/address-card.component';
import { CardModule } from '../../ui/components/card/card.module';
import { AddressFormModule } from '../../checkout/components/multi-step-checkout/shipping-address/address-form/address-form.module';
import { SpinnerModule } from '../../ui/components/spinner/spinner.module';
import { UserService } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, CardModule, AddressFormModule, SpinnerModule],
  declarations: [AddressBookComponent, AddressCardComponent],
  exports: [AddressBookComponent, AddressCardComponent],
  providers: [UserService]
})
export class AddressBookModule {}
