/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CheckoutStep, CheckoutStepState } from '@spartacus/checkout/base/root';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CurrencyService, LanguageService } from '@spartacus/core';

@Component({
  selector: 'cx-checkout-progress',
  templateUrl: './checkout-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CheckoutProgressComponent implements OnInit {
  params$ = new Observable<string[]>();
  private _steps$: BehaviorSubject<CheckoutStep[]> =
    this.checkoutStepService.steps$;
  private currencyService = inject(CurrencyService);
  private languageService = inject(LanguageService);

  constructor(protected checkoutStepService: CheckoutStepService) {}

  activeStepIndex: number;
  activeStepIndex$: Observable<number> =
    this.checkoutStepService.activeStepIndex$.pipe(
      tap((index) => (this.activeStepIndex = index))
    );

  get steps$(): Observable<CheckoutStep[]> {
    return this._steps$.asObservable();
  }

  ngOnInit(): void {
    this.params$ = combineLatest([
      this.currencyService.getActive(),
      this.languageService.getActive(),
    ]).pipe(map(([currency, language]) => [currency, language]));
  }

  getTabIndex(stepIndex: number): number {
    return !this.isActive(stepIndex) && !this.isDisabled(stepIndex) ? 0 : -1;
  }

  isActive(index: number): boolean {
    return index === this.activeStepIndex;
  }

  isDisabled(index: number): boolean {
    return index > this.activeStepIndex;
  }

  getStepState(index: number): CheckoutStepState {
    if (this.isDisabled(index)) {
      return CheckoutStepState.DISABLED;
    }
    if (this.isActive(index)) {
      return CheckoutStepState.SELECTED;
    }
    return CheckoutStepState.COMPLETED;
  }
}
