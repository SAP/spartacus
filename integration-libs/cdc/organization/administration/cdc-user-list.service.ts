/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  Translatable,
  WindowRef,
} from '@spartacus/core';
import {
  CreateButtonType,
  UserListService,
} from '@spartacus/organization/administration/components';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CdcUserListService extends UserListService implements OnDestroy {
  constructor(
    protected tableService: TableService,
    protected userService: B2BUserService,
    protected globalMessageService: GlobalMessageService,
    protected winRef: WindowRef,
    protected cdcJsService: CdcJsService
  ) {
    super(tableService, userService);
  }
  protected subscription: Subscription = new Subscription();

  onCreateButtonClick(): void {
    // get current organization ID using CDC Gigya SDK
    const sub = this.cdcJsService
      .getOrganizationContext()
      .pipe(
        tap({
          next: (response) => {
            if (response.orgId) {
              // open new screen to create/edit users using CDC Gigya SDK
              this.cdcJsService.openDelegatedAdminLogin(response.orgId);
            } else {
              this.globalMessageService.add(
                {
                  key: 'generalErrors.pageFailure',
                },
                GlobalMessageType.MSG_TYPE_ERROR
              );
            }
          },
          error: () =>
            this.globalMessageService.add(
              {
                key: 'generalErrors.pageFailure',
              },
              GlobalMessageType.MSG_TYPE_ERROR
            ),
        })
      )
      .subscribe();
    this.subscription.add(sub);
  }
  getCreateButtonType(): CreateButtonType {
    return CreateButtonType.BUTTON;
  }
  getCreateButtonLabel(): Translatable {
    return { key: 'organization.manageUsers' };
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
