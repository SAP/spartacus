import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Injectable,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { tap, filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromStore from './../../store';

@Component({
  selector: 'y-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartComponent implements OnInit, OnDestroy {
  isLoading = false;
  @Input() iconOnly;

  @Input() productCode;
  @Input() quantity = 1;

  cartEntry$: Observable<any>;
  subscription: Subscription;

  constructor(
    protected dialog: MatDialog,
    protected cartService: CartService,
    protected store: Store<fromStore.CartState>
  ) {}

  ngOnInit() {
    if (this.productCode) {
      this.cartEntry$ = this.store
        .select(fromStore.getEntrySelectorFactory(this.productCode))
        .pipe(tap(() => (this.isLoading = false)));
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addToCart() {
    if (!this.productCode) {
      console.warn('no product code found on this component');
      return;
    }
    this.isLoading = true;
    this.cartService.addCartEntry(this.productCode, this.quantity);
  }
}
