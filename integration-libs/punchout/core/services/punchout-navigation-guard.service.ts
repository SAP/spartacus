/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  CmsService,
  GlobalMessageService,
  GlobalMessageType,
  Page,
  RoutingService,
} from '@spartacus/core';
import { PunchOutOperation } from '@spartacus/punchout/root';
import { Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { PunchoutAuthService } from './punchout-auth.service';

@Injectable()
export class PunchoutNavigationGuardService {
  protected punchoutAuthService = inject(PunchoutAuthService);
  protected routingService = inject(RoutingService);
  protected globalMessageService = inject(GlobalMessageService);
  protected subscription: Subscription;
  protected cmsService = inject(CmsService);

  protected readonly punchoutPageIds: string[] = [
    'PunchoutSessionPage',
    'PunchoutRequisitionPage',
    'PunchoutErrorPage',
  ];
  protected readonly pagesIdsAllowListForEdit: string[] = [
    'quickOrderPage',
    'productDetails',
    'homepage',
    'productList',
    'cartPage',
    ...this.punchoutPageIds,
  ];
  protected readonly pagesIdsAllowListForInspect: string[] = [
    'PunchoutInspectPage',
    ...this.punchoutPageIds,
  ];

  protected readonly allowPagesList: {
    [key: string]: { pageIds: string[]; redirectUrl: string };
  } = {
    [PunchOutOperation.INSPECT]: {
      pageIds: this.pagesIdsAllowListForInspect,
      redirectUrl: 'PUNCHOUT_INSPECT_PAGE_URL',
    },
    [PunchOutOperation.EDIT]: {
      pageIds: this.pagesIdsAllowListForEdit,
      redirectUrl: '/',
    },
    [PunchOutOperation.CREATE]: {
      pageIds: this.pagesIdsAllowListForEdit,
      redirectUrl: '/',
    },
  };

  start(punchoutOperation: PunchOutOperation): void {
    console.log(punchoutOperation);
    if (this.subscription) {
      return;
    }
    let isPunchoutSessionActive = false;
    this.subscription = this.punchoutAuthService
      .isPunchoutSessionActive()
      .pipe(
        tap((isActive) => {
          isPunchoutSessionActive = isActive;
        }),
        filter((isActive) => isActive),
        switchMap(() => this.cmsService.getCurrentPage()),
        filter((page: Page) => {
          return (
            isPunchoutSessionActive &&
            !!page?.pageId &&
            !this.allowPagesList[punchoutOperation].pageIds.includes(
              page.pageId
            )
          );
        })
      )
      .subscribe({
        next: () => {
          this.routingService.go(
            this.allowPagesList[punchoutOperation].redirectUrl
          );
          this.globalMessageService.add(
            {
              key: 'organization.notification.noSufficientPermissions',
            },
            GlobalMessageType.MSG_TYPE_WARNING
          );
        },
      });
  }

  stop(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
