/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { TranslationChunkService, TranslationService } from '@spartacus/core';
import { CmsComponentsService } from './cms-components.service';

@Injectable({
  providedIn: 'root',
})
export class CmsI18nService {
  protected cmsComponentsService = inject(CmsComponentsService);
  protected translation = inject(TranslationService);
  protected translationChunk = inject(TranslationChunkService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  loadForComponents(componentTypes: string[]) {
    const i18nKeys = this.cmsComponentsService.getI18nKeys(componentTypes);
    const i18nChunks = new Set<string>();
    for (const key of i18nKeys) {
      i18nChunks.add(this.translationChunk.getChunkNameForKey(key));
    }
    this.translation.loadChunks(Array.from(i18nChunks));
  }
}
