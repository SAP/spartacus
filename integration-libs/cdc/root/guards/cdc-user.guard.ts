/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalMessageService, SemanticPathService } from '@spartacus/core';
import { UserGuard } from '@spartacus/organization/administration/core';
import { CdcB2BUserService } from '../../organization/administration/public_api';

@Injectable({
  providedIn: 'root',
})
export class CdcUserGuard extends UserGuard {
  constructor(
    protected globalMessageService: GlobalMessageService,
    protected cdcB2bUserService: CdcB2BUserService,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {
    super(globalMessageService, cdcB2bUserService, semanticPathService, router);
  }
}
