import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuickOrderListComponent } from './quick-order-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [QuickOrderListComponent],
  exports: [QuickOrderListComponent],
  entryComponents: [QuickOrderListComponent],
})
export class QuickOrderListModule {}
