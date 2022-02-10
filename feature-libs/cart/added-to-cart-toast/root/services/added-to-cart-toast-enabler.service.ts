import { Injectable } from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { AddedToCartToastConfig } from '../../added-to-cart-toast-config';

@Injectable({
  providedIn: 'root',
})
export class AddedToCartToastEnablerService {
  constructor(
    protected addedToCartToastConfig: AddedToCartToastConfig,
    protected launchDialogService: LaunchDialogService
  ) {}

  load(): void {
    if (this.addedToCartToastConfig.addedToCartToast?.enabled) {
      this.addUi();
    }
  }

  addUi(): void {
    this.launchDialogService.launch(LAUNCH_CALLER.ADDED_TO_CART_TOAST);
  }
}
