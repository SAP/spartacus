import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccProductService } from './product.service';
import { OccProductSearchService } from './product-search.service';
import { ProductImageConverterService } from './converters/product-image-converter.service';
import { ProductReferenceConverterService } from './converters/product-reference-converter.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        OccProductService,
        OccProductSearchService,
        ProductImageConverterService,
        ProductReferenceConverterService
    ],
    declarations: []
})
export class OccCoreModule { }
