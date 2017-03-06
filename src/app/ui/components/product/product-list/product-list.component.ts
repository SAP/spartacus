import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ProductLoaderService } from '../../../../data/product-loader.service';

@Component({
    selector: 'y-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {

    model;

    @Input() categoryCode;
    @Input() brandCode;

    constructor(
        protected productLoader: ProductLoaderService
    ) {}

    ngOnInit() {
    }

    ngOnChanges() {
        this.productLoader.categorySearch(this.categoryCode, this.brandCode).subscribe((products) => {
            this.model = products;
            // this.cd.markForCheck();
        });
    }

}
