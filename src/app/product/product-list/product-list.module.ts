import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProductListComponent } from './container/product-list.component';
import { ProductFacetNavigationComponent } from './components/product-facet-navigation/product-facet-navigation.component';

import { AddToCartModule } from '../../cms-lib/add-to-cart/add-to-cart.module';

import { MediaModule } from '../../ui/components/media/media.module';
import { ProductPagingComponent } from './components/product-paging/product-paging.component';
import { ProductSortingComponent } from './components/product-sorting/product-sorting.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { ProductGridItemComponent } from './components/product-grid-item/product-grid-item.component';
import { ProductLineItemComponent } from './components/product-line-item/product-line-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    MaterialModule,
    FlexLayoutModule,
    AddToCartModule
  ],
  declarations: [
    ProductListComponent,
    ProductFacetNavigationComponent,
    ProductPagingComponent,
    ProductSortingComponent,
    ProductListItemComponent,
    ProductGridItemComponent,
    ProductLineItemComponent
  ],
  exports: [
    ProductListComponent,
    ProductListItemComponent,
    ProductGridItemComponent
  ]
})
export class ProductListModule {}
