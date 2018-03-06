import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'y-product-paging',
  templateUrl: './product-paging.component.html',
  styleUrls: ['./product-paging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPagingComponent {
  @Input() searchResult;
}
