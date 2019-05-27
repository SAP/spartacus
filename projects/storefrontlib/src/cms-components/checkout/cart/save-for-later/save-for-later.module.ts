import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveForLaterComponent } from './save-for-later.component';
import { CartSharedModule } from '../cart-shared';
import { SaveForLaterItemListComponent } from './save-for-later-item-list/save-for-later-item-list.component';
import { SaveForLaterItemComponent } from './save-for-later-item/save-for-later-item.component';
import { I18nModule, UrlModule } from '@spartacus/core';
import { MediaModule } from '../../../../shared';
import { RouterModule } from '@angular/router';
import { PromotionsModule } from '../../../../lib/checkout/components/promotions/promotions.module';

@NgModule({
  declarations: [
    SaveForLaterComponent,
    SaveForLaterItemListComponent,
    SaveForLaterItemComponent,
  ],
  imports: [
    CommonModule,
    CartSharedModule,
    I18nModule,
    MediaModule,
    RouterModule,
    UrlModule,
    PromotionsModule,
  ],
  exports: [
    SaveForLaterComponent,
    SaveForLaterItemListComponent,
    SaveForLaterItemComponent,
  ],
  entryComponents: [SaveForLaterComponent],
})
export class SaveForLaterModule {}
