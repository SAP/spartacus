import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderApprovalDetailsModule } from './details/order-approval-details.module';
import { OrderApprovalListModule } from './list/order-approval-list.module';

@NgModule({
  imports: [RouterModule, OrderApprovalListModule, OrderApprovalDetailsModule],
})
export class OrderApprovalComponentsModule {}
