/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Customer360Facade,
  Customer360PromotionList,
  Customer360Type,
  Customer360Promotion,
} from '@spartacus/asm/customer-360/root';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { ActiveCartFacade } from '@spartacus/cart/base/root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-customer-360-promotion',
  templateUrl: './customer-360-promotion.component.html',
})
export class Customer360PromotionComponent implements OnInit, OnDestroy {
  showErrorAlert$ = new BehaviorSubject<boolean>(false);
  entries$ = new BehaviorSubject<Array<Customer360Promotion>>([]);
  subscription = new Subscription();
  userId: string;

  constructor(
    protected context: Customer360SectionContext<Customer360PromotionList>,
    protected customer360Facade: Customer360Facade,
    protected activeCartFacade: ActiveCartFacade
  ) {}

  ngOnInit(): void {
    this.showErrorAlert$.next(false);
    this.fetchPromotions();
    this.subscription.add(
      this.activeCartFacade.getActiveCartId().subscribe((cartId) => {
        if (cartId && this.entries$.value.length === 0) {
          this.refreshPromotions();
        }
      })
    );
  }

  public refreshPromotions(): void {
    this.customer360Facade
      .get360Data([
        {
          requestData: { type: Customer360Type.PROMOTION_LIST },
        },
      ])
      .pipe(
        map((response) => {
          const promotionList = response?.value?.find(
            (item) => item.type === Customer360Type.PROMOTION_LIST
          ) as Customer360PromotionList;
          const newEntries: Array<Customer360Promotion> = [];
          if (promotionList.promotions) {
            promotionList.promotions.forEach((promotion) => {
              newEntries.push({
                applied: promotion.applied,
                code: promotion.name || '',
                name: promotion.message,
              });
            });
          }
          return newEntries;
        }),
        catchError(() => {
          this.showErrorAlert$.next(true);
          return of([]);
        })
      )
      .subscribe((newEntries) => {
        this.entries$.next(newEntries);
      });
  }

  fetchPromotions() {
    this.context.data$
      .pipe(
        map((data) => {
          const entries: Array<Customer360Promotion> = [];
          data.promotions.forEach((promotion) => {
            entries.push({
              applied: promotion.applied,
              code: promotion.name || '',
              name: promotion.message,
            });
          });
          return entries;
        }),
        catchError(() => {
          this.showErrorAlert$.next(true);
          return of([]);
        })
      )
      .subscribe((newEntries) => {
        this.entries$.next(newEntries);
      });
  }

  closeErrorAlert(): void {
    this.showErrorAlert$.next(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
