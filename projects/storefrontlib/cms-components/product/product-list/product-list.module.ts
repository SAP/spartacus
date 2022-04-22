import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { PageComponentModule } from '../../../cms-structure/page/component/page-component.module';
import { ViewConfig } from '../../../shared/config/view-config';
import {
  AtMessageModule,
  ItemCounterModule,
  ListNavigationModule,
  MediaModule,
  SpinnerModule,
  StarRatingModule,
} from '../../../shared/index';
import { IconModule } from '../../misc/icon/index';
import { defaultViewConfig } from '../config/default-view-config';
import { ProductListComponent } from './container/product-list.component';
import { ProductScrollComponent } from './container/product-scroll/product-scroll.component';
import { ProductGridItemComponent } from './product-grid-item/product-grid-item.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductViewComponent } from './product-view/product-view.component';

@NgModule({
  imports: [
    AtMessageModule,
    CommonModule,
    FeaturesConfigModule,
    I18nModule,
    IconModule,
    InfiniteScrollModule,
    ItemCounterModule,
    ListNavigationModule,
    MediaModule,
    OutletModule,
    PageComponentModule,
    RouterModule,
    SpinnerModule,
    StarRatingModule,
    UrlModule,
  ],
  providers: [
    provideDefaultConfig(<ViewConfig>defaultViewConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CMSProductListComponent: {
          component: ProductListComponent,
          data: {
            composition: {
              inner: ['ProductAddToCartComponent'],
            },
          },
        },
        ProductGridComponent: {
          component: ProductListComponent,
          data: {
            composition: {
              inner: ['ProductAddToCartComponent'],
            },
          },
        },
        SearchResultsListComponent: {
          component: ProductListComponent,
          data: {
            composition: {
              inner: ['ProductAddToCartComponent'],
            },
          },
        },
      },
    }),
  ],
  declarations: [
    ProductListComponent,
    ProductListItemComponent,
    ProductGridItemComponent,
    ProductViewComponent,
    ProductScrollComponent,
  ],
  exports: [
    ProductListComponent,
    ProductListItemComponent,
    ProductGridItemComponent,
    ProductViewComponent,
    ProductScrollComponent,
  ],
})
export class ProductListModule {}
