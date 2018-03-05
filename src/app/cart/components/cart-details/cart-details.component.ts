import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import * as fromCartStore from '../../../cart/store';
import { CartService } from '../../../cart/services';

import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'y-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent implements OnInit {
  static componentName = 'CartDetailsComponent';

  cart$ = this.store.select(fromCartStore.getActiveCart);
  entries$ = this.store.select(fromCartStore.getEntries);

  banner: any;

  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromCartStore.CartState>,
    protected cartService: CartService,
    private location: Location
  ) {}

  ngOnInit() {
    this.cart$ = this.store.select(fromCartStore.getActiveCart);
    this.entries$ = this.store.select(fromCartStore.getEntries);
  }

  removeEntry(entry) {
    this.cartService.removeCartEntry(entry);
  }

  goBack() {
    this.location.back();
  }
}
