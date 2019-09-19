import { Component, Input } from '@angular/core';
import { RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-to-configuration',
  templateUrl: './to-configuration.component.html',
})
export class ToConfigurationComponent {
  @Input() productCode: string;
  @Input() configuratorType: string;

  constructor(private routingService: RoutingService) {}

  toConfiguration() {
    //later we might check for a cached configuration per product

    this.routingService.go({
      cxRoute: this.compileRoute(this.configuratorType),
      params: { rootProduct: this.productCode },
    });
  }

  compileRoute(configuratorType: string): string {
    return 'configure' + configuratorType;
  }
}
