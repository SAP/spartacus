import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  StripHtmlModule,
  UrlModule,
} from '@spartacus/core';
import { BootstrapModule } from '../../../lib/bootstrap.module';
import {
  FormComponentsModule,
  ListNavigationModule,
  MediaModule,
  StarRatingModule,
} from '../../../shared/index';
import { AddToCartModule } from '../../checkout/index';
import { ProductListComponent } from './container/product-list.component';
import { ProductFacetNavigationComponent } from './product-facet-navigation/product-facet-navigation.component';
import { ProductGridItemComponent } from './product-grid-item/product-grid-item.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { IconModule } from '../../misc/icon/index';

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
    ListNavigationModule,
    StripHtmlModule,
    UrlModule,
    I18nModule,
    StarRatingModule,
    IconModule,
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
