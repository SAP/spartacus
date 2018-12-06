import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs';
import { RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  productCode: string;
  subscription: Subscription;

  constructor(private routingService: RoutingService) {}

  ngOnInit() {
    this.subscription = this.routingService.routerState$.subscribe(
      routerState =>
        (this.productCode = routerState.state.params['productCode'])
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
