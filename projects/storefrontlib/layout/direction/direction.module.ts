/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultDirectionConfig } from './config/default-direction.config';
import { DirectionService } from './direction.service';

export function initHtmlDirAttribute(
  directionService: DirectionService
): () => void {
  const result = () => {
    return directionService.initialize();
  };
  return result;
}

/**
 * Provides a configuration and APP_INITIALIZER to add the correct (language drive) html direction.
 */
@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initHtmlDirAttribute,
      deps: [DirectionService],
    },
    provideDefaultConfig(defaultDirectionConfig),
  ],
})
export class DirectionModule {}
