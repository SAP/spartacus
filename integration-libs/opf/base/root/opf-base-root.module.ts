/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { GlobalMessageService, provideDefaultConfig } from '@spartacus/core';
import { defaultOpfConfig } from './config/default-opf-config';
import { OpfEventModule } from './events/opf-event.module';
import {
  OpfGlobalMessageService,
  OpfMetadataStatePersistanceService,
} from './services';

export function opfStatePersistenceFactory(): () => void {
  const opfStatePersistenceService = inject(OpfMetadataStatePersistanceService);
  return () => opfStatePersistenceService.initSync();
}
@NgModule({
  imports: [OpfEventModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: opfStatePersistenceFactory,
      multi: true,
    },
    {
      provide: GlobalMessageService,
      useExisting: OpfGlobalMessageService,
    },
    provideDefaultConfig(defaultOpfConfig),
  ],
})
export class OpfBaseRootModule {}
