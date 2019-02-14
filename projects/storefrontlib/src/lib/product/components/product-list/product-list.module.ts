import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UrlTranslationModule, StripHtmlModule } from '@spartacus/core';

import { BootstrapModule } from '../../../bootstrap.module';
import { AddToCartModule } from '../../../cart/add-to-cart/add-to-cart.module';
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
    RouterModule,
    MediaModule,
    BootstrapModule,
    AddToCartModule,
    FormComponentsModule,
    PaginationAndSortingModule,
    StripHtmlModule,
    UrlTranslationModule
  ],
  declarations: [
    ProductListComponent,
    ProductFacetNavigationComponent,
    ProductListItemComponent,
    ProductGridItemComponent,
    ProductViewComponent
  ],
  exports: [
    ProductListComponent,
    ProductListItemComponent,
    ProductGridItemComponent
  ]
})
export class ProductListModule {}
