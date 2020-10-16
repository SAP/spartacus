import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { OrderApprovalListModule } from './list/order-approval-list.module';
import { OrderApprovalDetailsModule } from './details/order-approval-details.module';
import { orderApprovalRoutingConfig } from './order-approval.config';

@NgModule({
  imports: [RouterModule, OrderApprovalListModule, OrderApprovalDetailsModule],
  providers: [provideDefaultConfig(orderApprovalRoutingConfig)],
})
export class OrderApprovalComponentsModule {}
