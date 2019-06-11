import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, UrlModule } from '@spartacus/core';
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
  ],
  declarations: [ProductVariantSelectorComponent],
  entryComponents: [ProductVariantSelectorComponent],
})
export class ProductVariantSelectorModule {}
