import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductLoaderService } from './product-loader.service';

import { CmsLoaderService } from './cms-loader.service';
import { CmsModelService } from './cms-model.service';

import { OccCoreModule } from '../occ/occ-core/occ-core.module';
import { OccCmsModule } from '../occ/occ-cms/occ-cms.module';


@NgModule({
    imports: [
        CommonModule,
        OccCoreModule,
        OccCmsModule
    ],
    providers: [
        CmsLoaderService,
        CmsModelService,
        ProductLoaderService
    ],
    declarations: []
})
export class DataModule { }
