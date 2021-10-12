import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartValidationStateService } from '../cart-validation-state.service';
import { ICON_TYPE } from '../../../misc/icon/index';
import { CartValidationStatusCode } from '@spartacus/core';

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
    this.cartValidationStateService.cartValidationResult$.pipe(
      map((modificationList) =>
        modificationList.find(
          (modification) =>
            modification.statusCode === CartValidationStatusCode.LOW_STOCK &&
            modification.entry.product.code === this.code
        )
      )
    );

  constructor(
    protected cartValidationStateService: CartValidationStateService
  ) {}
}
