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
import { SavedCartFormLaunchDialogService } from '../saved-cart-form-dialog/saved-cart-form-launch-dialog.service';

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

  // TODO(#12167): make launchDialogService a required dependency instead of savedCartFormLaunchDialogService and remove deprecated constructor
  /**
   * @deprecated since 3.3
   * Default constructor will looks like:
   *
   * @param {ActiveCartService} activeCartService
   * @param {AuthService} authService
   * @param {RoutingService} routingService
   * @param {ViewContainerRef} vcr
   * @param {LaunchDialogService} launchDialogService
   */
  constructor(
    activeCartService: ActiveCartService,
    authService: AuthService,
    routingService: RoutingService,
    savedCartFormLaunchDialogService: SavedCartFormLaunchDialogService,
    vcr: ViewContainerRef
  );
  constructor(
    protected activeCartService: ActiveCartService,
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected savedCartFormLaunchDialogService: SavedCartFormLaunchDialogService,
    protected vcr: ViewContainerRef,
    protected launchDialogService?: LaunchDialogService
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
    // TODO(#12167): use launchDialogService only
    if (this.launchDialogService) {
      const dialog = this.launchDialogService.openDialog(
        LAUNCH_CALLER.SAVED_CART,
        this.element,
        this.vcr,
        { cart, layoutOption: 'save' }
      );

      if (dialog) {
        this.subscription.add(dialog.pipe(take(1)).subscribe());
      }
    } else {
      const dialog = this.savedCartFormLaunchDialogService.openDialog(
        this.element,
        this.vcr,
        { cart, layoutOption: 'save' }
      );

      if (dialog) {
        this.subscription.add(dialog.pipe(take(1)).subscribe());
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
