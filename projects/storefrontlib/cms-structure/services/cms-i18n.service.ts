import { Injectable } from '@angular/core';
import { TranslationChunkService, TranslationService } from '@spartacus/core';
import { CmsComponentsService } from './cms-components.service';

@Injectable({
  providedIn: 'root',
})
export class CmsI18nService {
  constructor(
    protected cmsComponentsService: CmsComponentsService,
    protected translation: TranslationService,
    protected translationChunk: TranslationChunkService
  ) {}

  loadForComponents(componentTypes: string[]) {
    const i18nKeys = this.cmsComponentsService.getI18nKeys(componentTypes);
    const i18nChunks = new Set<string>();
    for (const key of i18nKeys) {
      i18nChunks.add(this.translationChunk.getChunkNameForKey(key));
    }
    this.translation.loadChunks(Array.from(i18nChunks));
  }
}
