import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCartStore from '../../../cart/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'y-cart-page-layout',
  templateUrl: './cart-page-layout.component.html',
  styleUrls: ['./cart-page-layout.component.scss']
})
export class CartPageLayoutComponent implements OnInit {

  cart$;
  subscription: Subscription;

  constructor(
    protected store: Store<fromCartStore.CartState>
  ) {}

  ngOnInit() {
    this.cart$ = this
      .store
      .select(fromCartStore.getActiveCart);
  }
}
