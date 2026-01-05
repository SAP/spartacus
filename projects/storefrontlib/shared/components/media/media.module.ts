/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { FeaturesConfigModule } from '@spartacus/core';
import { MediaSourcesPipe } from './media-sources.pipe';
import { MediaComponent } from './media.component';
import { MediaPreconnectService } from '../../../cms-structure';

export function mediaPreconnectInitializer(
  mediaPreconnectService: MediaPreconnectService
): () => void {
  return () => mediaPreconnectService.addPreconnectLink();
}

@NgModule({
  imports: [CommonModule, FeaturesConfigModule],
  declarations: [MediaComponent, MediaSourcesPipe],
  exports: [MediaComponent],
})
export class MediaModule {
  static forRoot(): ModuleWithProviders<MediaModule> {
    return {
      ngModule: MediaModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: mediaPreconnectInitializer,
          deps: [MediaPreconnectService],
          multi: true,
        },
      ],
    };
  }
}
