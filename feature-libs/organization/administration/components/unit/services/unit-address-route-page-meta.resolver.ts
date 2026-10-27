/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Address, DefaultRoutePageMetaResolver } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUnitAddressService } from '../links/addresses/services/current-unit-address.service';

@Injectable({ providedIn: 'root' })
export class UnitAddressRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  protected currentItemService = inject(CurrentUnitAddressService);

  protected getParams(): Observable<Address | undefined> {
    return this.currentItemService.item$;
  }
}
