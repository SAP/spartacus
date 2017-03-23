import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenService } from './token.service';

import { ModelService } from './model.service';
import { SiteLoaderService } from './site-loader.service';

import { ProductModelService } from './product-model.service';
import { ProductLoaderService } from './product-loader.service';
import { ProductSearchService } from './product-search.service';

import { CmsLoaderService } from './cms-loader.service';
import { CmsModelService } from './cms-model.service';

import { CartModelService } from './cart-model.service';
import { CartLoaderService } from './cart-loader.service';

import { UserModelService } from './user-model.service';
import { UserLoaderService } from './user-loader.service';

// import { OccModule } from '../occ/occ.module';


@NgModule({
    imports: [
        CommonModule
        // OccModule
    ],
    providers: [
        TokenService,
        
        SiteLoaderService,
        ModelService,

        CmsLoaderService,
        CmsModelService,

        ProductModelService,
        ProductSearchService,
        ProductLoaderService,

        CartModelService,
        CartLoaderService,

        UserModelService,
        UserLoaderService
    ]
})
export class DataModule { }
