/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { GlobalMessageService, provideDefaultConfig } from '@spartacus/core';
import { defaultOpfConfig } from './config/default-opf-config';
import { OpfEventModule } from './events/opf-event.module';
import {
  OpfGlobalMessageService,
  OpfMetadataStatePersistanceService,
} from './services';

@NgModule({
  imports: [OpfEventModule],
  providers: [
    provideAppInitializer(() => {
      const opfStatePersistenceService = inject(
        OpfMetadataStatePersistanceService
      );
      opfStatePersistenceService.initSync();
    }),
    {
      provide: GlobalMessageService,
      useExisting: OpfGlobalMessageService,
    },
    provideDefaultConfig(defaultOpfConfig),
  ],
})
export class OpfBaseRootModule {}
