import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  StripHtmlModule,
  UrlTranslationModule,
} from '@spartacus/core';
import { AddToCartModule } from '../../../../cms-components/checkout/cart/index';
import { StarRatingModule } from '../../../../common-components/star-rating/star-rating.module';
import { BootstrapModule } from '../../../bootstrap.module';
import { FormComponentsModule } from '../../../ui/components/form-components/form-components.module';
import { MediaModule } from '../../../ui/components/media/media.module';
import { PaginationAndSortingModule } from '../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
import { ProductListComponent } from './container/product-list.component';
import { ProductFacetNavigationComponent } from './product-facet-navigation/product-facet-navigation.component';
import { ProductGridItemComponent } from './product-grid-item/product-grid-item.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductViewComponent } from './product-view/product-view.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSProductListComponent: { selector: 'cx-product-list' },
        SearchResultsListComponent: { selector: 'cx-product-list' },
        ProductRefinementComponent: { selector: 'cx-product-facet-navigation' },
      },
    }),
    RouterModule,
    MediaModule,
    BootstrapModule,
    AddToCartModule,
    FormComponentsModule,
    PaginationAndSortingModule,
    StripHtmlModule,
    UrlTranslationModule,
    I18nModule,
    StarRatingModule,
  ],
  declarations: [
    ProductListComponent,
    ProductFacetNavigationComponent,
    ProductListItemComponent,
    ProductGridItemComponent,
    ProductViewComponent,
  ],
  exports: [
    ProductListComponent,
    ProductListItemComponent,
    ProductGridItemComponent,
  ],
  entryComponents: [ProductListComponent, ProductFacetNavigationComponent],
})
export class ProductListModule {}
