import { Component, OnInit } from '@angular/core';
import { CmsService, Page, Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';
import { ProductDetailOutlets } from '../../product-outlets.model';

@Component({
  selector: 'cx-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  static outlets = ProductDetailOutlets;

  product$: Observable<Product>;
  page$: Observable<Page>;

  get outlets(): any {
    return ProductDetailsComponent.outlets;
  }

  constructor(
    protected currentPageService: CurrentProductService,
    private cmsService: CmsService
  ) {}

  ngOnInit(): void {
    this.product$ = this.currentPageService.getProduct();

    this.page$ = this.cmsService.getCurrentPage();
  }
}
