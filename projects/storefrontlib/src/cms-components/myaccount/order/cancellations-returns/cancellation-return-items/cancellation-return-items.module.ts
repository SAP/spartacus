import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  I18nModule,
  //UrlModule,
} from '@spartacus/core';

import { MediaModule } from '../../../../../shared/index';

import { CancellationReturnItemsComponent } from './cancellation-return-items.component';

@NgModule({
  imports: [
    CommonModule,
    //UrlModule,
    I18nModule,
    MediaModule,
  ],
  declarations: [CancellationReturnItemsComponent],
  exports: [CancellationReturnItemsComponent],
  entryComponents: [CancellationReturnItemsComponent],
})
export class CancellationReturnItemsModule {}
