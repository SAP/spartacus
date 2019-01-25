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

@Component({
  selector: 'cx-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  styleUrls: ['./product-facet-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFacetNavigationComponent implements OnInit {
  @Input()
  activeFacetValueCode;
  @Input()
  searchResult;
  @Input()
  minPerFacet = 6;

  @Output()
  filter: EventEmitter<any> = new EventEmitter<any>();

  showAllPerFacetMap: Map<String, boolean>;
  queryCodec: HttpUrlEncodingCodec;
  private collapsedFacets = new Set<string>();

  get visibleFacets() {
    if (!this.searchResult.facets) {
      return [];
    }
    return this.searchResult.facets.filter(facet => facet.visible);
  }

  constructor(private modalService: NgbModal) {
    this.showAllPerFacetMap = new Map<String, boolean>();
    this.queryCodec = new HttpUrlEncodingCodec();
  }

  ngOnInit() {
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

  showLess(facetName: String) {
    this.updateShowAllPerFacetMap(facetName, false);
  }

  showMore(facetName: String) {
    this.updateShowAllPerFacetMap(facetName, true);
  }

  private updateShowAllPerFacetMap(facetName: String, showAll: boolean) {
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
}
