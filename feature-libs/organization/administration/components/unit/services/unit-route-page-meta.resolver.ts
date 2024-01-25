/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  B2BUnit,
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUnitService } from './current-unit.service';

@Injectable({ providedIn: 'root' })
export class UnitRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentUnitService
  ) {
    super(translation);
  }

  protected getParams(): Observable<B2BUnit | undefined> {
    return this.currentItemService.item$;
  }
}
