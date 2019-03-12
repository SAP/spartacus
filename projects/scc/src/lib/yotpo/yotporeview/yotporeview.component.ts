import { Component, OnInit } from '@angular/core';
import { Product } from '@spartacus/core';

@Component({
  selector: 'lib-yotporeview',
  templateUrl: './yotporeview.component.html',
  styleUrls: ['./yotporeview.component.css']
})
export class YotporeviewComponent implements OnInit {
  @Input()
  product: Product;

  constructor() { }

  ngOnInit() {
  }

}
