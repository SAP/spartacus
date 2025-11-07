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
import { B2BUserService } from '../services';

@Injectable()
export class UserGuard {
  protected globalMessageService = inject(GlobalMessageService);
  protected b2bUserService = inject(B2BUserService);
  protected semanticPathService = inject(SemanticPathService);
  protected router = inject(Router);


  canActivate(): boolean | UrlTree {
    const isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();
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
