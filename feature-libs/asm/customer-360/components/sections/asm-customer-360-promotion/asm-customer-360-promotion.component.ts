/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  AsmCustomer360Facade,
  AsmCustomer360PromotionList,
  AsmCustomer360Type,
  AsmCustomer360Promotion,
} from '@spartacus/asm/customer-360/root';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { ActiveCartFacade } from '@spartacus/cart/base/root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360-promotion',
  templateUrl: './asm-customer-360-promotion.component.html',
})
export class AsmCustomer360PromotionComponent implements OnInit, OnDestroy {
  showErrorAlert$ = new BehaviorSubject<boolean>(false);
  entries$ = new BehaviorSubject<Array<AsmCustomer360Promotion>>([]);
  subscription = new Subscription();
  userId: string;

  constructor(
    protected context: AsmCustomer360SectionContext<AsmCustomer360PromotionList>,
    protected asmCustomer360Facade: AsmCustomer360Facade,
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
    this.asmCustomer360Facade
      .get360Data([
        {
          requestData: { type: AsmCustomer360Type.PROMOTION_LIST },
        },
      ])
      .pipe(
        map((response) => {
          const promotionList = response?.value?.find(
            (item) => item.type === AsmCustomer360Type.PROMOTION_LIST
          ) as AsmCustomer360PromotionList;
          const newEntries: Array<AsmCustomer360Promotion> = [];
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
          const entries: Array<AsmCustomer360Promotion> = [];
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
