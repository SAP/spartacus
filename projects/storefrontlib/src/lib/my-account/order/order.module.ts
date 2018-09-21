import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from '../../bootstrap.module';
import { PaginationAndSortingModule } from '../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
import { CartSharedModule } from '../../cart/components/cart-shared/cart-shared.module';
import { CardModule } from '../../ui/components/card/card.module';
/* component */
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CartDetailsModule } from '../../cart';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    BootstrapModule,
    PaginationAndSortingModule,
    CartDetailsModule,
    CartSharedModule,
    CardModule
  ],
  declarations: [OrderHistoryComponent, OrderDetailsComponent],
  exports: [OrderHistoryComponent, OrderDetailsComponent]
})
export class OrderModule {}
