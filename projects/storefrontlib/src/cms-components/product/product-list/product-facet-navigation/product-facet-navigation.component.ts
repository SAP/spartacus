import { HttpUrlEncodingCodec } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Facet, ProductSearchPage } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { ProductListComponentService } from '../container/product-list-component.service';

@Component({
  selector: 'cx-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFacetNavigationComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  iconTypes = ICON_TYPE;

  activeFacetValueCode: string;
  searchResult: ProductSearchPage;
  showAllPerFacetMap: Map<String, boolean>;
  protected queryCodec: HttpUrlEncodingCodec;
  private collapsedFacets = new Set<string>();
  searchResult$: Observable<ProductSearchPage>;
  visibleFacets$: Observable<Facet[]>;

  constructor(
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private productListComponentService: ProductListComponentService
  ) {
    this.showAllPerFacetMap = new Map<String, boolean>();
    this.queryCodec = new HttpUrlEncodingCodec();
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.activeFacetValueCode = params.categoryCode || params.brandCode;
    });

    this.searchResult$ = this.productListComponentService.model$.pipe(
      tap(searchResult => {
        if (searchResult.facets) {
          searchResult.facets.forEach(el => {
            this.showAllPerFacetMap.set(el.name, false);
          });
        }
      })
    );

    this.visibleFacets$ = this.searchResult$.pipe(
      map(searchResult => {
        return searchResult.facets
          ? searchResult.facets.filter(facet => facet.visible)
          : [];
      })
    );
  }

  openFilterModal(content): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  toggleValue(query: string): void {
    this.productListComponentService.setQuery(
      this.queryCodec.decodeValue(query)
    );
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

  getVisibleFacetValues(facet: Facet): Facet[] {
    return facet.values.slice(
      0,
      this.showAllPerFacetMap.get(facet.name)
        ? facet.values.length
        : facet.topValueCount
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
