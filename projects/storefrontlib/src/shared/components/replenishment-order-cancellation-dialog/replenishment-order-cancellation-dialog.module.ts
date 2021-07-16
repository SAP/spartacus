import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { ReplenishmentOrderCancellationDialogComponent } from './replenishment-order-cancellation-dialog.component';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
@NgModule({
  imports: [CommonModule, I18nModule, KeyboardFocusModule],
  declarations: [ReplenishmentOrderCancellationDialogComponent],
  exports: [ReplenishmentOrderCancellationDialogComponent],
})
export class ReplenishmentOrderCancellationDialogModule {}
