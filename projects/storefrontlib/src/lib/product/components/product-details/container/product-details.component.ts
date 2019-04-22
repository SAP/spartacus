import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UIProduct } from '@spartacus/core';
import { CurrentProductService } from '../../../../ui/pages/product-page/current-product.service';
import { ProductDetailOutlets } from '../../../product-outlets.model';

@Component({
  selector: 'cx-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  static outlets = ProductDetailOutlets;

  product$: Observable<UIProduct>;

  get outlets(): any {
    return ProductDetailsComponent.outlets;
  }

  constructor(protected currentPageService: CurrentProductService) {}

  ngOnInit(): void {
    this.product$ = this.currentPageService.getProduct();
  }
}
