import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';
import { PageLayoutModule } from '../../../cms-structure/page/index';
import { defaultRoutingConfig } from './default-routing-config';
import { OrderConfirmationPageModule } from './order-confirmation-page/order-confirmation-page.module';

@NgModule({
  imports: [
    ConfigModule.withConfig(defaultRoutingConfig),
    CommonModule,
    OrderConfirmationPageModule,
    PageLayoutModule,
  ],
})
export class PagesModule {}
