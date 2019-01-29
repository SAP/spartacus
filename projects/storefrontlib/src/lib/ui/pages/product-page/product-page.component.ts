import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-product-page',
  templateUrl: './product-page.component.html'
})
export class ProductPageComponent implements OnInit {
  productCode: Observable<string>;

  constructor(private routingService: RoutingService) {}

  ngOnInit() {
    this.productCode = this.routingService
      .getRouterState()
      .pipe(map(state => state.state.params['productCode']));
  }
}
