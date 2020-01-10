import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { I18nModule, FeaturesConfigModule } from '@spartacus/core';

import { MediaModule, ItemCounterModule } from '../../../../../shared/index';

import { CancelOrReturnItemsComponent } from './cancel-or-return-items.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    MediaModule,
    ItemCounterModule,
    FeaturesConfigModule,
  ],
  declarations: [CancelOrReturnItemsComponent],
  exports: [CancelOrReturnItemsComponent],
  entryComponents: [CancelOrReturnItemsComponent],
})
export class CancelOrReturnItemsModule {}
