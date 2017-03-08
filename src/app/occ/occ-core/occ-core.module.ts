import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccProductService } from './product.service';
import { OccProductSearchService } from './product-search.service';
import { ProductImageConverterService } from './product-image-converter.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        OccProductService,
        OccProductSearchService,
        ProductImageConverterService
    ],
    declarations: []
})
export class OccCoreModule { }
