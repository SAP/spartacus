import { Component, ElementRef } from '@angular/core';
import { BaseyotpoComponent } from './../baseyotpo/baseyotpo.component';
import { ProductService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-yotpostarrating',
  templateUrl: './yotpostarrating.component.html',
  styleUrls: []
})
export class YotpostarratingComponent extends BaseyotpoComponent {
  constructor(
    protected elementRef: ElementRef,
    protected routingService: RoutingService,
    protected productService: ProductService
  ) {
    super(elementRef, routingService, productService);
  }
}
