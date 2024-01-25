/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MODULE_INITIALIZER } from '@spartacus/core';
import { AsmConnector } from './connectors/asm.connector';
import { facadeProviders } from './facade/facade-providers';
import { AsmStatePersistenceService } from './services/asm-state-persistence.service';
import { AsmStoreModule } from './store/asm-store.module';

export function asmStatePersistenceFactory(
  asmStatePersistenceService: AsmStatePersistenceService
): () => void {
  const result = () => asmStatePersistenceService.initSync();
  return result;
}

@NgModule({
  imports: [CommonModule, AsmStoreModule],
  providers: [
    AsmConnector,
    {
      provide: MODULE_INITIALIZER,
      useFactory: asmStatePersistenceFactory,
      deps: [AsmStatePersistenceService],
      multi: true,
    },
    ...facadeProviders,
  ],
})
export class AsmCoreModule {}
