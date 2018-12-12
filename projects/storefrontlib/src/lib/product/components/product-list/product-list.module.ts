import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BootstrapModule } from '../../../bootstrap.module';
import { ProductListComponent } from './container/product-list.component';
import { ProductFacetNavigationComponent } from './product-facet-navigation/product-facet-navigation.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductGridItemComponent } from './product-grid-item/product-grid-item.component';
import { ProductViewComponent } from './product-view/product-view.component';

import { AddToCartModule } from '../../../cart/components/add-to-cart/add-to-cart.module';

import { MediaModule } from '../../../ui/components/media/media.module';
import { FormComponentsModule } from '../../../ui/components/form-components/form-components.module';
import { PaginationAndSortingModule } from '../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
import { UrlTranslationModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    BootstrapModule,
    AddToCartModule,
    FormComponentsModule,
    PaginationAndSortingModule,
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
