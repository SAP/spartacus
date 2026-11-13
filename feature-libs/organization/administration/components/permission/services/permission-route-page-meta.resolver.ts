/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { DefaultRoutePageMetaResolver } from '@spartacus/core';
import { Permission } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentPermissionService } from './current-permission.service';

@Injectable({ providedIn: 'root' })
export class PermissionRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  protected currentItemService = inject(CurrentPermissionService);

  protected getParams(): Observable<Permission | undefined> {
    return this.currentItemService.item$;
  }
}
