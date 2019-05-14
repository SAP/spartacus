import { HttpUrlEncodingCodec } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Facet,
  ProductSearchService,
  ProductSearchPage,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ICON_TYPES } from '../../../../cms-components/misc/icon/index';

@Component({
  selector: 'cx-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFacetNavigationComponent implements OnInit {
  iconTypes = ICON_TYPES;

  activeFacetValueCode: string;
  searchResult: ProductSearchPage;
  minPerFacet = 6;
  showAllPerFacetMap: Map<String, boolean>;
  queryCodec: HttpUrlEncodingCodec;
  private collapsedFacets = new Set<string>();
  searchResult$: Observable<ProductSearchPage>;
  updateParams$: Observable<Params>;

  get visibleFacets(): Facet[] {
    if (!this.searchResult.facets) {
      return [];
    }
    return this.searchResult.facets.filter(facet => facet.visible);
  }

  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private productSearchService: ProductSearchService
  ) {
    this.showAllPerFacetMap = new Map<String, boolean>();
    this.queryCodec = new HttpUrlEncodingCodec();
  }

  ngOnInit(): void {
    this.updateParams$ = this.activatedRoute.params.pipe(
      tap(params => {
        this.activeFacetValueCode = params.categoryCode || params.brandCode;
      })
    );

    this.searchResult$ = this.productSearchService.getSearchResults().pipe(
      tap(searchResult => {
        this.searchResult = searchResult;
        if (this.searchResult.facets) {
          this.searchResult.facets.forEach(el => {
            this.showAllPerFacetMap.set(el.name, false);
          });
        }
      }),
      filter(searchResult => Object.keys(searchResult).length > 0)
    );
  }

  openFilterModal(content): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  toggleValue(query: string): void {
    this.productSearchService.search(this.queryCodec.decodeValue(query));
  }

  showLess(facetName: String): void {
    this.updateShowAllPerFacetMap(facetName, false);
  }

  showMore(facetName: String): void {
    this.updateShowAllPerFacetMap(facetName, true);
  }

  private updateShowAllPerFacetMap(facetName: String, showAll: boolean): void {
    this.showAllPerFacetMap.set(facetName, showAll);
  }

  isFacetCollapsed(facetName: string): boolean {
    return this.collapsedFacets.has(facetName);
  }

  toggleFacet(facetName: string): void {
    if (this.collapsedFacets.has(facetName)) {
      this.collapsedFacets.delete(facetName);
    } else {
      this.collapsedFacets.add(facetName);
    }
  }

  getVisibleFacetValues(facet): any {
    return facet.values.slice(
      0,
      this.showAllPerFacetMap.get(facet.name)
        ? facet.values.length
        : this.minPerFacet
    );
  }
}
