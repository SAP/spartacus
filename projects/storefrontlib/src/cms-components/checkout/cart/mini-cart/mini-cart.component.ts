import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICON_TYPES } from '../../../../cms-components/misc/icon/index';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCartComponent {
  iconTypes = ICON_TYPES;

  quantity$: Observable<number> = this.cartService
    .getActive()
    .pipe(map(cart => cart.deliveryItemsQuantity || 0));

  total$: Observable<string> = this.cartService.getActive().pipe(
    filter(cart => !!cart.totalPrice),
    map(cart => cart.totalPrice.formattedValue)
  );

  constructor(protected cartService: CartService) {}
}
