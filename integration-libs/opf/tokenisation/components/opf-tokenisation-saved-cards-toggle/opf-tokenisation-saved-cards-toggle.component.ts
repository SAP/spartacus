/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { OpfSavedCardsToggleContext } from '@spartacus/opf/tokenisation';
import {
  ICON_TYPE,
  IconComponent,
  OutletContextData,
} from '@spartacus/storefront';
import { of } from 'rxjs';

@Component({
  selector: 'cx-opf-tokenisation-saved-cards-toggle',
  templateUrl: './opf-tokenisation-saved-cards-toggle.component.html',
  imports: [AsyncPipe, NgIf, IconComponent, TranslatePipe],
})
export class OpfTokenisationSavedCardsToggleComponent {
  protected outletContextData = inject<
    OutletContextData<OpfSavedCardsToggleContext>
  >(OutletContextData as any, { optional: true });

  iconTypes = ICON_TYPE;

  readonly context$ =
    this.outletContextData?.context$ ?? of({} as OpfSavedCardsToggleContext);
}
