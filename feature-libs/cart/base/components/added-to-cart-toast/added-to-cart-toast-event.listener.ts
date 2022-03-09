import { ComponentRef, Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import {
  ADD_TO_CART_FEEDBACK,
  CartConfig,
  CartUiEventAddToCart,
} from '../../root';
import { AddedToCartToastComponentService } from './added-to-cart-toast-component.service';
import { AddedToCartToastComponent } from './added-to-cart-toast.component';

@Injectable({
  providedIn: 'root',
})
export class AddedToCartToastEventListener implements OnDestroy {
  protected subscription = new Subscription();
  protected component: AddedToCartToastComponent;

  constructor(
    protected eventService: EventService,
    protected launchDialogService: LaunchDialogService,
    protected addedToCartToastService: AddedToCartToastComponentService,
    protected cartConfig: CartConfig
  ) {
    this.onAddToCart();
  }

  protected onAddToCart(): void {
    const feedbackType = this.cartConfig.cart?.addToCartFeedback.feedback;
    if (feedbackType !== ADD_TO_CART_FEEDBACK.TOAST) {
      return;
    }

    this.subscription.add(
      this.eventService.get(CartUiEventAddToCart).subscribe((event) => {
        this.addToast(event);
      })
    );
  }

  protected renderToastUi(): void {
    const timeout = this.cartConfig.cart?.addToCartFeedback.toast?.timeout;
    const component$: any = this.launchDialogService.launch(
      LAUNCH_CALLER.ADDED_TO_CART_TOAST
    );

    component$
      .pipe(filter(Boolean), take(1))
      .subscribe((component: ComponentRef<AddedToCartToastComponent>) => {
        this.component = component.instance;
        this.component.timeout = timeout ? timeout : 3000;
      });
  }

  protected addToast(event: CartUiEventAddToCart): void {
    if (!this.component) {
      this.renderToastUi();
    }
    this.component.addToast(event);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
