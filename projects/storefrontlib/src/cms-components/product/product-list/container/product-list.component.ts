import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  ProductSearchPage,
  ProductSearchService,
  SearchConfig,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { PageLayoutService } from '../../../../cms-structure/page/index';
import { ViewModes } from '../product-view/product-view.component';

@Component({
  selector: 'cx-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  query: string;
  categoryCode: string;
  brandCode: string;
  itemPerPage: number;

  model$: Observable<ProductSearchPage>;
  searchConfig: SearchConfig = {};
  categoryTitle: string;
  options: SearchConfig;
  updateParams$: Observable<Params>;
  gridMode$ = new BehaviorSubject<ViewModes>(ViewModes.Grid);

  constructor(
    protected productSearchService: ProductSearchService,
    private activatedRoute: ActivatedRoute,
    private pageLayoutService: PageLayoutService
  ) {}

  update(): void {
    const { queryParams } = this.activatedRoute.snapshot;
    this.options = this.createOptionsByUrlParams();

    if (this.categoryCode && this.categoryCode !== queryParams.categoryCode) {
      this.query = ':relevance:category:' + this.categoryCode;
    }
    if (this.brandCode && this.brandCode !== queryParams.brandCode) {
      this.query = ':relevance:brand:' + this.brandCode;
    }
    if (!this.query && queryParams.query) {
      this.query = queryParams.query;
    }
    this.search(this.query, this.options);
  }

  createOptionsByUrlParams(): SearchConfig {
    const { queryParams } = this.activatedRoute.snapshot;
    const newConfig = {
      ...queryParams,
    };
    delete newConfig.query;
    const options = {
      ...this.searchConfig,
      ...newConfig,
      pageSize: this.itemPerPage || 10,
    };
    if (this.categoryCode) {
      options.categoryCode = this.categoryCode;
    }
    if (this.brandCode) {
      options.brandCode = this.brandCode;
    }

    return options;
  }

  ngOnInit(): void {
    this.updateParams$ = this.activatedRoute.params.pipe(
      tap(params => {
        this.categoryCode = params.categoryCode;
        this.brandCode = params.brandCode;
        this.query = params.query;
        this.update();
      })
    );

    this.pageLayoutService.templateName$.pipe(take(1)).subscribe(template => {
      this.gridMode$.next(
        template === 'ProductGridPageTemplate' ? ViewModes.Grid : ViewModes.List
      );
    });

    // clean previous search result
    this.productSearchService.clearResults();

    this.model$ = this.productSearchService.getResults().pipe(
      tap(searchResult => {
        if (Object.keys(searchResult).length === 0) {
          this.search(this.query, this.options);
        } else {
          this.getCategoryTitle(searchResult);
        }
      }),
      filter(searchResult => Object.keys(searchResult).length > 0)
    );
  }

  protected getCategoryTitle(data: ProductSearchPage): string {
    if (data.breadcrumbs && data.breadcrumbs.length > 0) {
      this.categoryTitle = data.breadcrumbs[0].facetValueName;
    } else if (!this.query.includes(':relevance:')) {
      this.categoryTitle = this.query;
    }
    if (this.categoryTitle) {
      this.categoryTitle =
        data.pagination.totalResults + ' results for ' + this.categoryTitle;
    }

    return this.categoryTitle;
  }

  viewPage(pageNumber: number): void {
    const { queryParams } = this.activatedRoute.snapshot;
    this.search(queryParams.query, { currentPage: pageNumber });
  }

  sortList(sortCode: string): void {
    this.search(this.query, { sortCode: sortCode });
  }

  setGridMode(mode: ViewModes): void {
    this.gridMode$.next(mode);
  }

  protected search(query: string, options?: SearchConfig): void {
    if (this.query) {
      if (options) {
        // Overide default options
        this.searchConfig = {
          ...this.searchConfig,
          ...options,
        };
      }

      this.productSearchService.search(query, this.searchConfig);
    }
  }
}
