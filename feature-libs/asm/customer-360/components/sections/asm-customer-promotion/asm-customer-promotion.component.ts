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
} from '@spartacus/asm/customer-360/root';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  of,
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { PromotionEntry } from './asm-customer-promotion.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-promotion',
  templateUrl: './asm-customer-promotion.component.html',
})
export class AsmCustomerPromotionComponent implements OnInit, OnDestroy {
  showErrorAlert$ = new BehaviorSubject<boolean>(false);
  showErrorAlertForApplyAction$ = new BehaviorSubject<boolean>(false);
  entries$: Observable<Array<PromotionEntry>>;
  subscription = new Subscription();

  constructor(
    protected context: Customer360SectionContext<Customer360PromotionList>,
    protected customer360Facade: Customer360Facade
 ) {}

  ngOnInit(): void {
    this.showErrorAlert$.next(false);
    this.showErrorAlertForApplyAction$.next(false);
    this.fetchPromotions();
  }

    get errorAlert$(): Observable<boolean> {
      return this.showErrorAlert$.asObservable();
    }

    fetchPromotions() {
      this.entries$ = combineLatest([this.context.data$]).pipe(
        map(([data]) => {
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
      );
    }

    closeErrorAlert(): void {
      this.showErrorAlert$.next(false);
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}
