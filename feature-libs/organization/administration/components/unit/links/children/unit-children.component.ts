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
import { UnitChildrenService } from './unit-children.service';
import { AsyncPipe } from '@angular/common';
import { DisableInfoComponent } from '../../../shared/detail/disable-info/disable-info.component';
import { RouterLink } from '@angular/router';
import { SubListComponent } from '../../../shared/sub-list/sub-list.component';

@Component({
    selector: 'cx-org-unit-children',
    templateUrl: './unit-children.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'content-wrapper' },
    providers: [
        {
            provide: ListService,
            useExisting: UnitChildrenService,
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
export class UnitChildrenComponent {
  unit$: Observable<B2BUnit | undefined> = this.currentUnitService
    ? this.currentUnitService.item$
    : of({ active: true });

  constructor(protected currentUnitService: CurrentUnitService) {}
}
