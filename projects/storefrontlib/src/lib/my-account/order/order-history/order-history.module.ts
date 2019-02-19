import { NgModule } from '@angular/core';
import { OrderHistoryComponent } from './order-history.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from '../../../bootstrap.module';
import { PaginationAndSortingModule } from '../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
import {
  UrlTranslationModule,
  ConfigModule,
  CmsConfig,
  UserService
} from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderHistoryComponent: { selector: 'cx-order-history' }
      }
    }),
    RouterModule,
    FormsModule,
    NgSelectModule,
    BootstrapModule,
    PaginationAndSortingModule,
    UrlTranslationModule
  ],
  declarations: [OrderHistoryComponent],
  exports: [OrderHistoryComponent],
  providers: [UserService],
  entryComponents: [OrderHistoryComponent]
})
export class OrderHistoryModule {}
