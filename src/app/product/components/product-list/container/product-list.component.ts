import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromProductStore from '../../../store';
import { SearchConfig } from '../../../search-config';

@Component({
  selector: 'y-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnChanges, OnInit {
  model$;

  @ViewChild('sidenav') sidenav: MatSidenav;

  grid: any;

  @Input() gridMode: String;
  @Input() query;
  @Input() categoryCode;
  @Input() brandCode;

  subject;
  config;

  isFacetPanelOpen = false;

  constructor(protected store: Store<fromProductStore.ProductsState>) {}

  ngOnInit() {
    this.grid = {
      mode: this.gridMode
    };

    this.model$ = this.store.select(fromProductStore.getSearchResults);
  }

  ngOnChanges() {
    if (this.categoryCode) {
      this.query = ':relevance:category:' + this.categoryCode;
    }
    if (this.brandCode) {
      this.query = ':relevance:brand:' + this.brandCode;
    }

    if (this.query) {
      this.search(this.query);
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  onFilter(query: string) {
    this.search(query);
  }

  protected search(query) {
    this.store.dispatch(
      new fromProductStore.SearchProducts({
        queryText: query,
        searchConfig: new SearchConfig(10)
      })
    );
  }
}
