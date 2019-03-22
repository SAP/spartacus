import { Observable } from 'rxjs';

export abstract class TranslationService {
  exists: (key: string, options?: any) => boolean;
  translate: (
    key: string,
    options?: any,
    whitespaceUntilLoaded?: boolean
  ) => Observable<string>;
  loadNamespaces: (namespaces: string | string[]) => Promise<any>;
}
