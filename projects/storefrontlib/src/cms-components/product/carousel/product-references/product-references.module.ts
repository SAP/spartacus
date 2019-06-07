import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CarouselModule } from 'projects/storefrontlib/src/shared/components/carousel/carousel.module';
import { ProductReferencesComponent } from './product-references.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductReferencesComponent: {
          selector: 'cx-product-references',
        },
      },
    }),
  ],
  declarations: [ProductReferencesComponent],
  entryComponents: [ProductReferencesComponent],
  exports: [ProductReferencesComponent],
})
export class ProductReferencesModule {}
