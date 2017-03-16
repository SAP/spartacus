import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelService } from './model.service';
import { SiteLoaderService } from './site-loader.service';

import { ProductModelService } from './product-model.service';
import { ProductLoaderService } from './product-loader.service';
import { ProductSearchService } from './product-search.service';

import { CmsLoaderService } from './cms-loader.service';
import { CmsModelService } from './cms-model.service';

import { OccCoreModule } from '../occ/occ-core/occ-core.module';
import { OccCmsModule } from '../occ/occ-cms/occ-cms.module';

import { CartModelService } from './cart-model.service';
import { CartLoaderService } from './cart-loader.service';

@NgModule({
    imports: [
        CommonModule,
        OccCoreModule,
        OccCmsModule
    ],
    providers: [
        SiteLoaderService,
        ModelService,

        CmsLoaderService,
        CmsModelService,
        
        ProductModelService,
        ProductSearchService,
        ProductLoaderService,
        
        CartModelService,
        CartLoaderService
    ],
    declarations: []
})
export class DataModule { }
