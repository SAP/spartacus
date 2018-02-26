import { Component, Input } from '@angular/core';

@Component({
  selector: 'y-product-sorting',
  templateUrl: './product-sorting.component.html',
  styleUrls: ['./product-sorting.component.scss']
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
