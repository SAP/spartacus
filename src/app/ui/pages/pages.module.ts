import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../layout/layout.module';

import { HomePageComponent } from './home-page/home-page.component';
import { CardPageComponent } from './card-page/card-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';

import { ProductListPageComponent } from './product-list-page/product-list-page.component';
import { PageNotFoundComponent } from './404/404.component';
import { CartPageComponent } from './cart-page/cart-page.component';

@NgModule({
  imports: [CommonModule, LayoutModule],
  declarations: [
    HomePageComponent,
    CardPageComponent,
    CategoryPageComponent,
    ProductDetailPageComponent,
    ProductListPageComponent,
    PageNotFoundComponent,
    CartPageComponent
  ],
  exports: [
    HomePageComponent,
    CardPageComponent,
    CategoryPageComponent,
    ProductDetailPageComponent,
    ProductListPageComponent,
    PageNotFoundComponent,
    CartPageComponent
  ]
})
export class PagesModule {}
