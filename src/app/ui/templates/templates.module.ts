import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../layout/layout.module';


import { HomePageComponent } from './home-page/home-page.component';
import { CardPageComponent } from './card-page/card-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';

import { ProductModule } from '../components/product/product.module';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        ProductModule
    ],
    declarations: [
        HomePageComponent,
        CardPageComponent,
        CategoryPageComponent,
        ProductDetailPageComponent,
        ProductListPageComponent
    ],
    exports: [
        HomePageComponent
    ]
})
export class TemplatesModule { }
