/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoreFinderHeaderComponent } from '../store-finder-header/store-finder-header.component';

@Component({
  selector: 'cx-store-finder',
  templateUrl: './store-finder.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [StoreFinderHeaderComponent, RouterOutlet],
})
export class StoreFinderComponent {}
