import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccModule } from '../../occ/occ.module';
import { OccUserService } from './user.service';
import { OrderAdapter } from '../connectors/order.adapter';
import { OccOrderAdapter } from './occ-order.adapter';
import { ORDER_NORMALIZER } from '../connectors/converters';
import { OccOrderNormalizer } from './converters/occ-order-normalizer';

import { OccOrderService } from './order.service';
@NgModule({
  imports: [CommonModule, HttpClientModule, OccModule],
  providers: [
    OccUserService,
    { provide: OrderAdapter, useClass: OccOrderAdapter },
    { provide: ORDER_NORMALIZER, useClass: OccOrderNormalizer, multi: true },
  ],
})
export class UserOccModule {}
