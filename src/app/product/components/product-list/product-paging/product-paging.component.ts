import { Component, Input } from '@angular/core';

@Component({
  selector: 'y-product-paging',
  templateUrl: './product-paging.component.html',
  styleUrls: ['./product-paging.component.scss']
})
export class ProductPagingComponent {
    @Input() searchResult;
}
