import { Injectable } from '@angular/core';
import { I18nConfig } from './config/i18n-config';

@Injectable()
export class TranslationChunkService {
  constructor(protected config: I18nConfig) {
    this.validateConfig(config);
  }

  protected readonly KEY_SEPARATOR = '.';

  getChunkNameForKey(key: string): string {
    const mainKey = (key || '').split(this.KEY_SEPARATOR)[0];
    const chunk = this.getChunkFromConfig(mainKey);

    if (!chunk) {
      return mainKey; // fallback to main key as a chunk
    }
    return chunk;
  }

  private getChunkFromConfig(mainKey: string): string {
    const config = this.config.i18n;
    return (
      config &&
      config.chunks &&
      Object.keys(config.chunks)
        .filter(chunk =>
          config.chunks[chunk].filter(key => key === mainKey).join()
        )
        .join()
    );
  }

  private validateConfig(config: I18nConfig): void {
    let allKeys = [];
    Object.keys(config.i18n.chunks).forEach(
      chunk => (allKeys = [...allKeys, ...config.i18n.chunks[chunk]])
    );
    const dupes = allKeys.filter((el, i) => allKeys.indexOf(el) !== i);
    if (dupes.length > 0 && !config.production) {
      console.warn(
        `There are duplicated keys (${dupes.join()}) in the i18n config file.`
      );
    }
  }
}
