import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'y-product-sorting',
  templateUrl: './product-sorting.component.html',
  styleUrls: ['./product-sorting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSortingComponent {
  @Input() grid;

  // TODO: configurable
  sortOptions = [
    {
      code: 'relevance',
      label: 'Relevance'
    },
    {
      code: 'price',
      label: 'Price'
    }
  ];
}
