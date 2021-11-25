import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartModification, CartValidationStatusCode } from '@spartacus/core';
import { CartValidationStateService } from '../cart-validation-state.service';
import { ICON_TYPE } from '../../../misc/icon/index';

@Component({
  selector: 'cx-cart-validation-warnings',
  templateUrl: './cart-validation-warnings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartValidationWarningsComponent {
  iconTypes = ICON_TYPE;
  visibleWarnings: Record<string, boolean> = {};

  cartModifications$ =
    this.cartValidationStateService.cartValidationResult$.pipe(
      map((modificationList) => {
        const result = modificationList.filter(
          (modification) =>
            modification.statusCode === CartValidationStatusCode.NO_STOCK
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
    protected cartValidationStateService: CartValidationStateService
  ) {}

  removeMessage(cartModification: CartModification) {
    if (cartModification.entry?.product?.code) {
      this.visibleWarnings[cartModification.entry.product.code] = false;
    }
  }
}
