/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from '../../shared';
import { I18nModule, UrlModule } from '@spartacus/core';
import { PopoverModule } from '@spartacus/storefront';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'cx-org-user-group-details-cell',
    templateUrl: './user-group-details-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RouterLink,
        PopoverModule,
        I18nModule,
        UrlModule,
    ],
})
export class UserGroupDetailsCellComponent extends CellComponent {}
