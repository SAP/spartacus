/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ListService } from '../../../shared/list/list.service';
import { CurrentUnitService } from '../../services/current-unit.service';
import { UnitChildrenService } from './unit-children.service';
import { SubListComponent } from '../../../shared/sub-list/sub-list.component';
import { RouterLink } from '@angular/router';
import { DisableInfoComponent } from '../../../shared/detail/disable-info/disable-info.component';
import { TranslatePipe } from '../../../../../../../projects/core/src/i18n/translate.pipe';
import { AsyncPipe } from '@angular/common';
import { MockTranslatePipe } from '../../../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

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
    imports: [
        SubListComponent,
        RouterLink,
        DisableInfoComponent,
        TranslatePipe,
        AsyncPipe,
        MockTranslatePipe,
    ],
})
export class UnitChildrenComponent {
  unit$: Observable<B2BUnit | undefined> = this.currentUnitService
    ? this.currentUnitService.item$
    : of({ active: true });

  constructor(protected currentUnitService: CurrentUnitService) {}
}
