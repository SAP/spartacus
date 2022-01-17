import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ActiveCartService, Cart } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-cart-totals',
  templateUrl: './cart-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTotalsComponent {
  cart$: Observable<Cart> =this.activeCartService.getActive();

  constructor(
    protected activeCartService: ActiveCartService,
  ) {}
}
