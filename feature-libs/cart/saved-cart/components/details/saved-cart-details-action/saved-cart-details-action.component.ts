import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  SavedCartFacade,
  SavedCartFormType,
} from '@spartacus/cart/saved-cart/root';
import { Cart, GlobalMessageService, RoutingService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SavedCartDetailsService } from '../saved-cart-details.service';

@Component({
  selector: 'cx-saved-cart-details-action',
  templateUrl: './saved-cart-details-action.component.html',
})
export class SavedCartDetailsActionComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  savedCartFormType = SavedCartFormType;

  @ViewChild('element') element: ElementRef;
  savedCart$: Observable<
    Cart | undefined
  > = this.savedCartDetailsService.getCartDetails();

  constructor(
    protected savedCartDetailsService: SavedCartDetailsService,
    protected savedCartService: SavedCartFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.savedCartService
        .getRestoreSavedCartProcessSuccess()
        .subscribe((success) => this.onRestoreComplete(success))
    );
  }

  // TODO(BRIAN): remove / breaking change - will remove before merge
  // restoreSavedCart(cartId: string): void {
  //   this.savedCartService.restoreSavedCart(cartId);
  // }

  onRestoreComplete(success: boolean): void {
    if (success) {
      this.routingService.go({ cxRoute: 'savedCarts' });
      // TODO(BRIAN): remove / breaking change - will remove before merge
      // this.savedCartService.clearCloneSavedCart();
      this.savedCartService.clearRestoreSavedCart();
      this.savedCartService.clearSaveCart();
    }
  }

  openDialog(cart: Cart, type: SavedCartFormType): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.SAVED_CART,
      this.element,
      this.vcr,
      { cart, layoutOption: type }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
