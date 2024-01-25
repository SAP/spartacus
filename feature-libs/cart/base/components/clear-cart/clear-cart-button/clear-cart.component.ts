/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-clear-cart',
  templateUrl: './clear-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearCartComponent implements OnDestroy {
  cart$: Observable<Cart> = this.activeCartFacade.getActive();

  protected subscription = new Subscription();

  @ViewChild('element') element: ElementRef;

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  openDialog(event: Event): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CLEAR_CART,
      this.element,
      this.vcr
    );
    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
    event.stopPropagation();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
