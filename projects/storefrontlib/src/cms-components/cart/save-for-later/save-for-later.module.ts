import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveForLaterComponent } from './save-for-later.component';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { PromotionsModule } from '../../checkout/components/promotions/promotions.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SaveForLaterComponent: {
          component: SaveForLaterComponent,
        },
      },
    }),
    I18nModule,
    CartSharedModule,
    PromotionsModule,
  ],
  declarations: [SaveForLaterComponent],
  exports: [SaveForLaterComponent],
  entryComponents: [SaveForLaterComponent],
})
export class SaveForLaterModule {}
