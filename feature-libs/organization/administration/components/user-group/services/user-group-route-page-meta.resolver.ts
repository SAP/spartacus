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
import { UserGroup } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentUserGroupService } from './current-user-group.service';

@Injectable({ providedIn: 'root' })
export class UserGroupRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentUserGroupService
  ) {
    super(translation);
  }

  protected getParams(): Observable<UserGroup | undefined> {
    return this.currentItemService.item$;
  }
}
