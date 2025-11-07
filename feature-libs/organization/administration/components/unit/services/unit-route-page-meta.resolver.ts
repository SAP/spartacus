/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  B2BUnit,
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUnitService } from './current-unit.service';

@Injectable({ providedIn: 'root' })
export class UnitRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  protected currentItemService = inject(CurrentUnitService);

  constructor() {
    const translation = inject(TranslationService);

    super(translation);
  }

  protected getParams(): Observable<B2BUnit | undefined> {
    return this.currentItemService.item$;
  }
}
