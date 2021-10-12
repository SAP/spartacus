import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActiveCartService, Cart, OrderEntry } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  Router,
} from '@angular/router';

@Component({
  selector: 'cx-cart-totals',
  templateUrl: './cart-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTotalsComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartValidationInProgress = false;

  protected subscription = new Subscription();

  /**
   * @deprecated since 4.2
   */
  constructor(activeCartService: ActiveCartService);

  constructor(
    protected activeCartService: ActiveCartService,
    protected router?: Router
  ) {}

  ngOnInit() {
    this.cart$ = this.activeCartService.getActive();
    this.entries$ = this.activeCartService
      .getEntries()
      .pipe(filter((entries) => entries.length > 0));

    this.subscription.add(
      this.router?.events.subscribe((event: Event) => {
        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.cartValidationInProgress = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  disableButtonWhileNavigation(): void {
    this.cartValidationInProgress = true;
  }
}
