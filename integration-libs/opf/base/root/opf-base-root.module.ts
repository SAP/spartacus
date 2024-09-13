/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOpfConfig } from './config/default-opf-config';
import { OpfEventModule } from './events/opf-event.module';
import { OpfMetadataStatePersistanceService } from './services';

export function opfStatePersistenceFactory(
  opfStatePersistenceService: OpfMetadataStatePersistanceService
): () => void {
  return () => opfStatePersistenceService.initSync();
}
@NgModule({
  imports: [OpfEventModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: opfStatePersistenceFactory,
      deps: [OpfMetadataStatePersistanceService],
      multi: true,
    },
    provideDefaultConfig(defaultOpfConfig),
  ],
})
export class OpfBaseRootModule {}
