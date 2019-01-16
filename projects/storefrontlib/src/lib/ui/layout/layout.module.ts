import { NgModule } from '@angular/core';

import { OutletRefModule } from '../../outlet/index';

import { PageTemplateModule } from './page-template/page-template.module';
import { MainModule } from './main/main.module';
import { OrderConfirmationPageLayoutModule } from './order-confirmation-page-layout/order-confirmation-page-layout.module';
import { OrderDetailsPageLayoutModule } from './order-details-page-layout/order-details-page-layout.module';
import { OrderHistoryPageLayoutModule } from './order-history-page-layout/order-history-page-layout.module';

const layoutModules = [
  PageTemplateModule,
  OrderHistoryPageLayoutModule,
  OrderDetailsPageLayoutModule,
  OrderConfirmationPageLayoutModule,
  OutletRefModule
];

@NgModule({
  imports: [MainModule, ...layoutModules],
  exports: [MainModule, ...layoutModules]
})
export class LayoutModule {}
