/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  Address,
  FeatureConfigService,
  isNotUndefined,
  RoutingService,
} from '@spartacus/core';
import {
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, first, map } from 'rxjs/operators';
import { ItemService } from '../../../../shared/item.service';
import { UnitAddressFormService } from '../form/unit-address-form.service';
import { CurrentUnitAddressService } from './current-unit-address.service';

@Injectable({
  providedIn: 'root',
})
export class UnitAddressItemService extends ItemService<Address> {
  // TODO (CXSPA-5630): Remove service in next major.
  protected featureConfigService = inject(FeatureConfigService, {
    optional: true,
  });

  constructor(
    protected currentItemService: CurrentUnitAddressService,
    protected routingService: RoutingService,
    protected formService: UnitAddressFormService,
    protected unitService: OrgUnitService
  ) {
    super(currentItemService, routingService, formService);
  }

  protected unitRouteParam$ = this.routingService.getParams().pipe(
    map((params) => params[ROUTE_PARAMS.unitCode]),
    distinctUntilChanged()
  );

  load(unitUid: string, addressId: string): Observable<Address> {
    return this.unitService
      .getAddress(unitUid, addressId)
      .pipe(filter(isNotUndefined));
  }

  update(
    addressCode: string,
    address: Address
  ): Observable<OrganizationItemStatus<Address>> {
    this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
      this.unitService.updateAddress(unitCode, addressCode, address);
    });
    return this.unitService.getAddressLoadingStatus(addressCode);
  }

  protected create(
    value: Address
  ): Observable<OrganizationItemStatus<Address>> {
    // TODO (CXSPA-5630): Remove feature flag in next major.
    if (
      this.featureConfigService?.isEnabled('fixMyCompanyUnitAddressCreation')
    ) {
      // Note: No id or code is provided when creating a new address so we
      // cannot store a value in the ngrx state to check that address to be
      // created via the loading state. That is why we need to assign some
      // temporary value to the id.
      value.id = 'new';
    }

    this.unitRouteParam$
      .pipe(first())
      .subscribe((unitCode) => this.unitService.createAddress(unitCode, value));
    return this.unitService.getAddressLoadingStatus(value.id ?? '');
  }

  protected getDetailsRoute(): string {
    return this.currentItemService.getDetailsRoute();
  }

  delete(
    addressId: string,
    unitUid: string
  ): Observable<OrganizationItemStatus<Address>> {
    this.launchList();
    this.unitService.deleteAddress(unitUid, addressId);
    return this.unitService.getAddressLoadingStatus(addressId);
  }

  launchDetails(item: Address): void {
    if (!item.id) {
      // since the ID is generated in the backend
      // we redirect to the list instead.
      this.launchList();
    } else {
      this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
        this.routingService.go({
          cxRoute: this.getDetailsRoute(),
          params: { ...item, uid: unitCode },
        });
      });
    }
  }

  protected launchList() {
    this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
      this.routingService.go({
        cxRoute: 'orgUnitAddressList',
        params: { uid: unitCode },
      });
    });
  }
}
