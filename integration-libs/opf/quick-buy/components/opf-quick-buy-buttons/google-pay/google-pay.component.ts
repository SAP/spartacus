/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { OpfActiveConfiguration } from '@spartacus/opf/base/root';
import { OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER } from '../../../root/model/constants';
import { OpfQuickBuySingleProductTransactionService } from '../../../core/services/context/opf-quick-buy-single-product-transaction.service';
import { BehaviorSubject } from 'rxjs';
import { OpfGooglePayService } from './google-pay.service';

@Component({
  selector: 'cx-opf-google-pay',
  templateUrl: './google-pay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe],
})
export class OpfGooglePayComponent implements OnInit {
  protected opfGooglePayService = inject(OpfGooglePayService);
  protected changeDetectionRef = inject(ChangeDetectorRef);
  protected singleProductTransactionService = inject(
    OpfQuickBuySingleProductTransactionService
  );

  debugMessage = '';

  @Input() activeConfiguration:
    | OpfActiveConfiguration
    | OpfActiveConfiguration[];

  @ViewChild('googlePayButtonContainer') googlePayButtonContainer: ElementRef;

  isReadyToPayState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  ngOnInit(): void {
    const activeConfigurations = Array.isArray(this.activeConfiguration)
      ? this.activeConfiguration
      : [this.activeConfiguration];
    this.opfGooglePayService.loadResources().then(() => {
      this.opfGooglePayService.initClient(activeConfigurations);
      this.opfGooglePayService.isReadyToPay().then((response: any) => {
        this.isReadyToPayState$.next(!!response?.result);
        this.changeDetectionRef.detectChanges();
        if (response.result && this.googlePayButtonContainer) {
          this.opfGooglePayService.renderPaymentButton(
            this.googlePayButtonContainer
          );
        }
      });
    });
  }

  testCreateSingleProductCart(): void {
    this.singleProductTransactionService.createSingleProductCart().subscribe({
      next: (cart) => {
        this.setDebugMessage(
          `createSingleProductCart OK: ${cart.code}, entries: ${cart.entries?.length ?? 0}`
        );
      },
      error: (error) => {
        this.setDebugMessage(`createSingleProductCart error: ${error}`);
      },
    });
  }

  testGetTransactionDeliveryType(): void {
    this.singleProductTransactionService.getTransactionDeliveryType().subscribe({
      next: (deliveryType) => {
        this.setDebugMessage(`getTransactionDeliveryType: ${deliveryType}`);
      },
      error: (error) => {
        this.setDebugMessage(`getTransactionDeliveryType error: ${error}`);
      },
    });
  }

  testGetTransactionDeliveryInfo(): void {
    this.singleProductTransactionService.getTransactionDeliveryInfo().subscribe({
      next: (deliveryInfo) => {
        this.setDebugMessage(
          `getTransactionDeliveryInfo: ${JSON.stringify(deliveryInfo)}`
        );
      },
      error: (error) => {
        this.setDebugMessage(`getTransactionDeliveryInfo error: ${error}`);
      },
    });
  }

  testCheckStableCart(): void {
    this.singleProductTransactionService.checkStableCart().subscribe({
      next: (isStable) => {
        this.setDebugMessage(`checkStableCart: ${isStable}`);
      },
      error: (error) => {
        this.setDebugMessage(`checkStableCart error: ${error}`);
      },
    });
  }

  testGetSupportedDeliveryModes(): void {
    this.singleProductTransactionService.getSupportedDeliveryModes().subscribe({
      next: (deliveryModes) => {
        this.setDebugMessage(
          `getSupportedDeliveryModes: ${JSON.stringify(deliveryModes)}`
        );
      },
      error: (error) => {
        this.setDebugMessage(`getSupportedDeliveryModes error: ${error}`);
      },
    });
  }

  testSetDeliveryAddress(): void {
    this.singleProductTransactionService
      .setDeliveryAddress({
        firstName: OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER,
        lastName: OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER,
        line1: 'Mock Street 1',
        town: 'Mock Town',
        postalCode: '12345',
        country: { isocode: 'US' },
      })
      .subscribe({
        next: (addressId) => {
          this.setDebugMessage(`setDeliveryAddress: ${addressId}`);
        },
        error: (error) => {
          this.setDebugMessage(`setDeliveryAddress error: ${error}`);
        },
      });
  }

  testSetBillingAddress(): void {
    this.singleProductTransactionService
      .setBillingAddress({
        firstName: OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER,
        lastName: OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER,
        line1: 'Mock Billing Street 1',
        town: 'Mock Town',
        postalCode: '12345',
        country: { isocode: 'US' },
      })
      .subscribe({
        next: (success) => {
          this.setDebugMessage(`setBillingAddress: ${success}`);
        },
        error: (error) => {
          this.setDebugMessage(`setBillingAddress error: ${error}`);
        },
      });
  }

  testGetDeliveryAddress(): void {
    this.singleProductTransactionService.getDeliveryAddress().subscribe({
      next: (address) => {
        this.setDebugMessage(
          `getDeliveryAddress: ${JSON.stringify(address ?? null)}`
        );
      },
      error: (error) => {
        this.setDebugMessage(`getDeliveryAddress error: ${error}`);
      },
    });
  }

  testGetCurrentCart(): void {
    this.singleProductTransactionService.getCurrentCart().subscribe({
      next: (cart) => {
        this.setDebugMessage(`getCurrentCart: ${cart.code}`);
      },
      error: (error) => {
        this.setDebugMessage(`getCurrentCart error: ${error}`);
      },
    });
  }

  testGetCurrentCartId(): void {
    this.singleProductTransactionService.getCurrentCartId().subscribe({
      next: (cartId) => {
        this.setDebugMessage(`getCurrentCartId: ${cartId}`);
      },
      error: (error) => {
        this.setDebugMessage(`getCurrentCartId error: ${error}`);
      },
    });
  }

  testGetCurrentCartTotalPrice(): void {
    this.singleProductTransactionService.getCurrentCartTotalPrice().subscribe({
      next: (totalPrice) => {
        this.setDebugMessage(`getCurrentCartTotalPrice: ${totalPrice}`);
      },
      error: (error) => {
        this.setDebugMessage(`getCurrentCartTotalPrice error: ${error}`);
      },
    });
  }

  testSetDeliveryMode(): void {
    this.singleProductTransactionService.setDeliveryMode('express').subscribe({
      next: (deliveryMode) => {
        this.setDebugMessage(
          `setDeliveryMode: ${JSON.stringify(deliveryMode)}`
        );
      },
      error: (error) => {
        this.setDebugMessage(`setDeliveryMode error: ${error}`);
      },
    });
  }

  testGetSelectedDeliveryMode(): void {
    this.singleProductTransactionService.getSelectedDeliveryMode().subscribe({
      next: (deliveryMode) => {
        this.setDebugMessage(
          `getSelectedDeliveryMode: ${JSON.stringify(deliveryMode)}`
        );
      },
      error: (error) => {
        this.setDebugMessage(`getSelectedDeliveryMode error: ${error}`);
      },
    });
  }

  protected setDebugMessage(message: string): void {
    this.debugMessage = message;
    this.changeDetectionRef.detectChanges();
  }
}
