import { Injectable, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductLoaderService } from '../../../data/product-loader.service';

@Injectable()
export abstract class AbstractProductComponent implements OnInit {

    model;

    @Input() productCode: string;

    constructor(
        protected productLoader: ProductLoaderService,
        protected cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        // console.log('ngOnInit AbstractProductComponent');
        if (this.productCode) {
            this.model = this.productLoader.getSubscription(this.productCode);
            this.productLoader.loadProduct(this.productCode);
            this.ready();
        }
    }

    // HOOK: do we need this?
    protected ready() {
        // console.log('ready');
    }
}
