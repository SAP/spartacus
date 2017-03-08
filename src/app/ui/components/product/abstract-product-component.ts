import { Injectable, Input, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ProductLoaderService } from '../../../data/product-loader.service';

@Injectable()
export abstract class AbstractProductComponent implements OnInit, OnChanges {

    model;

    @Input() productCode: string;

    constructor(
        protected productLoader: ProductLoaderService,
        protected cd: ChangeDetectorRef
    ) {}

    ngOnChanges() {
        if (this.productCode) {
            this.productLoader.loadProduct(this.productCode);
            this.productLoader.getSubscription(this.productCode).subscribe((data) => {
                this.model = data;
                // this.cd.markForCheck();
                this.ready();
            });
        }
    }
    ngOnInit() {
    }

    // HOOK
    protected ready() {
    }
    
}
