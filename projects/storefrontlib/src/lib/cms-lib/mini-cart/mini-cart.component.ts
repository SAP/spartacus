import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService, CmsMiniCartComponent } from '@spartacus/core';
import { ICON_TYPES } from 'projects/storefrontlib/src/cms-components/misc/icons/config/icon.config';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCartComponent {
  iconTypes = ICON_TYPES;
  constructor(
    protected component: CmsComponentData<CmsMiniCartComponent>,
    protected cartService: CartService
  ) {}

  get quantity$(): Observable<number> {
    return this.cartService
      .getActive()
      .pipe(map(cart => cart.deliveryItemsQuantity || 0));
  }

  get total$(): Observable<string> {
    return this.cartService.getActive().pipe(
      filter(cart => !!cart.totalPrice),
      map(cart => cart.totalPrice.formattedValue)
    );
  }
}
