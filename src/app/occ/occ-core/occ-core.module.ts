import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSearchService } from './product-search.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ProductSearchService
    ],
    declarations: []
})
export class OccCoreModule { }
