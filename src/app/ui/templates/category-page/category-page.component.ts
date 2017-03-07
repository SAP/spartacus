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
    model;

    dataSubscription;

    ngOnInit() {
        this.cmsModelService.getSubscription('CategoryPage').subscribe((pageData) => {
            this.model = pageData;
        });
    }

    loadAdditionData(params: Params) {
        console.log(params);
        if (params['categoryCode']) {
            this.categoryCode = params['categoryCode'];
            
        }
    }
}
