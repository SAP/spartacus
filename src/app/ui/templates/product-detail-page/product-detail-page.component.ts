import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractPage } from '../abstract-page.component';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CmsService } from '../../../data/cms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'y-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent extends AbstractPage implements OnInit {
  productCode;

  constructor(
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected cmsService: CmsService
  ) {
    super(router, activeRoute, cmsService);
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => (this.productCode = params['productCode'])
    );
  }

  //   loadAdditionData(params: Params) {
  //     if (params['productCode']) {
  //       this.productCode = params['productCode'];
  //       // TODO: init component
  //     }
  //   }
}
