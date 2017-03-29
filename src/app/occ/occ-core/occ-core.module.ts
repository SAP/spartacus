import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccProductService } from './product.service';
import { OccProductSearchService } from './product-search.service';
import { ProductImageConverterService } from './converters/product-image-converter.service';
import { ProductReferenceConverterService } from './converters/product-reference-converter.service';

import { OccCartService } from './cart.service';

import { OccSiteService } from './site.service';
import { OccUserService } from './user.service';

import { ConfigService} from '../config.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        OccUserService,
        OccSiteService,
        OccProductService,
        OccProductSearchService,
        ProductImageConverterService,
        ProductReferenceConverterService,
        OccCartService
    ],

})
export class OccCoreModule {
    static forRoot(config: any): any {
        return {
            ngModule: OccCoreModule,
            providers: [
                {
                    provide: ConfigService,
                    useExisting: config
                }
            ]
        };
    }
}
