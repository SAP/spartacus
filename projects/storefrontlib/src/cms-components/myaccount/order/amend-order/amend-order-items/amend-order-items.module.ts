import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import {
  FormErrorsModule,
  ItemCounterModule,
  MediaModule,
} from '../../../../../shared/index';
import { CancelOrReturnItemsComponent } from './amend-order-items.component';

/**
 * @deprecated since 4.2 - use order lib instead
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    MediaModule,
    ItemCounterModule,
    FeaturesConfigModule,
    FormErrorsModule,
  ],
  declarations: [CancelOrReturnItemsComponent],
  exports: [CancelOrReturnItemsComponent],
})
export class AmendOrderItemsModule {}
