import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveForLaterComponent } from './save-for-later.component';
import {
  ConfigModule,
  CmsConfig,
  I18nModule,
  FeaturesConfig,
} from '@spartacus/core';
import { CartSharedModule } from '../cart-shared/cart-shared.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        SaveForLaterComponent: {
          component: SaveForLaterComponent,
        },
      },
      features: {
        saveForLater: '1.5',
      },
    }),
    I18nModule,
    CartSharedModule,
  ],
  declarations: [SaveForLaterComponent],
  exports: [SaveForLaterComponent],
  entryComponents: [SaveForLaterComponent],
})
export class SaveForLaterModule {}
