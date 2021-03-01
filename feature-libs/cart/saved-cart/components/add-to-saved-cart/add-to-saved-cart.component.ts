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
import { filter, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-add-to-saved-cart',
  templateUrl: './add-to-saved-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToSavedCartComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;
  protected loggedIn = false;

  @ViewChild('element') element: ElementRef;

  protected subscription = new Subscription();

  constructor(
    protected activeCartService: ActiveCartService,
    protected authService: AuthService,
    protected launchDialogService: LaunchDialogService,
    protected routingService: RoutingService,
    protected vcr: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.cart$ = combineLatest([
      this.activeCartService.getActive(),
      this.authService.isUserLoggedIn(),
    ]).pipe(
      tap(([, loggedIn]) => (this.loggedIn = loggedIn)),
      map(([cartLoaded]) => cartLoaded)
    );
  }

  ngOnDestroy(): void {
    this.launchDialogService.clear(LAUNCH_CALLER.ADD_TO_SAVED_CART);
  }

  saveCart(cart: Cart): void {
    if (this.loggedIn) {
      const dialog = this.openDialog(this.element, this.vcr, cart);

      if (dialog) {
        this.subscription.add(dialog.pipe(take(1)).subscribe());
      }
    } else {
      this.routingService.go({ cxRoute: 'login' });
    }
  }

  protected openDialog(
    openElement?: ElementRef,
    vcr?: ViewContainerRef,
    data?: any
  ): Observable<any> | undefined {
    const component = this.launchDialogService.launch(
      LAUNCH_CALLER.ADD_TO_SAVED_CART,
      vcr,
      data
    );

    if (component) {
      return combineLatest([
        component,
        this.launchDialogService.dialogClose,
      ]).pipe(
        filter(([, close]) => close !== undefined),
        tap(([comp]) => {
          openElement?.nativeElement.focus();
          this.launchDialogService.clear(LAUNCH_CALLER.ADD_TO_SAVED_CART);
          comp.destroy();
        }),
        map(([comp]) => comp)
      );
    }
  }
}
