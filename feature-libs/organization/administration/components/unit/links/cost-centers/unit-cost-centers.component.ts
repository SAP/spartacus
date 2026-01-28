/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { B2BUnit, TranslatePipe } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { DisableInfoComponent } from '../../../shared/detail/disable-info/disable-info.component';
import { ListService } from '../../../shared/list/list.service';
import { SubListComponent } from '../../../shared/sub-list/sub-list.component';
import { CurrentUnitService } from '../../services/current-unit.service';
import { UnitCostCenterListService } from './unit-cost-centers.service';

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
  imports: [
    SubListComponent,
    RouterLink,
    DisableInfoComponent,
    TranslatePipe,
    AsyncPipe,
  ],
})
export class UnitCostCenterListComponent {
  unit$: Observable<B2BUnit | undefined> = this.currentUnitService
    ? this.currentUnitService.item$
    : of({ active: true });

  constructor(protected currentUnitService: CurrentUnitService) {}
}
