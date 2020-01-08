import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ItemCounterModule, MediaModule } from '../../../../../shared/index';
import { CancelOrReturnItemsComponent } from './cancel-or-return-items.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    MediaModule,
    ItemCounterModule,
  ],
  declarations: [CancelOrReturnItemsComponent],
  exports: [CancelOrReturnItemsComponent],
  entryComponents: [CancelOrReturnItemsComponent],
})
export class CancelOrReturnItemsModule {}
