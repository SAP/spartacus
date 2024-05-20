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
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  isNotNullable,
  NotificationPreference,
  NotificationType,
  OCC_USER_ID_ANONYMOUS,
  Product,
  TranslationService,
  UserIdService,
  UserInterestsService,
  UserNotificationPreferenceService,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';
import { LaunchDialogService, LAUNCH_CALLER } from '../../../layout/index';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-stock-notification',
  templateUrl: './stock-notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockNotificationComponent implements OnInit, OnDestroy {
  hasProductInterests$: Observable<boolean>;
  prefsEnabled$: Observable<boolean>;
  outOfStock$: Observable<boolean>;
  isRemoveInterestLoading$: Observable<boolean>;
  anonymous = true;

  private enabledPrefs: NotificationPreference[] = [];
  private productCode: string;
  private subscribeSuccess$: Observable<boolean>;
  private subscriptions = new Subscription();

  @ViewChild('element') element: ElementRef;

  constructor(
    private currentProductService: CurrentProductService,
    private globalMessageService: GlobalMessageService,
    private translationService: TranslationService,
    private interestsService: UserInterestsService,
    private notificationPrefService: UserNotificationPreferenceService,
    private userIdService: UserIdService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.outOfStock$ = combineLatest([
      this.currentProductService.getProduct().pipe(filter(isNotNullable)),
      this.userIdService.getUserId(),
    ]).pipe(
      tap(([product, userId]) => {
        this.productCode = product.code ?? '';
        if (userId !== OCC_USER_ID_ANONYMOUS) {
          this.anonymous = false;
          this.notificationPrefService.loadPreferences();
          this.interestsService.loadProductInterests(
            undefined,
            undefined,
            undefined,
            product.code,
            NotificationType.BACK_IN_STOCK
          );
        }
      }),
      map(
        ([product]: [Product, String]) =>
          !!product.stock && product.stock.stockLevelStatus === 'outOfStock'
      )
    );

    this.hasProductInterests$ = this.interestsService
      .getProductInterests()
      .pipe(
        map(
          (interests) => !!interests.results && interests.results.length === 1
        )
      );
    this.subscribeSuccess$ =
      this.interestsService.getAddProductInterestSuccess();
    this.isRemoveInterestLoading$ =
      this.interestsService.getRemoveProdutInterestLoading();
    this.prefsEnabled$ = this.notificationPrefService
      .getEnabledPreferences()
      .pipe(
        tap((prefs) => (this.enabledPrefs = prefs)),
        map((prefs) => prefs.length > 0)
      );

    this.subscriptions.add(
      this.interestsService.getAddProductInterestError().subscribe((error) => {
        if (error) {
          this.onInterestAddingError();
        }
      })
    );
    this.subscriptions.add(
      this.interestsService
        .getRemoveProdutInterestSuccess()
        .subscribe((success) => {
          if (success) {
            this.onInterestRemovingSuccess();
          }
        })
    );
  }

  subscribe() {
    this.openDialog();
    this.interestsService.addProductInterest(
      this.productCode,
      NotificationType.BACK_IN_STOCK
    );
  }

  unsubscribe() {
    this.interestsService.removeProdutInterest(
      {
        product: {
          code: this.productCode,
        },
        productInterestEntry: [
          {
            interestType: NotificationType.BACK_IN_STOCK,
          },
        ],
      },
      true
    );
  }

  private onInterestRemovingSuccess() {
    this.subscriptions.add(
      this.translationService
        .translate('stockNotification.unsubscribeSuccess')
        .pipe(first())
        .subscribe((text) =>
          this.globalMessageService.add(text, GlobalMessageType.MSG_TYPE_INFO)
        )
    );
    this.interestsService.resetRemoveInterestState();
  }

  private onInterestAddingError() {
    this.launchDialogService.closeDialog('Interests error');
    this.interestsService.resetAddInterestState();
  }

  private openDialog() {
    const modalInstanceData = {
      subscribeSuccess$: this.subscribeSuccess$,
      enabledPrefs: this.enabledPrefs,
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.STOCK_NOTIFICATION,
      this.element,
      this.vcr,
      modalInstanceData
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.interestsService.clearProductInterests();
    this.notificationPrefService.clearPreferences();
  }
}
