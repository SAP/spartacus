import { NgModule } from '@angular/core';
import { BundleCarouselModule } from './bundle-carousel/bundle-carousel.module';
import { BundleMainModule } from './bundle-main/bundle-main.module';
import { CartBundleListRowComponent } from './cart-bundle-list-row/cart-bundle-list-row.component';
import { ProductDetailsDialogModule } from './product-details-dialog';

@NgModule({
  imports: [BundleCarouselModule, BundleMainModule, ProductDetailsDialogModule],
  declarations: [CartBundleListRowComponent],
  exports: [CartBundleListRowComponent],
})
export class BundleComponentsModule {}
