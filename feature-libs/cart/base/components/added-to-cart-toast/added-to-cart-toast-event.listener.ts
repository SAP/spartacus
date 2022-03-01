import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CartConfig, CartUiEventAddToCart } from '../../root';
import { ADD_TO_CART_FEEDBACK } from '../../root/config/add-to-cart-feedback';
import { AddedToCartToastComponentService } from './added-to-cart-toast-component.service';

@Injectable({
  providedIn: 'root',
})
export class AddedToCartToastEventListener implements OnDestroy {
  protected subscription = new Subscription();
  protected component: any;

  constructor(
    protected eventService: EventService,
    protected launchDialogService: LaunchDialogService,
    protected addedToCartToastService: AddedToCartToastComponentService,
    protected cartConfig: CartConfig
  ) {
    this.onAddToCart();
  }

  protected onAddToCart() {
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

  protected renderToastUi() {
    const component$: any = this.launchDialogService.launch(
      LAUNCH_CALLER.ADDED_TO_CART_TOAST
    );
    component$.pipe(take(1)).subscribe((component: any) => {
      this.component = component.instance;
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
