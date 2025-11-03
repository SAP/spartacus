/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Address, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { CurrentItemService } from '../../../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUnitAddressService extends CurrentItemService<Address> {
  protected routingService: RoutingService;
  protected unitService = inject(OrgUnitService);

  // override item$ as we need to use the unit code as well
  readonly item$: Observable<Address | undefined> = this.b2bUnit$.pipe(
    filter((unitUid) => Boolean(unitUid)),
    switchMap((unitUid) =>
      this.key$.pipe(switchMap((code: string) => this.getItem(unitUid, code)))
    )
  );

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const routingService = inject(RoutingService);

    super(routingService);
  
    this.routingService = routingService;
  }

  getDetailsRoute(): string {
    return 'orgUnitAddressDetails';
  }

  protected getParamKey() {
    return ROUTE_PARAMS.addressCode;
  }

  protected getItem(
    unitUid: string,
    addressId: string
  ): Observable<Address | undefined> {
    return addressId
      ? this.unitService.getAddress(unitUid, addressId)
      : of(undefined);
  }

  getError(code: string): Observable<boolean> {
    return this.unitService.getErrorState(code);
  }
}
