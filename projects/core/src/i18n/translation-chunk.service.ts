import { Injectable } from '@angular/core';
import { I18nConfig } from './config/i18n-config';

@Injectable()
export class TranslationChunkService {
  private chunks: object = {};
  constructor(protected config: I18nConfig) {
    Object.keys(config.i18n.chunks).forEach(chunk => {
      config.i18n.chunks[chunk].map(key => {
        if (this.chunks.hasOwnProperty(key)) {
          console.warn(`Duplicated key (${key}) in the i18n config file.`);
        }
        this.chunks[key] = chunk;
      });
    });
  }

  protected readonly KEY_SEPARATOR = '.';

  getChunkNameForKey(key: string): string {
    const mainKey = (key || '').split(this.KEY_SEPARATOR)[0];
    const chunk = this.chunks && this.chunks[mainKey];

    if (!chunk) {
      return mainKey; // fallback to main key as a chunk
    }
    return chunk;
  }
}
