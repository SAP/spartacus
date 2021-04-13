import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '@spartacus/storefront';
import { QuickOrderListComponent } from './quick-order-list.component';

@NgModule({
  imports: [CommonModule, CardModule],
  declarations: [QuickOrderListComponent],
  exports: [QuickOrderListComponent],
  entryComponents: [QuickOrderListComponent],
})
export class QuickOrderListModule {}
