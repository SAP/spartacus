/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { B2BUser, FeatureConfigService } from '@spartacus/core';
import { OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { UserItemService } from '../../../../user/services/user-item.service';

@Injectable({
  providedIn: 'root',
})
export class UnitUserItemService extends UserItemService {
  // TODO (CXSPA-5630): Remove service in next major.
  protected featureConfigService = inject(FeatureConfigService, {
    optional: true,
  });

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

  // @override to default method
  launchDetails(item: B2BUser): void {
    const cxRoute = this.getDetailsRoute();
    const params = this.buildRouteParams(item);
    if (cxRoute && item && Object.keys(item).length > 0) {
      this.routingService.go({ cxRoute, params });
    }
  }

  protected create(
    value: B2BUser
  ): Observable<OrganizationItemStatus<B2BUser>> {
    // TODO (CXSPA-5630): Remove call to super in feature flag in next major.
    if (!this.featureConfigService?.isEnabled('fixMyCompanyUnitUserCreation')) {
      return super.create(value);
    }

    // Note: No id or code is provided when creating a new user so we
    // cannot store a value in the ngrx state to check that user to be
    // created via the loading state. That is why we need to assign
    // some temporary value to the id.
    value.customerId = 'new';

    this.userService.create(value);

    return this.userService.getLoadingStatus(value.customerId ?? '');
  }
}
