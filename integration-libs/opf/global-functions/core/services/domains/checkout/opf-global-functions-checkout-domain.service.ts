/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ComponentRef,
  Injectable,
  NgZone,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { RoutingService, WindowRef } from '@spartacus/core';
import {
  OpfErrorDialogOptions,
  OpfMetadataModel,
  OpfPage,
  defaultOpfErrorDialogOptions,
} from '@spartacus/opf/base/root';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import {
  OpfPaymentEventsService,
  OpfPaymentSessionData,
  OpfPaymentUpdateConfig,
} from '@spartacus/opf/payment/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { OpfGlobalFunctionsSharedService } from '../../opf-global-functions-shared.service';

@Injectable()
export class OpfGlobalFunctionsCheckoutDomainService {
  protected winRef = inject(WindowRef);
  protected ngZone = inject(NgZone);
  protected launchDialogService = inject(LaunchDialogService);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected opfPaymentEventsService = inject(OpfPaymentEventsService);
  protected routingService = inject(RoutingService);
  protected sharedService = inject(OpfGlobalFunctionsSharedService);

  protected loaderSpinnerCpntRef: void | Observable<
    ComponentRef<any> | undefined
  >;

  startLoadIndicator(vcr?: ViewContainerRef): void {
    if (!vcr) {
      return;
    }
    this.ngZone.run(() => {
      if (this.loaderSpinnerCpntRef) {
        this.sharedService.stopLoaderSpinner(this.loaderSpinnerCpntRef);
      }
      this.loaderSpinnerCpntRef = this.sharedService.startLoaderSpinner(vcr);
    });
  }

  stopLoadIndicator(): void {
    this.ngZone.run(() => {
      this.sharedService.stopLoaderSpinner(this.loaderSpinnerCpntRef);
    });
  }

  throwPaymentError(
    vcr?: ViewContainerRef,
    opfErrorDialogOptions: OpfErrorDialogOptions = defaultOpfErrorDialogOptions
  ): void {
    if (!vcr) {
      return;
    }
    this.ngZone.run(() => {
      const dialog = this.launchDialogService.openDialog(
        LAUNCH_CALLER.OPF_ERROR,
        undefined,
        vcr,
        opfErrorDialogOptions
      );

      if (dialog) {
        dialog.pipe(take(1)).subscribe();
      }
    });
  }

  reinitiatePaymentForm(paymentOptionId?: number): Promise<boolean> {
    return this.ngZone.run(() => {
      this.opfPaymentEventsService.emitReinitiatePaymentEvent(paymentOptionId);
      return Promise.resolve(true);
    });
  }

  handle3DSRedirect(threeDsURL: string, paymentSessionId?: string): Promise<void> {
    return this.ngZone.run(() => {
      const finalPaymentSessionId =
        this.sharedService.requirePaymentSessionId(paymentSessionId);

      if (!threeDsURL) {
        return Promise.reject(new Error('threeDsURL is required'));
      }

      const returnPath = this.routingService.getFullUrl({
        cxRoute: OpfPage.RESULT_PAGE,
      });

      this.opfMetadataStoreService.updateOpfMetadata({
        opfPaymentSessionId: finalPaymentSessionId,
        is3DSRedirect: true,
        opf3DSRedirectReturnPath: returnPath,
      });

      if (this.winRef.nativeWindow) {
        this.winRef.nativeWindow.location.href = threeDsURL;
      }
      return Promise.resolve();
    });
  }

  updatePaymentTransaction(
    updatePaymentConfig: OpfPaymentUpdateConfig
  ): Promise<OpfPaymentSessionData> {
    return this.sharedService.updatePaymentTransaction(updatePaymentConfig);
  }

  protected getPaymentOptionId(providedId?: number): Observable<number> {
    if (providedId) {
      return of(providedId);
    }

    return this.opfMetadataStoreService.getOpfMetadataState().pipe(
      take(1),
      switchMap((metadata: OpfMetadataModel) => {
        const storedId =
          metadata.selectedPaymentOptionId ??
          metadata.defaultSelectedPaymentOptionId;

        return storedId
          ? of(storedId)
          : throwError(() => new Error('No payment option ID found in storage'));
      })
    );
  }
}
