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
import { VariantColorSelectorModule } from './color-selector/color-selector.module';
import { VariantStyleIconsModule } from './style-icons/style-icons.module';
import { ProductVariantGuard } from './guards/product-variant.guard';
import { VariantStyleIconsComponent } from './style-icons/style-icons.component';

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
    VariantColorSelectorModule,
    VariantStyleIconsModule,
  ],
  declarations: [ProductVariantSelectorComponent],
  entryComponents: [ProductVariantSelectorComponent],
  exports: [VariantStyleIconsComponent],
})
export class ProductVariantSelectorModule {}
