import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ItemCounterModule } from '@spartacus/storefront';
import { BundleCarouselComponent } from './bundle-carousel.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule, ItemCounterModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        BundleCarouselComponent: {
          component: BundleCarouselComponent,
          data: {
            inventoryDisplay: false,
          },
        },
      },
    }),
  ],
  declarations: [BundleCarouselComponent],
  exports: [BundleCarouselComponent],
})
export class BundleCarouselModule {}
