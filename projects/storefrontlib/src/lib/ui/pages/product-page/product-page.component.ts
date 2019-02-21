import { Component } from '@angular/core';
import { CurrentProductService } from './current-product.service';

@Component({
  selector: 'cx-product-page',
  templateUrl: './product-page.component.html',
  providers: [CurrentProductService]
})
export class ProductPageComponent {
  constructor() {}
}
