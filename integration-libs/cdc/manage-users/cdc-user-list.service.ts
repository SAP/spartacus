/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  WindowRef,
} from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { UserListService } from '@spartacus/organization/administration/components';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CdcUserListService extends UserListService {
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
    this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
      if (cdcLoaded) {
        // get current organization ID using CDC Gigya SDK
        this.cdcJsService.getOrganizationContext().subscribe({
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
        });
      } else {
        // CDC Gigya SDK not loaded, show error to the user
        this.globalMessageService.add(
          {
            key: 'errorHandlers.scriptFailedToLoad',
          },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      }
    });
  }
  showLink(): boolean {
    return false;
  }
  getCreateButtonLabel(): string {
    return 'organization.manageUsers';
  }
}
