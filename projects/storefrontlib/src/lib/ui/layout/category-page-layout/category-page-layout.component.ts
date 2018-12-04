import { Component, Input } from '@angular/core';

@Component({
  selector: 'cx-category-page-layout',
  templateUrl: './category-page-layout.component.html',
  styleUrls: ['./category-page-layout.component.scss']
})
export class CategoryPageLayoutComponent {
  @Input()
  categoryCode: string;
  @Input()
  query: string;
}
