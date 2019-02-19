import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  OnInit
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
export class ProductDetailsComponent implements OnChanges, OnInit {
  static outlets = ProductDetailOutlets;

  @Input()
  productCode: string;

  product$: Observable<Product>;

  get outlets() {
    return ProductDetailsComponent.outlets;
  }

  @ViewChild('descriptionHeader')
  set initial(ref: ElementRef) {
    if (ref) {
      ref.nativeElement.click();
    }
  }

  @ViewChild('reviewHeader') reviewHeader: ElementRef;

  constructor(
    protected productService: ProductService,
    protected winRef: WindowRef,
    protected routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.routingService
      .getRouterState()
      .pipe(map(state => state.state.params['productCode']))
      .subscribe(productCode => (this.productCode = productCode));
  }

  ngOnChanges(): void {
    this.product$ = this.productService.get(this.productCode);
  }

  openReview() {
    if (this.reviewHeader.nativeElement) {
      this.reviewHeader.nativeElement.click();
    }
  }
}
