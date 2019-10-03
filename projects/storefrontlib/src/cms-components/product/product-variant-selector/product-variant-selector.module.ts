import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  ConfigModule,
  UrlModule,
  I18nModule,
} from '@spartacus/core';
import { ProductVariantSelectorComponent } from './product-variant-selector.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductVariantSelectorComponent: {
          component: ProductVariantSelectorComponent,
        },
      },
    }),
    I18nModule,
  ],
  declarations: [ProductVariantSelectorComponent],
  entryComponents: [ProductVariantSelectorComponent],
})
export class ProductVariantSelectorModule {}
