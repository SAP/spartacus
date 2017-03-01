import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsLoaderService } from './cms-loader.service';
import { CmsModelService } from './cms-model.service';
import { OccCmsModule } from '../occ/occ-cms/occ-cms.module';
import { CmsCacheService } from './cms-cache.service';


@NgModule({
    imports: [
        CommonModule,
        OccCmsModule
    ],
    providers: [
        CmsLoaderService,
        CmsCacheService,
        CmsModelService
    ],
    declarations: []
})
export class DataModule { }
