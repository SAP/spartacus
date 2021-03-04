import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  Cart,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SavedCartService } from '../../../core/services/saved-cart.service';
import { SavedCartFormLaunchDialogService } from '../../saved-cart-form-dialog/saved-cart-form-launch-dialog.service';
import { SavedCartDetailService } from '../saved-cart-detail.service';

@Component({
  selector: 'cx-saved-cart-detail-action',
  templateUrl: './saved-cart-detail-action.component.html',
})
export class SavedCartDetailActionComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  @ViewChild('element') element: ElementRef;
  savedCart$: Observable<Cart> = this.savedCartDetailService.getCartDetails();

  constructor(
    protected savedCartDetailService: SavedCartDetailService,
    protected savedCartService: SavedCartService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected savedCartFormLaunchDialogService: SavedCartFormLaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.savedCartService
        .getRestoreSavedCartProcessSuccess()
        .subscribe((success) => this.onSuccess(success))
    );
  }

  restoreSavedCart(cartId: string): void {
    this.savedCartService.restoreSavedCart(cartId);
  }

  deleteSavedCart(cartId: string): void {
    // TODO: replace logic and use the DeleteCartEvents when they're available.
    //  2- requires generic dialog form from Michal
    // do note the things from the overview will be removed and fix in the overview component issue
    this.savedCartService.deleteSavedCart(cartId);
    this.routingService.go({ cxRoute: 'savedCartDetails' });
    this.globalMessageService.add(
      {
        key: 'savedCartDetails.deleteCartSuccess',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.routingService.go({ cxRoute: 'savedCarts' });
      this.savedCartService.clearRestoreSavedCart();
    }
  }

  openDialog(cart: Cart): void {
    const dialog = this.savedCartFormLaunchDialogService.openDialog(
      this.element,
      this.vcr,
      { cart, layoutOption: 'delete' }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
