import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'y-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  styleUrls: ['./product-facet-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFacetNavigationComponent {
  @Input() activeFacetValueCode;
  @Input() searchResult;
  @Output() filter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  toggleValue(query: string) {
    this.filter.emit(query);
  }
}
