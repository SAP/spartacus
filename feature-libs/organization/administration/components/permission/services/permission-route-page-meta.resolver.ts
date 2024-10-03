/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Permission } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentPermissionService } from './current-permission.service';

@Injectable({ providedIn: 'root' })
export class PermissionRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentPermissionService
  ) {
    super(translation);
  }

  protected getParams(): Observable<Permission | undefined> {
    return this.currentItemService.item$;
  }
}
