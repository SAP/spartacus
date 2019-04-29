import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService, UICart } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCartComponent {
  cart$: Observable<UICart>;
  constructor(protected cartService: CartService) {
    this.cart$ = this.cartService.getActive();
  }
}
