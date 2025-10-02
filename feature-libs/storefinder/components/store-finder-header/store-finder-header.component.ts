/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { StoreFinderSearchComponent } from '../store-finder-search/store-finder-search.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-store-finder-header',
  templateUrl: './store-finder-header.component.html',
  imports: [StoreFinderSearchComponent, TranslatePipe, MockTranslatePipe],
})
export class StoreFinderHeaderComponent {}
