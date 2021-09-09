import { Injectable } from '@angular/core';
import {
  LAUNCH_CALLER,
  LaunchDialogService,
} from 'projects/storefrontlib/layout/launch-dialog';
import { CartToastConfig } from './cart-toast-config';

@Injectable({
  providedIn: 'root',
})
export class CartToastEnablerService {
  constructor(
    protected cartToastConfig: CartToastConfig,
    protected launchDialogService: LaunchDialogService
  ) {}

  load(): void {
    if (this.cartToastConfig.cartToast?.enabled) {
      this.addUi();
    }
  }

  addUi(): void {
    this.launchDialogService.launch(LAUNCH_CALLER.CART_TOAST);
  }
}
