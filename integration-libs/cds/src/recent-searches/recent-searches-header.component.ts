/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { FeatureDirective, TranslatePipe } from '@spartacus/core';
import {
  OutletContextData,
  SearchBoxRecentSearchesHeaderContext,
} from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'cx-recent-searches-header',
  templateUrl: './recent-searches-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, TranslatePipe, FeatureDirective],
})
export class RecentSearchesHeaderComponent {
  context$: Observable<SearchBoxRecentSearchesHeaderContext> =
    this.outletContext?.context$ ?? EMPTY;

  constructor(
    @Optional()
    protected outletContext: OutletContextData<SearchBoxRecentSearchesHeaderContext>
  ) {}
}
