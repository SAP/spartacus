/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { UserGuard } from '@spartacus/organization/administration/core';
import { CdcB2BUserService } from '../../organization/administration/public_api';

@Injectable({
  providedIn: 'root',
})
export class CdcUserGuard extends UserGuard implements CanActivate {
  constructor(
    protected globalMessageService: GlobalMessageService,
    protected cdcb2bUserService: CdcB2BUserService,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {
    super(globalMessageService, cdcb2bUserService, semanticPathService, router);
  }

  canActivate(): boolean | UrlTree {
    const isUpdatingUserAllowed =
      this.cdcb2bUserService.isUpdatingUserAllowed();
    if (!isUpdatingUserAllowed) {
      this.globalMessageService.add(
        { key: 'organization.notification.notExist' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
      return this.router.parseUrl(
        this.semanticPathService.get('organization') ?? ''
      );
    }
    return isUpdatingUserAllowed;
  }
}
