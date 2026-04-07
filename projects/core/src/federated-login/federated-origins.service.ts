/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Config, WindowRef } from '@spartacus/core';
import { OriginMapService } from './origin-map.service';

@Injectable({ providedIn: 'root' })
export class FederatedOriginsService {
  windowRef = inject(WindowRef);
  config = inject(Config);

  originMapService = inject(OriginMapService);

  active = this.isActive();

  origin: string | undefined;

  setContext(context: string | null | undefined) {
    this.origin = this.originMapService.translateContext(context);
  }

  detectContext() {
    const context = new HttpParams({
      fromString: this.windowRef.location.search,
    }).get(this.originMapService.contextParameterName);

    this.setContext(context);
  }

  getOrigin() {
    return this.origin;
  }

  isActive() {
    return this.originMapService.loginOrigin.some(
      (origin) => origin === this.windowRef.location.host
    );
  }
}
