import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromRouting from '../../../routing/store';

@Component({
  selector: 'y-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  productCode;
  subscription: Subscription;

  constructor(private store: Store<fromRouting.State>) {}

  ngOnInit() {
    this.subscription = this.store
      .pipe(select(fromRouting.getRouterState))
      .subscribe(
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
