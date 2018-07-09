import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'y-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  styleUrls: ['./product-facet-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFacetNavigationComponent implements OnInit {
  @Input() activeFacetValueCode;
  @Input() searchResult;
  @Input() minPerFacet;
  @Input() step;
  @Output() filter: EventEmitter<any> = new EventEmitter<any>();

  facetDisplayAmountmap: Map<String, number>;

  constructor() {
    this.facetDisplayAmountmap = new Map<String, number>();
  }

  ngOnInit() {
    for (const index of Object.keys(this.searchResult.facets)) {
      this.facetDisplayAmountmap.set(
        this.searchResult.facets[index].name,
        this.minPerFacet
      );
    }
  }

  toggleValue(query: string) {
    this.filter.emit(query);
  }

  showLess(facetName: String) {
    this.updateFacetAmount(facetName, -this.step);
  }
  showMore(facetName: String) {
    this.updateFacetAmount(facetName, this.step);
  }

  private updateFacetAmount(facetName: String, change: number) {
    const currentAmountDisplayed = this.facetDisplayAmountmap.get(facetName);
    this.facetDisplayAmountmap.set(facetName, currentAmountDisplayed + change);
  }
}
