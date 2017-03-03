import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractPage } from '../abstract-page.component';

@Component({
    selector: 'y-product-detail-page',
    templateUrl: './product-detail-page.component.html',
    styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent extends AbstractPage {
    productCode;

    loadAdditionData(params: Params) {
        if (params['productCode']) {
            this.productCode = params['productCode'];
            // TODO: init component
        }
    }
}
