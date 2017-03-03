import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSummaryComponent } from './product-summary/product-summary.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
        FlexLayoutModule
    ],
    declarations: [
        ProductSummaryComponent,
        ProductAttributesComponent,
        ProductDetailsComponent],
    exports: [
        ProductDetailsComponent,
        ProductSummaryComponent,
        ProductAttributesComponent
    ]
})
export class ProductModule { }
