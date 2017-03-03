import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccProductService } from './product.service';
import { OccProductSearchService } from './product-search.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        OccProductService,
        OccProductSearchService
    ],
    declarations: []
})
export class OccCoreModule { }
