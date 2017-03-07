import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductSummaryComponent } from './product-summary/product-summary.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductImagesComponent } from './product-images/product-images.component';


import { MediaModule } from '../media/media.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MediaModule,
        MaterialModule.forRoot(),
        FlexLayoutModule
    ],
    declarations: [
        ProductSummaryComponent,
        ProductAttributesComponent,
        ProductDetailsComponent,
        ProductImagesComponent
    ],
    exports: [
        ProductDetailsComponent,
        ProductSummaryComponent,
        ProductAttributesComponent,
        ProductImagesComponent
    ]
})
export class ProductModule { }
