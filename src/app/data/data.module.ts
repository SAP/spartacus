import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenService } from './token.service';

import { ModelService } from './model.service';
import { SiteContextService } from './site-context.service';

import { ProductModelService } from './product-model.service';
import { ProductLoaderService } from './product-loader.service';
import { ProductSearchService } from './product-search.service';

import { CmsService } from './cms.service';

import { CartModelService } from './cart-model.service';
import { CartLoaderService } from './cart-loader.service';

import { UserModelService } from './user-model.service';
import { UserLoaderService } from './user-loader.service';

import { ConfigService} from './config.service';

// import { OccModule } from '../occ/occ.module';


@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        TokenService,

        SiteContextService,
        ModelService,

        CmsService,

        ProductModelService,
        ProductSearchService,
        ProductLoaderService,

        CartModelService,
        CartLoaderService,

        UserModelService,
        UserLoaderService
    ]
})
export class DataModule {
    static forRoot(config: any): any {
        return {
            ngModule: DataModule,
            providers: [
                {
                    provide: ConfigService,
                    useExisting: config
                }
            ]
        };
    }
}
