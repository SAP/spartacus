/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { StoreFinderSearchComponent } from '../store-finder-search/store-finder-search.component';

@Component({
  selector: 'cx-store-finder-header',
  templateUrl: './store-finder-header.component.html',
  imports: [StoreFinderSearchComponent, TranslatePipe],
})
export class StoreFinderHeaderComponent {}
