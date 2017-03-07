import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractPage } from '../abstract-page.component';

@Component({
  selector: 'y-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent extends AbstractPage {
    query;

    loadAdditionData(params: Params) {
        if (params['query']) {
            this.query = params['query'];
        }
    }
}
