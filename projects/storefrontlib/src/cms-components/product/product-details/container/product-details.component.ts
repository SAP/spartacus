import { Component, OnInit } from '@angular/core';
import { Product } from '@spartacus/core';
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

  get outlets(): any {
    return ProductDetailsComponent.outlets;
  }

  constructor(protected currentPageService: CurrentProductService) {}

  ngOnInit(): void {
    this.product$ = this.currentPageService.getProduct();
  }
}
