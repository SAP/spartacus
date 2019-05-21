import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OrderAdapter } from '../connectors/order/order.adapter';
import { OccOrderAdapter } from './occ-order.adapter';
import { ORDER_NORMALIZER } from '../connectors/order/converters';
import { OccOrderNormalizer } from './converters/occ-order-normalizer';
import { UserDetailsAdapter } from '../connectors/details/user-details.adapter';
import { OccUserDetailsAdapter } from './occ-user-details.adapter';
import { UserAddressAdapter } from '../connectors/address/user-address.adapter';
import { OccUserAddressAdapter } from './occ-user-address.adapter';
import { UserAccountAdapter } from '../connectors/account/user-account.adapter';
import { OccUserAccountAdapter } from './occ-user-account.adapter';
import { UserPaymentAdapter } from '../connectors/payment/user-payment.adapter';
import { OccUserPaymentAdapter } from './occ-user-payment.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    { provide: UserDetailsAdapter, useClass: OccUserDetailsAdapter },
    { provide: UserAddressAdapter, useClass: OccUserAddressAdapter },
    { provide: UserAccountAdapter, useClass: OccUserAccountAdapter },
    {
      provide: UserPaymentAdapter,
      useClass: OccUserPaymentAdapter,
    },
    { provide: OrderAdapter, useClass: OccOrderAdapter },
    { provide: ORDER_NORMALIZER, useClass: OccOrderNormalizer, multi: true },
  ],
})
export class UserOccModule {}
