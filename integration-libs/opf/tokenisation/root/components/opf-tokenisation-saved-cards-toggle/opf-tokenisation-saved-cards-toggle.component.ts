/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe, UserPaymentService } from '@spartacus/core';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import {
  ICON_TYPE,
  IconComponent,
  OutletContextData,
} from '@spartacus/storefront';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OpfSavedCardsToggleContext } from '../../model';
import {
  OpfTokenisationSavedCardsService,
  SAVED_CARDS_ID,
} from '../../services';

@Component({
  selector: 'cx-opf-tokenisation-saved-cards-toggle',
  standalone: true,
  templateUrl: './opf-tokenisation-saved-cards-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, IconComponent, AsyncPipe, TranslatePipe],
})
export class OpfTokenisationSavedCardsToggleComponent {
  protected outletContextData = inject<
    OutletContextData<OpfSavedCardsToggleContext>
  >(OutletContextData as any, { optional: true });

  protected savedCardsService = inject(OpfTokenisationSavedCardsService, {
    optional: true,
  });

  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected userPaymentService = inject(UserPaymentService);

  iconTypes = ICON_TYPE;

  readonly SAVED_CARDS_ID = SAVED_CARDS_ID;

  readonly context$ = combineLatest([
    this.outletContextData?.context$ ?? of({} as OpfSavedCardsToggleContext),
    this.userPaymentService.getPaymentMethods(),
  ]).pipe(
    map(([ctx, paymentMethods]) => ({
      ...ctx,
      hasSavedCards: Boolean(paymentMethods?.length),
    }))
  );

  /**
   * Whether the saved cards radio should be checked.
   * Reads selectedPaymentOptionId from the metadata store reactively.
   */
  readonly isSavedCardsChecked$: Observable<boolean> =
    this.opfMetadataStoreService
      .getOpfMetadataState()
      .pipe(map((state) => state.selectedPaymentOptionId === SAVED_CARDS_ID));

  onSavedCardsSelected(): void {
    this.savedCardsService?.selectSavedCards();
  }
}
