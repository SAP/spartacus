import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductReferencesComponent } from './product-references.component';
// import { MediaModule } from '../../ui/components/media/media.module';
import { ProductCarouselModule } from '../product-carousel/product-carousel.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // MediaModule,
    ProductCarouselModule
  ],
  declarations: [ProductReferencesComponent],
  entryComponents: [ProductReferencesComponent],
  exports: [ProductReferencesComponent]
})
export class ProductReferencesModule {}
