import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store } from '@ngrx/store';

import * as fromRouting from '../../../routing/store';

@Component({
  selector: 'y-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  productCode;

  constructor(private store: Store<fromRouting.State>) {}

  ngOnInit() {
    this.store
      .select(fromRouting.getRouterState)
      .subscribe(
        routerState =>
          (this.productCode = routerState.state.params['productCode'])
      );
  }
}
