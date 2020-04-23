import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartConfig } from '../config/cart-config';

@Injectable({
  providedIn: 'root',
})
export class CartConfigService {
  selectiveCartEnabled$: BehaviorSubject<boolean>;

  constructor(protected config: CartConfig) {
    this.selectiveCartEnabled$ = new BehaviorSubject<boolean>(
      this.config.cart.selectiveCart.enabled
    );
  }

  isSelectiveCartEnabled(): Observable<boolean> {
    return this.selectiveCartEnabled$.asObservable();
  }

  enableSelectiveCart() {
    this.selectiveCartEnabled$.next(true);
  }

  disableSelectiveCart() {
    this.selectiveCartEnabled$.next(false);
  }
}
