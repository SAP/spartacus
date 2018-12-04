import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SearchConfig } from '@spartacus/core';
import { ProductSearchService } from '@spartacus/core';

@Component({
  selector: 'cx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnChanges, OnInit {
  @Input()
  gridMode: String;
  @Input()
  query;
  @Input()
  categoryCode;
  @Input()
  brandCode;
  @Input()
  itemPerPage: number;

  grid: any;
  model$: Observable<any>;
  searchConfig: SearchConfig = {};
  categoryTitle: string;

  constructor(
    protected productSearchService: ProductSearchService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnChanges() {
    const { queryParams } = this.activatedRoute.snapshot;
    const options = this.createOptionsByUrlParams();
    if (this.categoryCode && this.categoryCode !== queryParams.categoryCode) {
      this.query = ':relevance:category:' + this.categoryCode;
    }
    if (this.brandCode && this.brandCode !== queryParams.brandCode) {
      this.query = ':relevance:brand:' + this.brandCode;
    }
    if (!this.query && queryParams.query) {
      this.query = queryParams.query;
    }
    if (this.query) {
      this.search(this.query, options);
    }
  }

  createOptionsByUrlParams(): SearchConfig {
    const { queryParams } = this.activatedRoute.snapshot;
    const newConfig = {
      ...queryParams
    };
    delete newConfig.query;
    const options = {
      ...this.searchConfig,
      ...newConfig,
      pageSize: this.itemPerPage || 10
    };
    if (this.categoryCode) {
      options.categoryCode = this.categoryCode;
    }
    if (this.brandCode) {
      options.brandCode = this.brandCode;
    }
    return options;
  }

  ngOnInit() {
    this.grid = {
      mode: this.gridMode
    };

    this.model$ = this.productSearchService.searchResults$.pipe(
      tap(searchResult => {
        if (searchResult.breadcrumbs && searchResult.breadcrumbs.length > 0) {
          this.categoryTitle = searchResult.breadcrumbs[0].facetValueName;
        } else if (!this.query.includes(':relevance:')) {
          this.categoryTitle = this.query;
        }
        if (this.categoryTitle) {
          this.categoryTitle =
            searchResult.pagination.totalResults +
            ' results for ' +
            this.categoryTitle;
        }
      })
    );
  }

  onFilter(query: string) {
    this.query = query;
    this.search(query);
  }

  viewPage(pageNumber: number) {
    this.search(this.query, { currentPage: pageNumber });
  }

  sortList(sortCode: string) {
    this.search(this.query, { sortCode: sortCode });
  }

  protected search(query: string, options?: SearchConfig) {
    if (options) {
      // Overide default options
      this.searchConfig = {
        ...this.searchConfig,
        ...options
      };
    }
    this.productSearchService.search(query, this.searchConfig);
  }
}
