import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'cx-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTabsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
