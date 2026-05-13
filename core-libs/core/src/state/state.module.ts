/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { stateMetaReducers } from './reducers';

@NgModule({})
export class StateModule {
  static forRoot(): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
      providers: [...stateMetaReducers],
    };
  }
}
