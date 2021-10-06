import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { CarouselModule } from '../../../../shared/components/carousel/carousel.module';
import { MediaModule } from '../../../../shared/components/media/media.module';
import { ProductReferencesComponent } from './product-references.component';

@NgModule({
  imports: [CommonModule, CarouselModule, MediaModule, RouterModule, UrlModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductReferencesComponent: {
          component: ProductReferencesComponent,
        },
      },
    }),
  ],
  declarations: [ProductReferencesComponent],
  exports: [ProductReferencesComponent],
})
export class ProductReferencesModule {}
