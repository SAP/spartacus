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
        if (this.productCode) {
            this.productLoader.loadProduct(this.productCode);
            this.productLoader.getSubscription(this.productCode).subscribe((data) => {
                this.model = data;
                this.ready();
            });
        }
    }

    // HOOK
    protected ready() {}
    
}
