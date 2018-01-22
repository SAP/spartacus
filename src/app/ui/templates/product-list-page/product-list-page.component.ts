import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRouting from '../../../routing/store';

@Component({
  selector: 'y-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit {
  query: string;

  constructor(private store: Store<fromRouting.State>) {}

  ngOnInit() {
    this.store
      .select(fromRouting.getRouterState)
      .subscribe(
        routerState => (this.query = routerState.state.params['query'])
      );
  }
}
