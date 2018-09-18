import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy, Inject
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../cms/store';
import * as fromCartStore from '../../cart/store';
import { CartService } from '../../cart/services/cart.service';

import { CmsModuleConfig } from '../../cms/cms-module-config';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

import { MatDialog } from '@angular/material';
import { Config } from '../../config/config.module';

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

  showProductCount: number;
  banner: any;

  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.CmsState>,
    protected config: CmsModuleConfig,
    protected dialog: MatDialog,
    protected cartService: CartService
  ) {
    super(cd, store, config);
  }

  protected fetchData() {
    this.showProductCount = +this.component.shownProductCount;
    this.banner = this.component.lightboxBannerComponent;

    this.cart$ = this.store.select(fromCartStore.getActiveCart);
    this.entries$ = this.store.select(fromCartStore.getEntries);

    super.fetchData();
  }

  // SPA-589 : this code isnt used for now
  openCart() {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      data: {
        cart$: this.cart$,
        entries$: this.entries$,
        showProductCount: this.showProductCount,
        banner: this.banner
      }
    });

    const sub = dialogRef.componentInstance.onDelete.subscribe(entry => {
      this.cartService.removeCartEntry(entry);
    });

    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }
}
