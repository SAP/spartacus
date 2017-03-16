import { Injectable, ChangeDetectorRef } from '@angular/core';
import { ConfigService } from '../cms/config.service';
import { MdDialog } from '@angular/material';
import { CartLoaderService } from '../data/cart-loader.service';
import { CartModelService } from '../data/cart-model.service';
import { AbstractCmsComponent } from '../cms/abstract-cms-component';
import { CmsModelService } from '../data/cms-model.service';

@Injectable()
export abstract class AbstractCartComponent extends AbstractCmsComponent {

    constructor(
        protected cd: ChangeDetectorRef,
        protected configService: ConfigService,
        protected cmsModelService: CmsModelService,
        protected cartLoader: CartLoaderService,
        protected cartModel: CartModelService,
        protected dialog: MdDialog
    ) {
        super(cd, configService, cmsModelService);
    }

}
