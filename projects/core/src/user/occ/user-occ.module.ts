import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccModule } from '../../occ/occ.module';
import { OccUserService } from './user.service';
import { OrderAdapter } from '../connectors/order/order.adapter';
import { OccOrderAdapter } from './occ-order.adapter';
import { ORDER_NORMALIZER } from '../connectors/order/converters';
import { OccOrderNormalizer } from './converters/occ-order-normalizer';
import { UserDetailsAdapter } from '../connectors/details';
import { OccUserDetailsAdapter } from './occ-user-details.adapter';
import { UserAddressAdapter } from '../connectors/address';
import { OccUserAddressAdapter } from './occ-user-address.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule, OccModule],
  providers: [
    OccUserService,
    { provide: UserDetailsAdapter, useClass: OccUserDetailsAdapter },
    { provide: UserAddressAdapter, useClass: OccUserAddressAdapter },

    { provide: OrderAdapter, useClass: OccOrderAdapter },
    { provide: ORDER_NORMALIZER, useClass: OccOrderNormalizer, multi: true },
  ],
})
export class UserOccModule {}
