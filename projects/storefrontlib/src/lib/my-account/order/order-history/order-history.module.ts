import { NgModule } from '@angular/core';
import { OrderHistoryComponent } from './order-history.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from '../../../bootstrap.module';
import { PaginationAndSortingModule } from '../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
import { UrlTranslatorModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    BootstrapModule,
    PaginationAndSortingModule,
    UrlTranslatorModule
  ],
  declarations: [OrderHistoryComponent],
  exports: [OrderHistoryComponent]
})
export class OrderHistoryModule {}
