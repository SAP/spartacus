import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveForLaterComponent } from './save-for-later.component';
import {
  CmsConfig,
  FeaturesConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CartSharedModule } from '../cart-shared/cart-shared.module';

@NgModule({
  imports: [CommonModule, I18nModule, CartSharedModule],
  providers: [
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        SaveForLaterComponent: {
          component: SaveForLaterComponent,
        },
      },
      features: {
        saveForLater: '1.5',
      },
    }),
  ],
  declarations: [SaveForLaterComponent],
  exports: [SaveForLaterComponent],
  entryComponents: [SaveForLaterComponent],
})
export class SaveForLaterModule {}
