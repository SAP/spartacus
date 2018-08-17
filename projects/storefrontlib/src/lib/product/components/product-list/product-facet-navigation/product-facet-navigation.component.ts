import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { HttpUrlEncodingCodec } from '@angular/common/http';

@Component({
  selector: 'y-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  styleUrls: ['./product-facet-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFacetNavigationComponent implements OnInit {
  @Input() activeFacetValueCode;
  @Input() searchResult;
  @Input() minPerFacet = 6;

  @Output() filter: EventEmitter<any> = new EventEmitter<any>();

  showAllPerFacetMap: Map<String, boolean>;
  queryCodec: HttpUrlEncodingCodec;

  constructor() {
    this.showAllPerFacetMap = new Map<String, boolean>();
    this.queryCodec = new HttpUrlEncodingCodec();
  }

  ngOnInit() {
    this.searchResult.facets.forEach(el => {
      this.showAllPerFacetMap.set(el.name, false);
    });
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
}
