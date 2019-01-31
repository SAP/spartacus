import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressBookComponent } from './address-book.component';
import { AddressCardComponent } from './address-card/address-card.component';
import { CardModule } from '../../ui/components/card/card.module';
import { AddressFormModule } from '../../checkout/components/multi-step-checkout/shipping-address/address-form/address-form.module';
import { SpinnerModule } from '../../ui/components/spinner/spinner.module';
import { UserService, ConfigModule, CmsConfig } from '@spartacus/core';
import { AddressBookComponentService } from './address-book.component.service';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountAddressBookComponent: {
          selector: 'cx-address-book',
          providers: [
            {
              provide: AddressBookComponentService,
              useClass: AddressBookComponentService,
              deps: [UserService]
            }
          ]
        }
      }
    }),
    CardModule,
    AddressFormModule,
    SpinnerModule
  ],
  declarations: [AddressBookComponent, AddressCardComponent],
  exports: [AddressBookComponent, AddressCardComponent],
  providers: [UserService],
  entryComponents: [AddressBookComponent]
})
export class AddressBookModule {}
