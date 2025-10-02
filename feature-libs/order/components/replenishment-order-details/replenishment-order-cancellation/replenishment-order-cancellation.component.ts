/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ReplenishmentOrder,
  ReplenishmentOrderHistoryFacade,
} from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { BtnLikeLinkDirective } from '../../../../../projects/storefrontlib/layout/a11y/btn-like-link/btn-like-link.directive';
import { RouterLink } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { UrlPipe } from '../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-replenishment-order-cancellation',
    templateUrl: './replenishment-order-cancellation.component.html',
    imports: [
        BtnLikeLinkDirective,
        RouterLink,
        NgIf,
        AsyncPipe,
        TranslatePipe,
        UrlPipe,
        MockTranslatePipe,
    ],
})
export class ReplenishmentOrderCancellationComponent implements OnDestroy {
  @ViewChild('element') element: ElementRef;

  private subscription = new Subscription();

  replenishmentOrder$: Observable<ReplenishmentOrder> =
    this.replenishmentOrderHistoryFacade.getReplenishmentOrderDetails();

  constructor(
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  openDialog() {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.REPLENISHMENT_ORDER,
      this.element,
      this.vcr
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.replenishmentOrderHistoryFacade.clearReplenishmentOrderDetails();
  }
}
