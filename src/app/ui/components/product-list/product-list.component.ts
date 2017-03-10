import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ProductSearchService } from '../../../data/product-search.service';
import { ProductLoaderService } from '../../../data/product-loader.service';

@Component({
    selector: 'y-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnChanges, OnInit {

    model;

    @ViewChild('sidenav') sidenav: MdSidenav;

    grid: any;

    @Input() gridMode: String;
    @Input() query;
    @Input() categoryCode;
    @Input() brandCode;

    subject;
    config;

    isFacetPanelOpen = false;
    
    constructor(
        protected productLoader: ProductLoaderService,
        protected searchService: ProductSearchService
    ) {
        this.config = this.searchService.createConfig();
        this.subject = new BehaviorSubject<any>({});
        this.subject.subscribe((result) => {
            this.model = result;
        });
    }

    ngOnInit() {
        this.grid = {
            mode: this.gridMode
        };
    }

    ngOnChanges() {
        
        if (this.categoryCode) {
            this.query = ':relevance:category:' + this.categoryCode;
        }
        if (this.brandCode) {
            this.query = ':relevance:brand:' + this.brandCode;
        }
        
        if (this.query) {
            this.search(this.query);
        }

        // this.cd.markForCheck();
    }

    toggleSidenav() {
        this.sidenav.toggle();
    }
    
    onFilter(query: string) {
        this.search(query);
        // this.productLoader.query(query).subscribe((result) => {
        //     console.log(result);
        //     this.model = result;
        // });
    }

    protected search(query) {
        this.searchService.searchProducts(query, this.config, this.subject);
    }
}
