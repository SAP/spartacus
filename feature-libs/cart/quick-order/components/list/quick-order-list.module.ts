import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemCounterModule, MediaModule } from '@spartacus/storefront';
import { I18nModule } from 'projects/core/src/i18n';
import { UrlModule } from 'projects/core/src/routing';
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
