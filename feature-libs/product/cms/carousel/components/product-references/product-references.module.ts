import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from '@spartacus/content/carousel';
import { CmsConfig, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
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
})
export class ProductReferencesModule {}
