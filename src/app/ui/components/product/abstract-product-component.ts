import { Injectable, Input, OnInit } from '@angular/core';
import { ProductLoaderService } from '../../../data/product-loader.service';

@Injectable()
export abstract class AbstractProductComponent implements OnInit {

    model;

    @Input() productCode: string;

    constructor(
        protected productLoader: ProductLoaderService
    ) {}

    ngOnInit() {
        if (this.productCode) {
            this.model = this.productLoader.getSubscription(this.productCode);
            this.productLoader.loadProduct(this.productCode);
        }
    }
}
