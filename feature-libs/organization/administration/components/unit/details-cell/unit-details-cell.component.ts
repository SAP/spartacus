/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from '../../shared';

@Component({
  selector: 'cx-org-unit-details-cell',
  templateUrl: './unit-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitDetailsCellComponent extends CellComponent {}
