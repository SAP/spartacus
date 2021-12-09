import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AddToCartComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-epd-visualization-compact-add-to-cart',
  templateUrl: './compact-add-to-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactAddToCartComponent extends AddToCartComponent {}
