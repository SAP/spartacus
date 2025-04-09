import { inject, Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  PageContext,
  PageType,
  RoutingService,
} from '@spartacus/core';
import {
  PUNCHOUT_ERROR_PAGE_URL,
  PUNCHOUT_INSPECT_PAGE_URL,
  PUNCHOUT_REQUISITION_PAGE_URL,
  PUNCHOUT_SESSION_PAGE_URL,
  PunchOutOperation,
} from '@spartacus/punchout/root';
import { Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { PunchoutAuthService } from './punchout-auth.service';

@Injectable()
export class PunchoutNavigationGuardService {
  protected punchoutAuthService = inject(PunchoutAuthService);
  protected routingService = inject(RoutingService);
  protected globalMessageService = inject(GlobalMessageService);
  protected subscription: Subscription;

  protected punchoutPages: PageContext[] = [
    { id: PUNCHOUT_SESSION_PAGE_URL, type: PageType.CONTENT_PAGE },
    { id: PUNCHOUT_ERROR_PAGE_URL, type: PageType.CONTENT_PAGE },
    { id: PUNCHOUT_REQUISITION_PAGE_URL, type: PageType.CONTENT_PAGE },
  ];
  protected pagesAllowListForEdit: PageContext[] = [
    { id: '__HOMEPAGE__', type: PageType.CONTENT_PAGE },
    { id: '/my-account/quick-order', type: PageType.CONTENT_PAGE },
    { id: '/contact', type: PageType.CONTENT_PAGE },
    { id: '/cart', type: PageType.CONTENT_PAGE },
    { id: '*', type: PageType.CATEGORY_PAGE },
    { id: '*', type: PageType.PRODUCT_PAGE },
    ...this.punchoutPages,
  ];
  protected pagesAllowListForInspect: PageContext[] = [
    { id: PUNCHOUT_INSPECT_PAGE_URL, type: PageType.CONTENT_PAGE },
    ...this.punchoutPages,
  ];

  start(punchoutOperation: PunchOutOperation): void {
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
        switchMap(() => this.routingService.getPageContext()),
        filter((incomingPageContext: PageContext) => {
          const pagesAllowList =
            punchoutOperation === PunchOutOperation.INSPECT
              ? this.pagesAllowListForInspect
              : this.pagesAllowListForEdit;
          return (
            isPunchoutSessionActive &&
            !!incomingPageContext?.type &&
            pagesAllowList.findIndex((pc: PageContext) => {
              return (
                pc.type === incomingPageContext.type &&
                (pc.id === '*' || pc.id === incomingPageContext.id)
              );
            }) === -1
          );
        })
      )
      .subscribe({
        next: () => {
          this.globalMessageService.add(
            {
              key: 'organization.notification.noSufficientPermissions',
            },
            GlobalMessageType.MSG_TYPE_WARNING
          );
          const redirectPage =
            punchoutOperation === PunchOutOperation.INSPECT
              ? PUNCHOUT_INSPECT_PAGE_URL
              : '/';

          this.routingService.go(redirectPage);
        },
      });
  }

  stop(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
