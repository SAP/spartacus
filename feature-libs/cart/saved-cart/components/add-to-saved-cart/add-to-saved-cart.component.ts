import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ActiveCartService,
  AuthService,
  Cart,
  RoutingService,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-add-to-saved-cart',
  templateUrl: './add-to-saved-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToSavedCartComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();
  protected loggedIn = false;

  @ViewChild('element') element: ElementRef;

  cart$: Observable<Cart>;

  constructor(
    protected activeCartService: ActiveCartService,
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  ngOnInit(): void {
    this.cart$ = combineLatest([
      this.activeCartService.getActive(),
      this.authService.isUserLoggedIn(),
    ]).pipe(
      tap(([_, loggedIn]) => (this.loggedIn = loggedIn)),
      map(([activeCart]) => activeCart)
    );
  }

  saveCart(cart: Cart): void {
    if (this.loggedIn) {
      this.openDialog(cart);
    } else {
      this.routingService.go({ cxRoute: 'login' });
    }
  }

  openDialog(cart: Cart) {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.SAVED_CART,
      this.element,
      this.vcr,
      { cart, layoutOption: 'save' }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
