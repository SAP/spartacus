import { Injectable, ChangeDetectorRef } from '@angular/core';
import { AbstractCmsComponent } from './abstract-cms-component';

import { CmsModelService } from '../data/cms-model.service';
import { ConfigService } from '../cms/config.service';
import { ProductLoaderService } from '../data/product-loader.service';
import { ProductSearchService } from '../data/product-search.service';

import { Router } from '@angular/router';

@Injectable()
export abstract class AbstractProductComponent extends AbstractCmsComponent {

    constructor(
        protected configService: ConfigService,
        protected cmsModelService: CmsModelService,
        protected cd: ChangeDetectorRef,
        protected router: Router,
        protected productLoader: ProductLoaderService,
        protected productSearch: ProductSearchService
    ) {
        super(cd, configService, cmsModelService);
    }

}
