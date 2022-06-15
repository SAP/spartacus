import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  CartModification,
  CartValidationFacade,
} from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { of } from 'rxjs';

@Component({
  selector: 'cx-cart-item-validation-warning',
  templateUrl: './cart-item-validation-warning.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemValidationWarningComponent {
  @Input()
  code: string;

  iconTypes = ICON_TYPE;
  isVisible = true;

  cartModification$ = of({
    statusCode: 'lowStock',
    quantityAdded: 0,
  } as CartModification);

  constructor(protected cartValidationFacade: CartValidationFacade) {}
}
