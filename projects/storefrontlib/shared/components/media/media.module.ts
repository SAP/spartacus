/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  inject,
} from '@angular/core';
import { MediaSourcesPipe } from './media-sources.pipe';
import { MediaComponent } from './media.component';
import { MediaService } from './media.service';

@NgModule({
  imports: [CommonModule],
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
          useFactory: () => {
            const mediaService = inject(MediaService);
            return () => mediaService.init();
          },
          multi: true,
        },
      ],
    };
  }
}
