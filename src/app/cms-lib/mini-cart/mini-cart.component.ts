import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import * as fromStore from '../../cms/store';
import * as fromCartStore from '../../cart/store';
import { CartService } from '../../cart/services';

import { ConfigService } from '../../cms/config.service';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'y-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniCartComponent extends AbstractCmsComponent {
  static componentName = 'MiniCartComponent';

  cart$: Observable<any>;
  entries$: Observable<any>;

  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.CmsState>,
    protected config: ConfigService,
    protected dialog: MatDialog,
    protected cartService: CartService
  ) {
    super(cd, store, config);
  }

  protected fetchData() {
    this.cart$ = this.store.select(fromCartStore.getActiveCart);
    this.entries$ = this.store.select(fromCartStore.getEntries);

    super.fetchData();
  }

  openCart() {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      data: { cart$: this.cart$, entries$: this.entries$ }
    });

    const sub = dialogRef.componentInstance.onDelete.subscribe(entry => {
      this.cartService.removeCartEntry(entry);
    });
  }

  /*openLogin() {
  const dialogRef = this.dialog.open(LoginDialogComponent, {
    data: {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.username = result.username;
    this.password = result.password;
    this.rememberMe = result.rememberMe;

    if (this.username !== undefined && this.password !== undefined) {
      this.login();
    }
  });*/
}
