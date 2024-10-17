/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveConfiguration } from '@spartacus/opf/base/root';
import { Observable } from 'rxjs';
import { OpfBaseAdapter } from './opf-base.adapter';

@Injectable()
export class OpfBaseConnector {
  constructor(protected adapter: OpfBaseAdapter) {}

  public getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    return this.adapter.getActiveConfigurations();
  }
}
