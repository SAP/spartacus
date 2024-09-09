/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellComponent } from '../cell.component';
import { UrlModule, I18nModule } from '@spartacus/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgTemplateOutlet, NgFor } from '@angular/common';

@Component({
    selector: 'cx-org-roles-cell',
    templateUrl: './roles-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        NgTemplateOutlet,
        NgFor,
        UrlModule,
        I18nModule,
    ],
})
export class RolesCellComponent extends CellComponent {}
