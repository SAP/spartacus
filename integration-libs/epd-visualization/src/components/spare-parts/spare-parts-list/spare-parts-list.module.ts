import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  AddToCartModule,
  CarouselModule,
  IconModule,
  MediaModule,
  ProductReferencesModule,
} from '@spartacus/storefront';
import { SparePartsListComponent } from './spare-parts-list.component';
import { VerticalCarouselModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProductReferencesModule,
    MediaModule,
    IconModule,
    CarouselModule,
    VerticalCarouselModule,
    AddToCartModule,
    UrlModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        SparePartsListComponent: { component: SparePartsListComponent },
      },
    } as CmsConfig),
  ],
  declarations: [SparePartsListComponent],
  exports: [SparePartsListComponent],
  entryComponents: [SparePartsListComponent],
})
export class SparePartsListModule {}
