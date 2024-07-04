import { NgModule } from '@angular/core';
import { ServiceDetailsCardComponent } from './order-summary/service-details-card.component';
import {
  CardModule,
} from '@spartacus/storefront';
import { CommonModule } from '@angular/common';
const serviceOrderComponents = [ServiceDetailsCardComponent];
@NgModule({
  imports: [CommonModule, CardModule],
  exports: [serviceOrderComponents],
  declarations: [serviceOrderComponents],
  providers: [],
})
export class ServiceOrderComponentModule {}
