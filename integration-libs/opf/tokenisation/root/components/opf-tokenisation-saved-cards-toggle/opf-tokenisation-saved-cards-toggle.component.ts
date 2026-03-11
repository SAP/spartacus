/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import {
  ICON_TYPE,
  IconComponent,
  OutletContextData,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfSavedCardsToggleContext } from '../../model';

@Component({
  selector: 'cx-opf-tokenisation-saved-cards-toggle',
  standalone: true,
  templateUrl: './opf-tokenisation-saved-cards-toggle.component.html',
  imports: [NgIf, IconComponent, AsyncPipe, TranslatePipe],
})
export class OpfTokenisationSavedCardsToggleComponent {
  protected outletContextData = inject<
    OutletContextData<OpfSavedCardsToggleContext>
  >(OutletContextData as any, { optional: true });

  iconTypes = ICON_TYPE;

  readonly context$ =
    this.outletContextData?.context$ ?? of({} as OpfSavedCardsToggleContext);
}
