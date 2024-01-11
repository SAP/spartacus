/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { B2BUser } from '@spartacus/core';
import { OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, first, map } from 'rxjs/operators';
import { UserItemService } from '../../../../user/services/user-item.service';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';

@Injectable({
  providedIn: 'root',
})
export class UnitUserItemService extends UserItemService {
  save(
    form: UntypedFormGroup,
    key?: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    // we enable the orgUnit temporarily so that the underlying
    // save method can read the complete form.value.
    form.get('orgUnit')?.enable();
    return super.save(form, key);
  }

  /**
   * @override
   * Returns 'unitDetails'
   */
  protected getDetailsRoute(): string {
    return 'orgUnitUserList';
  }

  protected buildRouteParams(item: B2BUser) {
    return { uid: item.orgUnit?.uid };
  }

  protected unitRouteParam$ = this.routingService.getParams().pipe(
    map((params) => params[ROUTE_PARAMS.unitCode]),
    distinctUntilChanged()
  );

  // @override to default method
  launchDetails(item: B2BUser): void {
    this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
      this.routingService.go({
        cxRoute: this.getDetailsRoute(),
        params: { ...item, uid: unitCode },
      });
    });
  }
}
