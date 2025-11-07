/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { OrgUnitService } from '../services';

@Injectable()
export class OrgUnitGuard {
  protected globalMessageService = inject(GlobalMessageService);
  protected orgUnitService = inject(OrgUnitService);
  protected semanticPathService = inject(SemanticPathService);
  protected router = inject(Router);


  canActivate(): boolean | UrlTree {
    const isUpdatingUnitAllowed = this.orgUnitService.isUpdatingUnitAllowed();
    if (!isUpdatingUnitAllowed) {
      this.globalMessageService.add(
        { key: 'organization.notification.notExist' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
      return this.router.parseUrl(
        this.semanticPathService.get('organization') ?? ''
      );
    }
    return isUpdatingUnitAllowed;
  }
}
