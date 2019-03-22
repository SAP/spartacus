import { Injectable } from '@angular/core';
import i18next from 'i18next';

@Injectable()
export class I18nextService {
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
}
