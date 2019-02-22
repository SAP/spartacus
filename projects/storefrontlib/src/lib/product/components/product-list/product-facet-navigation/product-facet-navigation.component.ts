import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CmsComponentData } from 'projects/storefrontlib/src/lib/cms';
import {
  CmsProductFacetNavigationComponent,
  ProductSearchService,
  ProductSearchPage
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  styleUrls: ['./product-facet-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFacetNavigationComponent implements OnInit {
  @Input()
  activeFacetValueCode;
  // searchResult$: Observable<;
  minPerFacet = 6;

  @Output()
  filter: EventEmitter<any> = new EventEmitter<any>();

  data$: Observable<any>;
  searchResult$: Observable<ProductSearchPage>;

  showAllPerFacetMap: Map<string, boolean>;
  queryCodec: HttpUrlEncodingCodec;
  private collapsedFacets = new Set<string>();

  // get visibleFacets() {
  //   if (!this.searchResult.facets) {
  //     return [];
  //   }
  //   return this.searchResult.facets.filter(facet => facet.visible);
  // }

  constructor(
    public component: CmsComponentData<CmsProductFacetNavigationComponent>,
    private modalService: NgbModal,
    protected productSearchService: ProductSearchService
  ) {
    this.showAllPerFacetMap = new Map<string, boolean>();
    this.queryCodec = new HttpUrlEncodingCodec();
  }

  ngOnInit() {
    this.searchResult$ = this.productSearchService.getSearchResults();
    // console.log('SEARCH RESULT: ', this.searchResult);
    // console.log('ACTIVE FACET: ', this.activeFacetValueCode);
    this.component.data$.subscribe(data => {
      console.log('DATA FROM CMS: ', data);
    });

    if (this.searchResult.facets) {
      this.searchResult.facets.forEach(el => {
        this.showAllPerFacetMap.set(el.name, false);
      });
    }
  }

  openFilterModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  toggleValue(query: string) {
    this.filter.emit(this.queryCodec.decodeValue(query));
  }

  showLess(facetName: string) {
    this.updateShowAllPerFacetMap(facetName, false);
  }

  showMore(facetName: string) {
    this.updateShowAllPerFacetMap(facetName, true);
  }

  private updateShowAllPerFacetMap(facetName: string, showAll: boolean) {
    this.showAllPerFacetMap.set(facetName, showAll);
  }

  isFacetCollapsed(facetName: string) {
    return this.collapsedFacets.has(facetName);
  }

  toggleFacet(facetName: string) {
    if (this.collapsedFacets.has(facetName)) {
      this.collapsedFacets.delete(facetName);
    } else {
      this.collapsedFacets.add(facetName);
    }
  }

  getVisibleFacetValues(facet) {
    return facet.values.slice(
      0,
      this.showAllPerFacetMap.get(facet.name)
        ? facet.values.length
        : this.minPerFacet
    );
  }

  protected search(query: string, options?: SearchConfig) {
    if (this.query) {
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
}
