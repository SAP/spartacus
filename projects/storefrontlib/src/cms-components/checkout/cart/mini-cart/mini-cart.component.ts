import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '@spartacus/core';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCartComponent {
  cart$ = this.cartService.getActive();

  constructor(protected cartService: CartService) {}
}
