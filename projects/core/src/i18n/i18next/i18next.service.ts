import { Injectable } from '@angular/core';
import i18next from 'i18next';

@Injectable()
export class I18NextService {
  constructor() {}

  exists(key: string, options: any = {}): boolean {
    return i18next.exists.call(i18next, key, options);
  }

  t(key: string, options: any = {}): string {
    return i18next.t.call(i18next, key, options);
  }

  loadNamespaces(
    namespaces: string | string[],
    callback?: Function
  ): Promise<any> {
    return i18next.loadNamespaces.call(i18next, namespaces, callback);
  }

  on(event: 'languageChanged', callback: (lng: string) => void): void {
    i18next.on.call(i18next, event, callback);
  }
}
