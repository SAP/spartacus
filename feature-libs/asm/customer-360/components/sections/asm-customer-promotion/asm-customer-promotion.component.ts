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
} from '@spartacus/asm/customer-360/root';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  of,
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { PromotionEntry } from './asm-customer-promotion.model';
import { ActiveCartFacade } from '@spartacus/cart/base/root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-promotion',
  templateUrl: './asm-customer-promotion.component.html',
})
export class AsmCustomerPromotionComponent implements OnInit, OnDestroy {
  showErrorAlert$ = new BehaviorSubject<boolean>(false);
  showErrorAlertForApplyAction$ = new BehaviorSubject<boolean>(false);
  entries$= new BehaviorSubject<Array<PromotionEntry>>([]);
  subscription = new Subscription();
  userId: string;

  constructor(
    protected context: Customer360SectionContext<Customer360PromotionList>,
    protected customer360Facade: Customer360Facade,
    protected activeCartFacade: ActiveCartFacade,
 ) {}

  ngOnInit(): void {
    this.showErrorAlert$.next(false);
    this.showErrorAlertForApplyAction$.next(false);
    this.fetchPromotions();
    this.subscription.add(
      this.activeCartFacade.getActiveCartId().subscribe((cart)=>{
        if(cart){
          this.refreshComponent();
        }
      })
    );
  }

  public refreshComponent(): void {
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
          const newEntries: Array<PromotionEntry> = [];
          if (promotionList.promotions) {
            promotionList.promotions.forEach((promotion) => {
              newEntries.push({
                applied: promotion.applied ,
                code: promotion.name,
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
      ).subscribe((newEntries) => {
        this.entries$.next(newEntries);
      });
  }

    get errorAlert$(): Observable<boolean> {
      return this.showErrorAlert$.asObservable();
    }

    fetchPromotions() {
      this.context.data$.pipe(
        map((data) => {
          let entries: Array<PromotionEntry> = [];
          data.promotions.forEach((promotion) => {
            entries.push({
              ...promotion,
              applied: promotion.applied ,
              code: promotion.name,
              name: promotion.message,
            });
          });
          return entries;
        }),
        catchError(() => {
          this.showErrorAlert$.next(true);
          return of([]);
        })
      ).subscribe((newEntries) => {
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
