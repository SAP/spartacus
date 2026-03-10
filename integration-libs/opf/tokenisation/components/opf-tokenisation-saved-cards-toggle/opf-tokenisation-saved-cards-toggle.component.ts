/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ICON_TYPE,
  IconComponent,
  OutletContextData,
} from '@spartacus/storefront';
import { of } from 'rxjs';

export interface OpfSavedCardsToggleContext {
  savedPaymentHeading?: string | null;
  savedCardsHeading?: string | null;
  selectedPaymentId?: number;
  savedCardsId?: number;
  disabled?: boolean | null;
  savedCardsSelected?: () => void;
}

@Component({
  selector: 'cx-opf-tokenisation-saved-cards-toggle',
  templateUrl: './opf-tokenisation-saved-cards-toggle.component.html',
  imports: [NgIf, NgTemplateOutlet, IconComponent],
})
export class OpfTokenisationSavedCardsToggleComponent {
  protected outletContextData = inject<
    OutletContextData<OpfSavedCardsToggleContext>
  >(OutletContextData as any, { optional: true });

  iconTypes = ICON_TYPE;

  readonly context$ =
    this.outletContextData?.context$ ?? of({} as OpfSavedCardsToggleContext);
}
