/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { OpfErrorDialogOptions } from '@spartacus/opf/base/root';
import { OpfRegisterGlobalFunctionsInput } from '@spartacus/opf/global-functions/root';
import { Address } from '@spartacus/core';
import { Cart, DeliveryMode } from '@spartacus/cart/base/root';
import {
  OpfPaymentConfig,
  OpfPaymentGlobalMethods,
  OpfPaymentSessionData,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';
import { OpfGlobalFunctionsSharedRegistrationsService } from '../../opf-global-functions-shared-registrations.service';
import { OpfGlobalFunctionsGlobalDomainService } from './opf-global-functions-global-domain.service';

@Injectable()
export class OpfGlobalFunctionsGlobalDomainRegistrationsService {
  protected domainService = inject(OpfGlobalFunctionsGlobalDomainService);
  protected sharedRegistrationsService = inject(
    OpfGlobalFunctionsSharedRegistrationsService
  );

  registerAll(
    container: OpfPaymentGlobalMethods,
    { paymentSessionId, vcr }: OpfRegisterGlobalFunctionsInput
  ): void {
    this.registerCtaScriptReady(container);
    this.registerGetCart(container);
    this.registerSetBillingAddress(container);
    this.registerGetBillingAddress(container);
    this.registerSetDeliveryAddress(container);
    this.registerGetDeliveryAddress(container);
    this.registerSetDeliveryMode(container);
    this.registerGetDeliveryMode(container);
    this.registerDeleteAddress(container);
    this.registerUpdateCartGuestUserEmail(container);
    this.registerCreateCartGuestUser(container);
    this.registerStartLoadIndicatorGlobal(container);
    this.registerStopLoadIndicatorGlobal(container);
    this.registerThrowPaymentErrorGlobal(container);
    this.registerInitiatePayment(container);
    this.sharedRegistrationsService.registerUpdatePaymentTransaction(
      container,
      (updatePaymentConfig) =>
        this.domainService.updatePaymentTransaction(updatePaymentConfig)
    );
    this.registerVerifyPayment(container);
    this.sharedRegistrationsService.registerSubmit(
      container,
      paymentSessionId,
      vcr
    );
    this.sharedRegistrationsService.registerSubmitComplete(
      container,
      paymentSessionId,
      vcr
    );
  }

  protected registerCtaScriptReady(container: OpfPaymentGlobalMethods): void {
    container.scriptReady = (scriptIdentifier: string): void =>
      this.domainService.scriptReady(scriptIdentifier);
  }

  protected registerGetCart(container: OpfPaymentGlobalMethods): void {
    container.getCart = (cartId?: string): Promise<Cart | undefined> =>
      this.domainService.getCart(cartId);
  }

  protected registerStartLoadIndicatorGlobal(
    container: OpfPaymentGlobalMethods
  ): void {
    container.startLoadIndicator = (): void =>
      this.domainService.startLoadIndicatorGlobal();
  }

  protected registerStopLoadIndicatorGlobal(
    container: OpfPaymentGlobalMethods
  ): void {
    container.stopLoadIndicator = (): void =>
      this.domainService.stopLoadIndicatorGlobal();
  }

  protected registerThrowPaymentErrorGlobal(
    container: OpfPaymentGlobalMethods
  ): void {
    container.throwPaymentError = (
      opfErrorDialogOptions?: OpfErrorDialogOptions
    ): void =>
      this.domainService.throwPaymentErrorGlobal(opfErrorDialogOptions);
  }

  protected registerInitiatePayment(container: OpfPaymentGlobalMethods): void {
    container.initiatePayment = (
      configurationIdOrPaymentConfig: string | number | OpfPaymentConfig
    ): Promise<OpfPaymentSessionData> =>
      this.domainService.initiatePayment(configurationIdOrPaymentConfig);
  }

  protected registerVerifyPayment(container: OpfPaymentGlobalMethods): void {
    container.verifyPayment = (
      paymentSessionId: string,
      paymentVerificationPayload: OpfPaymentVerificationPayload
    ): Promise<OpfPaymentVerificationResponse> =>
      this.domainService.verifyPayment(
        paymentSessionId,
        paymentVerificationPayload
      );
  }

  protected registerUpdateCartGuestUserEmail(
    container: OpfPaymentGlobalMethods
  ): void {
    container.updateCartGuestUserEmail = (email: string): Promise<boolean> =>
      this.domainService.updateCartGuestUserEmail(email);
  }

  protected registerCreateCartGuestUser(
    container: OpfPaymentGlobalMethods
  ): void {
    container.createCartGuestUser = (): Promise<boolean> =>
      this.domainService.createCartGuestUser();
  }

  protected registerSetBillingAddress(
    container: OpfPaymentGlobalMethods
  ): void {
    container.setBillingAddress = (address: Address): Promise<unknown> =>
      this.domainService.setBillingAddress(address);
  }

  protected registerSetDeliveryAddress(
    container: OpfPaymentGlobalMethods
  ): void {
    container.setDeliveryAddress = (address: Address): Promise<string> =>
      this.domainService.setDeliveryAddress(address);
  }

  protected registerGetBillingAddress(
    container: OpfPaymentGlobalMethods
  ): void {
    container.getBillingAddress = (): Promise<Address | undefined> =>
      this.domainService.getBillingAddress();
  }

  protected registerGetDeliveryAddress(
    container: OpfPaymentGlobalMethods
  ): void {
    container.getDeliveryAddress = (): Promise<Address | undefined> =>
      this.domainService.getDeliveryAddress();
  }

  protected registerSetDeliveryMode(container: OpfPaymentGlobalMethods): void {
    container.setDeliveryMode = (
      mode: string
    ): Promise<DeliveryMode | undefined> =>
      this.domainService.setDeliveryMode(mode);
  }

  protected registerGetDeliveryMode(container: OpfPaymentGlobalMethods): void {
    container.getDeliveryMode = (): Promise<DeliveryMode | undefined> =>
      this.domainService.getDeliveryMode();
  }

  protected registerDeleteAddress(container: OpfPaymentGlobalMethods): void {
    container.deleteAddress = (addressId: string): Promise<void> =>
      this.domainService.deleteAddress(addressId);
  }
}
