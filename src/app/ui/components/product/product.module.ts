import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSummaryComponent } from './product-summary/product-summary.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
        FlexLayoutModule
    ],
    declarations: [ProductSummaryComponent, ProductAttributesComponent],
    exports: [ProductSummaryComponent, ProductAttributesComponent]
})
export class ProductModule { }
