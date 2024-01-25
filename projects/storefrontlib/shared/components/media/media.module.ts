/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MediaSourcesPipe } from './media-sources.pipe';
import { MediaComponent } from './media.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MediaComponent, MediaSourcesPipe],
  exports: [MediaComponent],
})
export class MediaModule {
  static forRoot(): ModuleWithProviders<MediaModule> {
    return {
      ngModule: MediaModule,
    };
  }
}
