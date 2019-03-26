import { Component, ElementRef } from '@angular/core';
import { BaseyotpoComponent } from './../baseyotpo/baseyotpo.component';
import { ProductService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-yotporeview',
  templateUrl: './yotporeview.component.html',
  styleUrls: []
})
export class YotporeviewComponent extends BaseyotpoComponent {
  constructor(protected elementRef:ElementRef, 
		protected routingService: RoutingService,
		protected productService: ProductService) { super(elementRef, routingService, productService); }
}