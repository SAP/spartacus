import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractPage } from '../abstract-page.component';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

@Component({
  selector: 'y-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {
  productCode;

  constructor(protected activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.params.forEach((params: Params) => {
      if (params['productCode']) {
        this.productCode = params['productCode'];
      }
    });
  }
}
