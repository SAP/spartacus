import { Injectable } from '@angular/core';
import { I18nConfig } from './config/i18n-config';

@Injectable()
export class TranslationChunkService {
  constructor(protected config: I18nConfig) {}

  protected readonly KEY_SEPARATOR = '.';

  getChunkNameForKey(key: string): string {
    const mainKey = (key || '').split(this.KEY_SEPARATOR)[0];
    const chunk = this.getChunkFromConfig(mainKey);

    if (!chunk) {
      this.reportMissingChunkConfig(mainKey);
      return mainKey; // fallback to main key as a chunk
    }
    return chunk;
  }

  private getChunkFromConfig(mainKey: string): string {
    return (
      this.config.i18n &&
      this.config.i18n.chunksMapping &&
      this.config.i18n.chunksMapping[mainKey]
    );
  }

  private reportMissingChunkConfig(mainKey: string) {
    if (!this.config.production) {
      console.warn(
        `No chunk configured for key '${mainKey}'. Used '${mainKey}' as fallback.`
      );
    }
  }
}
