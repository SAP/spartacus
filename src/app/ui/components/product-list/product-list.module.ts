import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProductListComponent } from './product-list.component';
import { ProductFacetNavigationComponent } from './product-facet-navigation/product-facet-navigation.component';

import { AddToCartModule } from '../../../cart/components/add-to-cart/add-to-cart.module';

import { MediaModule } from '../media/media.module';
import { ProductPagingComponent } from './product-paging/product-paging.component';
import { ProductSortingComponent } from './product-sorting/product-sorting.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductGridItemComponent } from './product-grid-item/product-grid-item.component';
import { ProductLineItemComponent } from './product-line-item/product-line-item.component';

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
