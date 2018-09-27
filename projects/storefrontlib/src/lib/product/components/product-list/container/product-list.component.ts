import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';
import { SearchConfig } from '../../../search-config';
import { ProductSearchService } from '../../../services/product-search.service';

@Component({
  selector: 'y-product-list',
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
  searchConfig: SearchConfig = new SearchConfig();

  constructor(protected productSearchService: ProductSearchService) {}

  ngOnChanges() {
    this.searchConfig = {
      ...this.searchConfig,
      pageSize: this.itemPerPage || 10
    };

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

    this.model$ = this.productSearchService.searchResults$;
  }

  onFilter(query: string) {
    this.query = query;
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
      this.searchConfig = {
        ...this.searchConfig,
        ...options
      };
    }
    this.productSearchService.search(query, this.searchConfig);
  }
}
