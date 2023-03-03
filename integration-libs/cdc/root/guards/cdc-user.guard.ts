/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { GlobalMessageType } from '@spartacus/core';
import { UserGuard } from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class CdcUserGuard extends UserGuard implements CanActivate {
  canActivate(): boolean | UrlTree {
    this.globalMessageService.add(
      { key: 'organization.notification.notExist' },
      GlobalMessageType.MSG_TYPE_WARNING
    );
    return this.router.parseUrl(
      this.semanticPathService.get('organization') ?? ''
    );
  }
}
