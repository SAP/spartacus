import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import {
  ProductService,
  Product,
  WindowRef,
  RoutingService
} from '@spartacus/core';

import { Observable } from 'rxjs';

import { ProductDetailOutlets } from '../../../product-outlets.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  static outlets = ProductDetailOutlets;

  productCode: string;

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
    this.routingService
      .getRouterState()
      .pipe(map(state => state.state.params['productCode']))
      .subscribe(productCode => {
        this.productCode = productCode;
        this.product$ = this.productService.get(this.productCode);
      });
  }

  launchReview() {
    this.openReview.emit();
  }
}
