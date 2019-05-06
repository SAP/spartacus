import { Injectable } from '@angular/core';
import { I18nConfig } from './config/i18n-config';

@Injectable()
export class TranslationChunkService {
  private duplicates: { [key: string]: string[] } = {};
  private chunks: { [key: string]: string } = {};
  constructor(protected config: I18nConfig) {
    Object.keys(config.i18n.chunks).forEach(chunk => {
      config.i18n.chunks[chunk].forEach(key => {
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
    if (Object.keys(this.duplicates).length > 0 && !this.config.production) {
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
    Object.keys(items).forEach(key => {
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
