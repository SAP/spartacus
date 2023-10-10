/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveConfiguration } from '@spartacus/opf/base/root';

import { Observable } from 'rxjs';
import { OpfConfigurationAdapter } from './opf-configuration.adapter';

@Injectable()
export class OpfConfigurationConnector {
  constructor(protected adapter: OpfConfigurationAdapter) {}

  public getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    return this.adapter.getActiveConfigurations();
  }
}
