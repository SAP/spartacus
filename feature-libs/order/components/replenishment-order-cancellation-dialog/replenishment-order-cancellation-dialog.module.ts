import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  ModalModule,
} from '@spartacus/storefront';
import { ReplenishmentOrderCancellationDialogComponent } from './replenishment-order-cancellation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    ModalModule,
    KeyboardFocusModule,
    FeaturesConfigModule,
  ],
  declarations: [ReplenishmentOrderCancellationDialogComponent],
  exports: [ReplenishmentOrderCancellationDialogComponent],
})
export class ReplenishmentOrderCancellationDialogModule {}
