import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutingService } from '@spartacus/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-product-page',
  templateUrl: './product-page.component.html'
})
export class ProductPageComponent implements OnInit {
  productCode$: Observable<string>;

  constructor(private routingService: RoutingService) {}

  ngOnInit() {
    this.productCode$ = this.routingService
      .getRouterState()
      .pipe(map(routerState => routerState.state.params['productCode']));
  }
}
