import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { ProductLoaderService } from '../../../data/product-loader.service';

@Component({
    selector: 'y-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {

    model;
    
    @ViewChild('sidenav') sidenav: MdSidenav;

    @Input() useGrid;
    @Input() query;
    @Input() categoryCode;
    @Input() brandCode;

    constructor(
        protected productLoader: ProductLoaderService
    ) {}

    ngOnInit() {
    }

    ngOnChanges() {
        
        if (this.categoryCode) {
            this.query = ':relevance:category:' + this.categoryCode;
            // this.productLoader.categorySearch(this.categoryCode, this.brandCode).subscribe((result) => {
            //     // console.log(result);
            //     this.model = result;
            // });
        }
        // console.log(this.query);
        if (this.query) {
            // console.log(this.query);
            this.productLoader.searchProducts(this.query).subscribe((result) => {
                // console.log(result);
                this.model = result;
            });
        }

        // this.cd.markForCheck();
    }

    toggleSidenav() {
        this.sidenav.toggle();
    }
    
    onFilter(query: string) {
        this.productLoader.query(query).subscribe((result) => {
            console.log(result);
            this.model = result;
        });
    }
}
