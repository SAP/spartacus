import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ReplenishmentOrderCancellationDialogComponent } from './replenishment-order-cancellation-dialog.component';

@NgModule({
  imports: [CommonModule, I18nModule, KeyboardFocusModule],
  declarations: [ReplenishmentOrderCancellationDialogComponent],
  exports: [ReplenishmentOrderCancellationDialogComponent],
})
export class ReplenishmentOrderCancellationDialogModule {}
