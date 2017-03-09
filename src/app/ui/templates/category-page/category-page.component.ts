import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractPage } from '../abstract-page.component';

@Component({
    selector: 'y-category-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent extends AbstractPage implements OnInit {
    categoryCode;
    brandCode;
    model;

    dataSubscription;

    ngOnInit() {
        this.cmsModelService.getPageSubscription('CategoryPage').subscribe((pageData) => {
            this.model = pageData;
        });
    }

    loadAdditionData(params: Params) {
        if (params['categoryCode']) {
            this.categoryCode = params['categoryCode'];
        }
        if (params['brandCode']) {
            this.brandCode = params['brandCode'];
        }
    }
}
