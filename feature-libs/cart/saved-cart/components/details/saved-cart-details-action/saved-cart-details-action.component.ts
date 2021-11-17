import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SavedCartFormType } from '@spartacus/cart/saved-cart/root';
import { Cart } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SavedCartDetailsService } from '../saved-cart-details.service';

@Component({
  selector: 'cx-saved-cart-details-action',
  templateUrl: './saved-cart-details-action.component.html',
})
export class SavedCartDetailsActionComponent implements OnDestroy {
  private subscription = new Subscription();
  savedCartFormType = SavedCartFormType;

  @ViewChild('element') element: ElementRef;
  savedCart$: Observable<Cart | undefined> =
    this.savedCartDetailsService.getCartDetails();

  constructor(
    protected savedCartDetailsService: SavedCartDetailsService,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

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
