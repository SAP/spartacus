import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromProductStore from '../../../store';
import { filter } from 'rxjs/operators';
import { SearchConfig } from '../../../search-config';
import { Observable } from 'rxjs';

@Component({
  selector: 'y-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnChanges, OnInit {
  @Input() gridMode: String;
  @Input() query;
  @Input() categoryCode;
  @Input() brandCode;
  @Input() itemPerPage: number;

  grid: any;
  model$: Observable<any>;
  searchConfig: SearchConfig = new SearchConfig();

  constructor(protected store: Store<fromProductStore.ProductsState>) {}

  ngOnChanges() {
    if (!this.itemPerPage) {
      // Page List default page size
      this.searchConfig = { ...this.searchConfig, ...{ pageSize: 10 } };
    } else {
      this.searchConfig = {
        // Page list input page size
        ...this.searchConfig,
        ...{ pageSize: this.itemPerPage }
      };
    }

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

  ngOnInit() {
    this.grid = {
      mode: this.gridMode
    };

    this.model$ = this.store
      .select(fromProductStore.getSearchResults)
      .pipe(filter(results => Object.keys(results).length > 0));
  }

  onFilter(query: string) {
    this.search(query);
  }

  viewPage(pageNumber: number) {
    const options = new SearchConfig();
    options.currentPage = pageNumber;
    this.search(this.query, options);
  }

  sortList(sortCode: string) {
    const options = new SearchConfig();
    options.sortCode = sortCode;
    this.search(this.query, options);
  }

  protected search(query: string, options?: SearchConfig) {
    if (options) {
      // Overide default options
      this.searchConfig = { ...this.searchConfig, ...options };
    }
    this.store.dispatch(
      new fromProductStore.SearchProducts({
        queryText: query,
        searchConfig: this.searchConfig
      })
    );
  }
}
