import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from '../../bootstap.module';
import { PaginationAndSortingModule } from '../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
/* component */
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    BootstrapModule,
    PaginationAndSortingModule
  ],
  declarations: [OrderHistoryComponent, OrderDetailsComponent],
  exports: [OrderHistoryComponent, OrderDetailsComponent]
})
export class OrderModule {}
