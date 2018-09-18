import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { BootstrapModule } from '../../../bootstrap.module';
import { ProductListComponent } from './container/product-list.component';
import { ProductFacetNavigationComponent } from './product-facet-navigation/product-facet-navigation.component';
import { ProductPagingComponent } from './product-paging/product-paging.component';
import { ProductSortingComponent } from './product-sorting/product-sorting.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductGridItemComponent } from './product-grid-item/product-grid-item.component';
import { ProductViewComponent } from './product-view/product-view.component';

import { AddToCartModule } from '../../../cart/components/add-to-cart/add-to-cart.module';

import { MediaModule } from '../../../ui/components/media/media.module';
import { FormComponentsModule } from '../../../ui/components/form-components/form-components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    BootstrapModule,
    NgSelectModule,
    AddToCartModule,
    FormComponentsModule,
    FormsModule
  ],
  declarations: [
    ProductListComponent,
    ProductFacetNavigationComponent,
    ProductPagingComponent,
    ProductSortingComponent,
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
