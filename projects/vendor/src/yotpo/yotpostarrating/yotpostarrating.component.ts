import { Component, ElementRef } from '@angular/core';
import { BaseyotpoComponent } from './../baseyotpo/baseyotpo.component';
import { ProductService, RoutingService, WindowRef } from '@spartacus/core';
import { YotpoConfig } from '../yotpoconfig/yotpo-config';

@Component({
  selector: 'cx-yotpostarrating',
  templateUrl: './yotpostarrating.component.html',
  styleUrls: []
})
export class YotpostarratingComponent extends BaseyotpoComponent {
  constructor(protected config: YotpoConfig, protected windowRef: WindowRef,
    protected elementRef: ElementRef,
    protected routingService: RoutingService,
    protected productService: ProductService
  ) {
    super(config, windowRef, elementRef, routingService, productService);
  }
}
