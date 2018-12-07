import { Component, Input } from '@angular/core';

@Component({
  selector: 'cx-product-list-page-layout',
  templateUrl: './product-list-page-layout.component.html',
  styleUrls: ['./product-list-page-layout.component.scss']
})
export class ProductListPageLayoutComponent {
  @Input()
  gridMode: String;

  @Input()
  categoryCode: string;
  @Input()
  brandCode: string;
  @Input()
  query: string;
}
