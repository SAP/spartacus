import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccModule } from '../../occ/occ.module';
import { OrderAdapter } from '../connectors/order/order.adapter';
import { OccOrderAdapter } from './occ-order.adapter';
import { ORDER_NORMALIZER } from '../connectors/order/converters';
import { OccOrderNormalizer } from './converters/occ-order-normalizer';
import { UserDetailsAdapter } from '../connectors/details';
import { OccUserDetailsAdapter } from './occ-user-details.adapter';
import { UserAddressAdapter } from '../connectors/address';
import { OccUserAddressAdapter } from './occ-user-address.adapter';
import { UserAccountAdapter } from '../connectors/account';
import { OccUserAccountAdapter } from './occ-user-account.adapter';
import { UserPaymentMethodAdapter } from '../connectors/payment-method/user-payment-method.adapter';
import { OccUserPaymentMethodAdapter } from './occ-user-payment-method.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule, OccModule],
  providers: [
    { provide: UserDetailsAdapter, useClass: OccUserDetailsAdapter },
    { provide: UserAddressAdapter, useClass: OccUserAddressAdapter },
    { provide: UserAccountAdapter, useClass: OccUserAccountAdapter },
    {
      provide: UserPaymentMethodAdapter,
      useClass: OccUserPaymentMethodAdapter,
    },
    { provide: OrderAdapter, useClass: OccOrderAdapter },
    { provide: ORDER_NORMALIZER, useClass: OccOrderNormalizer, multi: true },
  ],
})
export class UserOccModule {}
