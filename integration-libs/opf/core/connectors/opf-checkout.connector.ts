/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveConfiguration } from '@spartacus/opf/root';
import { Observable } from 'rxjs';
import { OpfAdapter } from './opf.adapter';

@Injectable()
export class OpfCheckoutConnector {
  constructor(protected adapter: OpfAdapter) {}

  public getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    return this.adapter.getActiveConfigurations();
  }
}
