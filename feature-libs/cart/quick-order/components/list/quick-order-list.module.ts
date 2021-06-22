import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ItemCounterModule, MediaModule } from '@spartacus/storefront';
import { QuickOrderItemComponent } from './item/quick-order-item.component';
import { QuickOrderListComponent } from './quick-order-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MediaModule,
    UrlModule,
    I18nModule,
    ItemCounterModule,
  ],
  declarations: [QuickOrderListComponent, QuickOrderItemComponent],
  exports: [QuickOrderListComponent],
  entryComponents: [QuickOrderListComponent],
})
export class QuickOrderListModule {}
