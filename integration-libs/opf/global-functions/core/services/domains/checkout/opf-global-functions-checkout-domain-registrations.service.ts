/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, ViewContainerRef, inject } from '@angular/core';
import { OpfErrorDialogOptions } from '@spartacus/opf/base/root';
import { OpfRegisterGlobalFunctionsInput } from '@spartacus/opf/global-functions/root';
import { OpfPaymentGlobalMethods } from '@spartacus/opf/payment/root';
import { OpfGlobalFunctionsSharedRegistrationsService } from '../../opf-global-functions-shared-registrations.service';
import { OpfGlobalFunctionsCheckoutDomainService } from './opf-global-functions-checkout-domain.service';

@Injectable()
export class OpfGlobalFunctionsCheckoutDomainRegistrationsService {
  protected domainService = inject(OpfGlobalFunctionsCheckoutDomainService);
  protected sharedRegistrationsService = inject(
    OpfGlobalFunctionsSharedRegistrationsService
  );

  registerAll(
    container: OpfPaymentGlobalMethods,
    { paymentSessionId, vcr }: OpfRegisterGlobalFunctionsInput
  ): void {
    this.sharedRegistrationsService.registerSubmit(container, paymentSessionId, vcr);
    this.sharedRegistrationsService.registerSubmitComplete(
      container,
      paymentSessionId,
      vcr
    );
    this.registerThrowPaymentError(container, vcr);
    this.registerStartLoadIndicator(container, vcr);
    this.registerStopLoadIndicator(container);
    this.registerReinitiatePaymentForm(container);
    this.registerHandle3DSRedirect(container, paymentSessionId);
    this.sharedRegistrationsService.registerUpdatePaymentTransaction(
      container,
      (updatePaymentConfig) =>
        this.domainService.updatePaymentTransaction(updatePaymentConfig)
    );
  }

  protected registerStartLoadIndicator(
    container: OpfPaymentGlobalMethods,
    vcr?: ViewContainerRef
  ): void {
    container.startLoadIndicator = (): void =>
      this.domainService.startLoadIndicator(vcr);
  }

  protected registerStopLoadIndicator(container: OpfPaymentGlobalMethods): void {
    container.stopLoadIndicator = (): void => this.domainService.stopLoadIndicator();
  }

  protected registerThrowPaymentError(
    container: OpfPaymentGlobalMethods,
    vcr?: ViewContainerRef
  ): void {
    container.throwPaymentError = (
      opfErrorDialogOptions?: OpfErrorDialogOptions
    ): void => this.domainService.throwPaymentError(vcr, opfErrorDialogOptions);
  }

  protected registerReinitiatePaymentForm(container: OpfPaymentGlobalMethods): void {
    container.reinitiatePaymentForm = (paymentOptionId?: number) =>
      this.domainService.reinitiatePaymentForm(paymentOptionId);
  }

  protected registerHandle3DSRedirect(
    container: OpfPaymentGlobalMethods,
    paymentSessionId?: string
  ): void {
    container.handle3DSRedirect = (threeDsURL: string) =>
      this.domainService.handle3DSRedirect(threeDsURL, paymentSessionId);
  }
}

