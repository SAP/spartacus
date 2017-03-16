import { Injectable, ChangeDetectorRef } from '@angular/core';
import { ConfigService } from '../cms/config.service';

import { CartLoaderService } from '../data/cart-loader.service';
import { AbstractComponent } from '../cms/abstract-component';

@Injectable()
export class AbstractCartComponent extends AbstractComponent {

    constructor(
        protected cd: ChangeDetectorRef,
        protected configService: ConfigService,
        protected cartLoader: CartLoaderService
    ) {
        super(cd, configService);
    }

}
