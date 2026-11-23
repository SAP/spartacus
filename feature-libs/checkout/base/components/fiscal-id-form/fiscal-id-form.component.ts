/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutFiscalIdConfiguration,
  CheckoutFiscalIdFacade,
} from '@spartacus/checkout/base/root';
import {
  FeatureToggles,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  TranslatePipe,
} from '@spartacus/core';
import {
  FocusFirstInvalidFieldDirective,
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
} from '@spartacus/storefront';
import { Observable, Subscription, combineLatest, defer, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Component({
  selector: 'cx-fiscal-id-form',
  templateUrl: './fiscal-id-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    FormErrorsComponent,
    FormRequiredAsterisksComponent,
    FocusFirstInvalidFieldDirective,
  ],
})
export class FiscalIdFormComponent implements OnInit, OnDestroy {
  @Input() busy = false;

  @ViewChild(FocusFirstInvalidFieldDirective)
  protected firstInvalidFieldFocus?: FocusFirstInvalidFieldDirective;

  protected fiscalIdFacade = inject(CheckoutFiscalIdFacade);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected globalMessageService = inject(GlobalMessageService);
  private featureToggles = inject(FeatureToggles);
  protected changeDetectorRef = inject(ChangeDetectorRef);
  protected subscriptions = new Subscription();
  protected cartId?: string;
  protected loaded = false;

  configuration: CheckoutFiscalIdConfiguration = {
    enabled: false,
    required: false,
  };
  control = new FormControl('', { nonNullable: true });
  saving = false;

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest([
        this.fiscalIdFacade.getConfiguration(),
        this.activeCartFacade.getActive(),
      ]).subscribe(([configuration, cart]) => {
        this.configuration = configuration;
        this.loaded = true;
        const validators = [Validators.maxLength(255)];
        if (configuration.required) {
          validators.push(Validators.required);
        }
        this.control.setValidators(validators);

        const cartId = cart.code ?? cart.guid;
        const value =
          cart.sapCustomerFiscalId?.sapFiscalIdEntries?.[0]?.sapValue ?? '';
        if (this.cartId !== cartId) {
          this.cartId = cartId;
          this.control.reset(value, { emitEvent: false });
        } else if (this.control.pristine) {
          this.control.setValue(value, { emitEvent: false });
        }
        this.control.updateValueAndValidity({ emitEvent: false });
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  validate(): boolean {
    if (!this.loaded) {
      return false;
    }
    if (!this.configuration.enabled) {
      return true;
    }
    this.control.updateValueAndValidity();
    if (this.control.valid) {
      return true;
    }
    this.control.markAsTouched();
    this.globalMessageService.add(
      { key: 'formErrors.globalMessage' },
      GlobalMessageType.MSG_TYPE_ASSISTIVE
    );
    this.focusInvalidField();
    return false;
  }

  submit(): Observable<boolean> {
    return defer(() => {
      if (this.saving || !this.validate()) {
        return of(false);
      }
      this.saving = true;
      this.changeDetectorRef.markForCheck();
      return this.fiscalIdFacade.setFiscalId(this.control.value).pipe(
        map(() => {
          this.control.markAsPristine();
          return true;
        }),
        catchError((error: HttpErrorModel) => {
          const errors = error.details?.filter(
            (detail) =>
              detail.errorCode?.startsWith('fiscal.id.') ||
              detail.type === 'ValidationError'
          );
          if (errors?.length) {
            const message = errors
              .map((detail) => detail.message)
              .filter(Boolean)
              .join(' ');
            this.control.setErrors(
              message ? { fiscalId: { message } } : { invalid: true }
            );
            this.control.markAsTouched();
            this.focusInvalidField();
          }
          return of(false);
        }),
        finalize(() => {
          this.saving = false;
          this.changeDetectorRef.markForCheck();
        })
      );
    });
  }

  protected focusInvalidField(): void {
    this.changeDetectorRef.markForCheck();
    if (this.featureToggles.a11yImproveCheckoutFocus) {
      this.firstInvalidFieldFocus?.focusFirstInvalidField();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
