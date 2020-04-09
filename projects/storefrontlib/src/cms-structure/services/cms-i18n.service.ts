import { Injectable } from '@angular/core';
import { TranslationChunkService, TranslationService } from '@spartacus/core';
import { CmsMappingService } from './cms-mapping.service';

/**
 * Please don't put that service in public API.
 * */
@Injectable({
  providedIn: 'root',
})
export class CmsI18nService {
  constructor(
    private cmsMapping: CmsMappingService,
    private translation: TranslationService,
    private translationChunk: TranslationChunkService
  ) {}

  loadForComponents(componentTypes: string[]) {
    const i18nKeys = this.cmsMapping.getI18nKeysForComponents(componentTypes);
    const i18nChunks = new Set<string>();
    for (const key of i18nKeys) {
      i18nChunks.add(this.translationChunk.getChunkNameForKey(key));
    }
    this.translation.loadChunks(Array.from(i18nChunks));
  }
}
