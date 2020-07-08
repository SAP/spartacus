import { Injectable, isDevMode } from '@angular/core';
import { I18nConfig } from './config/i18n-config';

@Injectable({
  providedIn: 'root',
})
export class TranslationChunkService {
  protected duplicates: { [key: string]: string[] } = {};
  protected chunks: { [key: string]: string } = {};
  constructor(protected config: I18nConfig) {
    const chunks = (config.i18n && config.i18n.chunks) || {};
    Object.keys(chunks).forEach((chunk) => {
      chunks[chunk].forEach((key) => {
        if (this.chunks.hasOwnProperty(key)) {
          if (!this.duplicates[key]) {
            this.duplicates[key] = [this.chunks[key]];
          }
          this.duplicates[key].push(chunk);
        } else {
          this.chunks[key] = chunk;
        }
      });
    });
    if (Object.keys(this.duplicates).length > 0 && isDevMode()) {
      this.warnDuplicates(this.duplicates);
    }
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

  private warnDuplicates(items: { [key: string]: string[] }): void {
    const dupes: string[] = [];
    Object.keys(items).forEach((key) => {
      dupes.push(
        `* '${key}' found in chunks: ${items[key].join(', ')}. Used '${
          this.chunks[key]
        }.${key}'.`
      );
    });
    console.warn(
      `Duplicated keys has been found in the config of i18n chunks:\n${dupes.join(
        '\n'
      )}`
    );
  }
}
