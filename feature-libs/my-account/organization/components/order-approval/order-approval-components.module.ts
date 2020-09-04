import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderApprovalListModule } from './list/order-approval-list.module';
import { OrderApprovalDetailsModule } from './details/order-approval-details.module';

@NgModule({
  imports: [RouterModule, OrderApprovalListModule, OrderApprovalDetailsModule],
})
export class OrderApprovalComponentsModule {}
