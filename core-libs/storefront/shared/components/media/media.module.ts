/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, inject, ModuleWithProviders, NgModule } from '@angular/core';
import { ENVIRONMENT, FeaturesConfigModule, provideDefaultConfigFactory } from '@spartacus/core';
import { MediaPreconnectService } from '../../../cms-structure';
import { MediaSourcesPipe } from './media-sources.pipe';
import { MediaComponent } from './media.component';

export function mediaPreconnectInitializer(
  mediaPreconnectService: MediaPreconnectService
): () => void {
  return () => mediaPreconnectService.addPreconnectLink();
}

@NgModule({
  imports: [
    CommonModule,
    FeaturesConfigModule,
    MediaComponent,
    MediaSourcesPipe,
  ],
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
        provideDefaultConfigFactory(() => {
          const env = inject(ENVIRONMENT, { optional: true }) ?? {};
          return env['MEDIA_BASE_URL']
            ? { backend: { media: { baseUrl: env['MEDIA_BASE_URL'] } } }
            : {};
        }),
      ],
    };
  }
}
