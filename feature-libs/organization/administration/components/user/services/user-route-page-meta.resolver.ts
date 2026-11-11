/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { B2BUser, DefaultRoutePageMetaResolver } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUserService } from './current-user.service';

@Injectable({ providedIn: 'root' })
export class UserRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  protected currentItemService = inject(CurrentUserService);

  protected getParams(): Observable<B2BUser | undefined> {
    return this.currentItemService.item$;
  }
}
