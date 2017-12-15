import { Injectable, ChangeDetectorRef } from '@angular/core';
import { AbstractCmsComponent } from './abstract-cms-component';

import { CmsService } from '../data/cms.service';
import { ProductLoaderService } from '../data/product-loader.service';
import { ProductSearchService } from '../data/product-search.service';

import { Router } from '@angular/router';

@Injectable()
export abstract class AbstractProductComponent extends AbstractCmsComponent {

    constructor(
        protected cmsService: CmsService,
        protected cd: ChangeDetectorRef,
        protected router: Router,
        protected productLoader: ProductLoaderService,
        protected productSearch: ProductSearchService
    ) {
        super(cd, cmsService);
    }

}
