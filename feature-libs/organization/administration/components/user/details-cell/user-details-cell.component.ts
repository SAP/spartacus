/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from '../../shared';

@Component({
  selector: 'cx-org-user-details-cell',
  templateUrl: './user-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsCellComponent extends CellComponent {}
