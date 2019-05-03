import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UserService,
} from '@spartacus/core';
import { AddressFormModule } from '../../../lib/checkout/components/multi-step-checkout/shipping-address/address-form/address-form.module';
import { CardModule } from '../../../lib/ui/components/card/card.module';
import { SpinnerModule } from '../../../lib/ui/components/spinner/spinner.module';
import { AddressBookComponent } from './address-book.component';
import { AddressBookComponentService } from './address-book.component.service';
import { AddressCardComponent } from './address-card/address-card.component';

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
              deps: [UserService],
            },
          ],
        },
      },
    }),
    CardModule,
    AddressFormModule,
    SpinnerModule,
    I18nModule,
  ],
  declarations: [AddressBookComponent, AddressCardComponent],
  exports: [AddressBookComponent, AddressCardComponent],
  providers: [UserService, AddressBookComponentService],
  entryComponents: [AddressBookComponent],
})
export class AddressBookModule {}
