import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractPage } from '../abstract-page.component';

@Component({
    selector: 'y-category-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent extends AbstractPage {
    categoryCode;

    loadAdditionData(params: Params) {
        if (params['categoryCode']) {
            this.categoryCode = params['categoryCode'];
        }
    }
}
