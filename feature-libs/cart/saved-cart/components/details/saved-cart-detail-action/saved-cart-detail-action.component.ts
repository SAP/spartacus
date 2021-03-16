import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { Cart, GlobalMessageService, RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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
