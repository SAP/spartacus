import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  FeaturesConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { SaveForLaterComponent } from './save-for-later.component';

@NgModule({
  imports: [CommonModule, I18nModule, CartSharedModule],
  providers: [
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        SaveForLaterComponent: {
          component: SaveForLaterComponent,
        },
      },
    }),
  ],
  declarations: [SaveForLaterComponent],
  exports: [SaveForLaterComponent],
})
export class SaveForLaterModule {}
