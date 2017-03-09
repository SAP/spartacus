import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductLoaderService } from './product-loader.service';
import { ProductSearchService } from './product-search.service';

import { CmsLoaderService } from './cms-loader.service';
import { CmsModelService } from './cms-model.service';

import { OccCoreModule } from '../occ/occ-core/occ-core.module';
import { OccCmsModule } from '../occ/occ-cms/occ-cms.module';

import { ProductModelService } from './product-model.service';

@NgModule({
    imports: [
        CommonModule,
        OccCoreModule,
        OccCmsModule
    ],
    providers: [
        CmsLoaderService,
        CmsModelService,
        
        ProductModelService,
        ProductSearchService,
        ProductLoaderService
    ],
    declarations: []
})
export class DataModule { }
