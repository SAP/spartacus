/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApplePaySessionFactory } from '../apple-pay-session/apple-pay-session.factory';
import { ApplePayObservableConfig } from './apple-pay-observable-config.interface';

@Injectable()
export class ApplePayObservableFactory {
  constructor(private applePaySessionFactory: ApplePaySessionFactory) {}

  make(
    config: ApplePayObservableConfig
  ): Observable<ApplePayJS.ApplePayPaymentAuthorizationResult> {
    if (this.applePaySessionFactory.supportsVersion(3)) {
      console.log('Supports version 3');
      return this.applePayObservableV3(config);
    }
    return throwError(new Error('Apple Pay not supported'));
  }

  protected applePayObservableV3(
    config: ApplePayObservableConfig
  ): Observable<ApplePayJS.ApplePayPaymentAuthorizationResult> {
    return new Observable<ApplePayJS.ApplePayPaymentAuthorizationResult>(
      (observer) => {
        let session: ApplePaySession;
        try {
          session = this.applePaySessionFactory.make(
            3,
            config.request
          ) as ApplePaySession;
          console.log('ApplePaySession created');
        } catch (err) {
          console.log('ApplePaySession creation error', err);
          observer.error(err);
          return;
        }

        const handleUnspecifiedError = (error: string): void => {
          console.log('Unspecified error occured', error);
          session.abort();
          observer.error(error);
        };

        session.addEventListener('validatemerchant', (event: Event) => {
          console.log('Validate merchant callback', event);
          config.validateMerchant(<any>event).subscribe((merchantSession) => {
            console.log('merchantSession', merchantSession);
            session.completeMerchantValidation(merchantSession);
          }, handleUnspecifiedError);
        });

        session.addEventListener('cancel', (event: Event) => {
          console.log('Cancel callback', event);
          observer.error('canceled payment');
        });

        if (config.paymentMethodSelected) {
          session.addEventListener('paymentmethodselected', (event: Event) => {
            console.log('Payment method selected callback');
            config
              .paymentMethodSelected(<any>event)
              .subscribe((paymentMethodUpdate) => {
                session.completePaymentMethodSelection(paymentMethodUpdate);
              }, handleUnspecifiedError);
          });
        }

        if (config.shippingContactSelected) {
          session.addEventListener(
            'shippingcontactselected',
            (event: Event) => {
              console.log('Shipping contact selected callback');
              config
                .shippingContactSelected(<any>event)
                .subscribe((shippingContactUpdate) => {
                  console.log('shippingContactUpdate', shippingContactUpdate);
                  session.completeShippingContactSelection(
                    shippingContactUpdate
                  );
                }, handleUnspecifiedError);
            }
          );
        }

        if (config.shippingMethodSelected) {
          session.addEventListener('shippingmethodselected', (event: Event) => {
            console.log('Shipping method selected callback');
            config
              .shippingMethodSelected(<any>event)
              .subscribe((shippingMethodUpdate) => {
                session.completeShippingMethodSelection(shippingMethodUpdate);
              }, handleUnspecifiedError);
          });
        }

        session.addEventListener('paymentauthorized', (event: Event) => {
          console.log('Payment authorized callback');
          config.paymentAuthorized(<any>event).subscribe({
            next: (authResult) => {
              session.completePayment(authResult);
              console.log('completePayment', authResult);
              if (!authResult.errors || !authResult.errors.length) {
                observer.next(authResult);
                observer.complete();
              } else {
                handleUnspecifiedError(authResult?.errors[0]?.message);
              }
            },
            error: handleUnspecifiedError,
          });
        });

        console.log('Begining ApplePay payment session');
        session.begin();
      }
    );
  }
}
