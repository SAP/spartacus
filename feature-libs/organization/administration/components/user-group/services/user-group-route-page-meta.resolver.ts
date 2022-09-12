/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@commerce-storefront-toolset/core';
import { UserGroup } from '@commerce-storefront-toolset/organization/administration/core';
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
