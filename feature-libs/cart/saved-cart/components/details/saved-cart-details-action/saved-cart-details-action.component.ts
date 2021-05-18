import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  Cart,
  ClearCheckoutService,
  GlobalMessageService,
  RoutingService,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SavedCartFormLaunchDialogService } from '../../saved-cart-form-dialog/saved-cart-form-launch-dialog.service';
import { SavedCartDetailsService } from '../saved-cart-details.service';

@Component({
  selector: 'cx-saved-cart-details-action',
  templateUrl: './saved-cart-details-action.component.html',
})
export class SavedCartDetailsActionComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  @ViewChild('element') element: ElementRef;
  savedCart$: Observable<
    Cart | undefined
  > = this.savedCartDetailsService.getCartDetails();

  // TODO(#12167): make launchDialogService a required dependency instead of savedCartFormLaunchDialogService and remove deprecated constructors
  /**
   * Default constructor will be
   *
   * @param {SavedCartDetailsService} savedCartDetailsService
   * @param {SavedCartFacade} savedCartService
   * @param {RoutingService} routingService
   * @param {GlobalMessageService} globalMessageService
   * @param {ViewContainerRef} vcr
   * @param {ClearCheckoutService} clearCheckoutService
   * @param {LaunchDialogService} launchDialogService
   */
  constructor(
    savedCartDetailsService: SavedCartDetailsService,
    savedCartService: SavedCartFacade,
    routingService: RoutingService,
    globalMessageService: GlobalMessageService,
    savedCartFormLaunchDialogService: SavedCartFormLaunchDialogService,
    vcr: ViewContainerRef,
    clearCheckoutService: ClearCheckoutService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    launchDialogService: LaunchDialogService
  );

  /**
   * @deprecated since 3.3
   */
  constructor(
    savedCartDetailsService: SavedCartDetailsService,
    savedCartService: SavedCartFacade,
    routingService: RoutingService,
    globalMessageService: GlobalMessageService,
    savedCartFormLaunchDialogService: SavedCartFormLaunchDialogService,
    vcr: ViewContainerRef,
    clearCheckoutService: ClearCheckoutService
  );

  constructor(
    protected savedCartDetailsService: SavedCartDetailsService,
    protected savedCartService: SavedCartFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected savedCartFormLaunchDialogService: SavedCartFormLaunchDialogService,
    protected vcr: ViewContainerRef,
    protected clearCheckoutService: ClearCheckoutService,
    protected launchDialogService?: LaunchDialogService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.savedCartService
        .getRestoreSavedCartProcessSuccess()
        .subscribe((success) => this.onRestoreComplete(success))
    );
  }

  restoreSavedCart(cartId: string): void {
    this.savedCartService.restoreSavedCart(cartId);
  }

  onRestoreComplete(success: boolean): void {
    if (success) {
      this.routingService.go({ cxRoute: 'savedCarts' });
      this.savedCartService.clearRestoreSavedCart();
      this.savedCartService.clearSaveCart();
      this.clearCheckoutService.resetCheckoutProcesses();
    }
  }

  openDialog(cart: Cart): void {
    // TODO(#12167): use launchDialogService only
    if (this.launchDialogService) {
      const dialog = this.launchDialogService.openDialog(
        LAUNCH_CALLER.SAVED_CART,
        this.element,
        this.vcr,
        { cart, layoutOption: 'delete' }
      );

      if (dialog) {
        this.subscription.add(dialog.pipe(take(1)).subscribe());
      }
    } else {
      const dialog = this.savedCartFormLaunchDialogService.openDialog(
        this.element,
        this.vcr,
        { cart, layoutOption: 'delete' }
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
