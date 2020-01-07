import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ItemCounterModule, MediaModule } from '../../../../../shared/index';
import { CancelOrReturnItemsComponent } from './cancel-or-return-items.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    MediaModule,
    ItemCounterModule,

    RouterModule,
    UrlModule,
  ],
  declarations: [CancelOrReturnItemsComponent],
  exports: [CancelOrReturnItemsComponent],
  entryComponents: [CancelOrReturnItemsComponent],
})
export class CancelOrReturnItemsModule {}
