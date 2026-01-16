/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@spartacus/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { ListService } from '../../../../shared/list/list.service';
import { SubListComponent } from '../../../../shared/sub-list/sub-list.component';
import { UnitAddressListService } from './unit-address-list.service';

@Component({
  selector: 'cx-org-unit-address-list',
  templateUrl: './unit-address-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UnitAddressListService,
    },
  ],
  imports: [SubListComponent, RouterLink, TranslatePipe],
})
export class UnitAddressListComponent {
  routerKey = ROUTE_PARAMS.addressCode;
}
