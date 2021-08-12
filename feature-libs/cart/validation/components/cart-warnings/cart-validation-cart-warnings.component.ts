import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartValidationWarningsStateService } from '../../core';
import { CartValidationStatusCode } from '../../root';
import { CartModification } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-cart-validation-cart-warnings',
  templateUrl: './cart-validation-cart-warnings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartValidationCartWarningsComponent {
  iconTypes = ICON_TYPE;
  visibleWarnings: { [key: string]: boolean } = {};

  checkoutRouteActivated$ = this.cartValidationWarningsStateService
    .checkoutRouteActivated$;

  cartModifications$ = this.cartValidationWarningsStateService.cartValidationResult$.pipe(
    map((modificationList: CartModification[]) => {
      console.log('outOfStock cartModifications$: ', modificationList);
      const result = modificationList.filter(
        (modification) =>
          modification.statusCode === CartValidationStatusCode.LOW_STOCK
      );

      result.forEach((modification) => {
        if (modification.entry?.product?.code) {
          this.visibleWarnings[modification.entry.product.code] = true;
        }
      });
      return result;
    })
  );

  constructor(
    protected cartValidationWarningsStateService: CartValidationWarningsStateService
  ) {}

  removeMessage(cartModification: CartModification) {
    if (cartModification.entry?.product?.code) {
      this.visibleWarnings[cartModification.entry.product.code] = false;
    }
  }
}
