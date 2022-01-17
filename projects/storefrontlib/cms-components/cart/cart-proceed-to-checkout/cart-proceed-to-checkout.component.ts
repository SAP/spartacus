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
    selector: 'cx-cart-proceed-to-checkout',
    templateUrl: './cart-proceed-to-checkout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class CartProceedToCheckoutComponent implements OnInit, OnDestroy {
    cart$: Observable<Cart>;
    entries$: Observable<OrderEntry[]>;
    cartValidationInProgress = false;

    protected subscription = new Subscription();

    constructor(
      protected activeCartService: ActiveCartService,
      protected router: Router
    ) {}

    ngOnInit() {
      this.cart$ = this.activeCartService.getActive();
      this.entries$ = this.activeCartService
        .getEntries()
        .pipe(filter((entries) => entries.length > 0));
  
      this.subscription.add(
        this.router.events.subscribe((event: Event) => {
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