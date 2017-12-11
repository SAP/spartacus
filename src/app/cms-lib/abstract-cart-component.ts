import { Injectable, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CartLoaderService } from '../data/cart-loader.service';
import { CartModelService } from '../data/cart-model.service';
import { AbstractCmsComponent } from './abstract-cms-component';
import { CmsService } from '../data/cms.service';

@Injectable()
export abstract class AbstractCartComponent extends AbstractCmsComponent {

    constructor(
        protected cd: ChangeDetectorRef,
        protected cmsService: CmsService,
        protected cartLoader: CartLoaderService,
        protected cartModel: CartModelService,
        protected dialog: MatDialog
    ) {
        super(cd, cmsService);
    }

}
