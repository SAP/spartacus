import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './container/product-list.component';
import { ProductFacetNavigationComponent } from './product-facet-navigation/product-facet-navigation.component';

import { AddToCartModule } from '../../../cart/components/add-to-cart/add-to-cart.module';

import { MediaModule } from '../../../ui/components/media/media.module';
import { ProductPagingComponent } from './product-paging/product-paging.component';
import { ProductSortingComponent } from './product-sorting/product-sorting.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductGridItemComponent } from './product-grid-item/product-grid-item.component';
import {
  NgbCollapseModule,
  NgbModalModule,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductViewComponent } from './product-view/product-view.component';
import { FormComponentsModule } from '../../../ui/components/form-components/form-components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    NgbPaginationModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbCollapseModule,
    NgbModalModule,
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
