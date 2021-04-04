import { NgModule } from '@angular/core';
import { ProductCarouselModule as ProductCarouselComponentModule } from './carousel/components/product-carousel/product-carousel.module';
import { ProductReferencesModule } from './carousel/components/product-references/product-references.module';

@NgModule({
  imports: [ProductCarouselComponentModule, ProductReferencesModule],
})
export class ProductCmsModule {}
