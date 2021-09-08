import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ProductAttributesComponent } from './product-attributes.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductSpecsTabComponent: {
          component: ProductAttributesComponent,
        },
      },
    }),
  ],
  declarations: [ProductAttributesComponent],
  exports: [ProductAttributesComponent],
})
export class ProductAttributesModule {}
