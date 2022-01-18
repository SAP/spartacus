import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActiveCartService, Cart } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-cart-totals',
  templateUrl: './cart-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTotalsComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(protected activeCartService: ActiveCartService) {}

  ngOnInit() {
    this.cart$ = this.activeCartService.getActive();
  }
}
