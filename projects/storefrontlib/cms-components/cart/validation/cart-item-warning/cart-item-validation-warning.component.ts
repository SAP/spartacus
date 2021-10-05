import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartValidationWarningsStateService } from '../cart-validation-warnings-state.service';
import { ICON_TYPE } from '../../../misc';
import { CartModification, CartValidationStatusCode } from '@spartacus/core';

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

  cartModification$ =
    this.cartValidationWarningsStateService.cartValidationResult$.pipe(
      map((modificationList: CartModification[]) =>
        modificationList.find(
          (modification) =>
            modification.statusCode === CartValidationStatusCode.LOW_STOCK &&
            modification.entry.product.code === this.code
        )
      )
    );

  constructor(
    protected cartValidationWarningsStateService: CartValidationWarningsStateService
  ) {}
}
