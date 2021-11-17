import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../price/configurator-price.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-configurator-overview-attribute',
  templateUrl: './configurator-overview-attribute.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorOverviewAttributeComponent {
  @Input() attributeOverview: Configurator.AttributeOverview;

  constructor(protected breakpointService: BreakpointService) {}

  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    return {
      quantity: this.attributeOverview.quantity,
      price: this.attributeOverview.valuePrice,
      priceTotal: this.attributeOverview.valuePriceTotal,
      isLightedUp: true,
    };
  }

  /**
   * Verifies whether the current screen size equals or is larger than breakpoint `BREAKPOINT.md`.
   *
   * @returns {Observable<boolean>} - If the given breakpoint equals or is larger than`BREAKPOINT.md` returns `true`, otherwise `false`.
   */
  isDesktop(): Observable<boolean> {
    return this.breakpointService.isUp(BREAKPOINT.md);
  }
}
