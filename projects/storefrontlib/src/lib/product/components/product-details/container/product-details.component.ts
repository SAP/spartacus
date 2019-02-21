import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {
  ProductService,
  Product,
  WindowRef,
  RoutingService
} from '@spartacus/core';

import { Observable } from 'rxjs';

import { ProductDetailOutlets } from '../../../product-outlets.model';
import { map, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'cx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  static outlets = ProductDetailOutlets;

  @Output() openReview = new EventEmitter();

  product$: Observable<Product>;

  get outlets() {
    return ProductDetailsComponent.outlets;
  }

  constructor(
    protected productService: ProductService,
    protected winRef: WindowRef,
    protected routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.product$ = this.routingService.getRouterState().pipe(
      map(state => state.state.params['productCode']),
      filter(Boolean),
      switchMap(productCode => this.productService.get(productCode))
    );
  }

  launchReview() {
    this.openReview.emit();
  }
}
