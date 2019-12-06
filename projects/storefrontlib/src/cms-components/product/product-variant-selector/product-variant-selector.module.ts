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
import { VariantStyleSelectorModule } from './style-selector/style-selector.module';
import { VariantSizeSelectorModule } from './size-selector/size-selector.module';
import { ProductVariantGuard } from './guards/product-variant.guard';
import { StyleIconsComponent } from './style-icons/style-icons.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductVariantSelectorComponent: {
          component: ProductVariantSelectorComponent,
          guards: [ProductVariantGuard],
        },
      },
    }),
    I18nModule,
    VariantStyleSelectorModule,
    VariantSizeSelectorModule,
  ],
  declarations: [ProductVariantSelectorComponent, StyleIconsComponent],
  entryComponents: [ProductVariantSelectorComponent],
  exports: [StyleIconsComponent],
})
export class ProductVariantSelectorModule {}
