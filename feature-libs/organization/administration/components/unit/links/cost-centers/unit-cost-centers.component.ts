/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit, I18nModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ListService } from '../../../shared/list/list.service';
import { CurrentUnitService } from '../../services/current-unit.service';
import { UnitCostCenterListService } from './unit-cost-centers.service';
import { AsyncPipe } from '@angular/common';
import { DisableInfoComponent } from '../../../shared/detail/disable-info/disable-info.component';
import { RouterLink } from '@angular/router';
import { SubListComponent } from '../../../shared/sub-list/sub-list.component';

@Component({
    selector: 'cx-org-unit-cost-centers',
    templateUrl: './unit-cost-centers.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'content-wrapper' },
    providers: [
        {
            provide: ListService,
            useExisting: UnitCostCenterListService,
        },
    ],
    standalone: true,
    imports: [
        SubListComponent,
        RouterLink,
        DisableInfoComponent,
        I18nModule,
        AsyncPipe,
    ],
})
export class UnitCostCenterListComponent {
  unit$: Observable<B2BUnit | undefined> = this.currentUnitService
    ? this.currentUnitService.item$
    : of({ active: true });

  constructor(protected currentUnitService: CurrentUnitService) {}
}
