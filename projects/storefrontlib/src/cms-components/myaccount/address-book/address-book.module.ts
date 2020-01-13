import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UserAddressService,
} from '@spartacus/core';
import { CardModule } from '../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { AddressFormModule } from '../../checkout/components/shipping-address/address-form/address-form.module';
import { AddressBookComponent } from './address-book.component';
import { AddressBookComponentService } from './address-book.component.service';
import { AddressCardComponent } from './address-card/address-card.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountAddressBookComponent: {
          component: AddressBookComponent,
          providers: [
            {
              provide: AddressBookComponentService,
              useClass: AddressBookComponentService,
              deps: [UserAddressService],
            },
          ],
          guards: [AuthGuard],
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
  providers: [UserAddressService, AddressBookComponentService],
  entryComponents: [AddressBookComponent],
})
export class AddressBookModule {}
