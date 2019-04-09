import { Injectable } from '@angular/core';
import { I18nConfig } from './config/i18n-config';

@Injectable()
export class TranslationNamespaceService {
  constructor(protected config: I18nConfig) {}

  protected readonly KEY_SEPARATOR = '.';

  getNamespace(key: string): string {
    const mainKey = (key || '').split(this.KEY_SEPARATOR)[0];
    const namespace = this.getNamespaceFromMapping(mainKey);

    if (!namespace) {
      this.reportMissingNamespaceMapping(key, mainKey);
      return mainKey; // fallback to main key as a namespace
    }
    return namespace;
  }

  private getNamespaceFromMapping(mainKey: string): string {
    return (
      this.config.i18n &&
      this.config.i18n.namespaceMapping &&
      this.config.i18n.namespaceMapping[mainKey]
    );
  }

  private reportMissingNamespaceMapping(
    key: string,
    fallbackNamespace: string
  ) {
    if (!this.config.production) {
      console.warn(
        `No namespace mapping configured for key '${key}'. Used '${fallbackNamespace}' as fallback namespace.`
      );
    }
  }
}
