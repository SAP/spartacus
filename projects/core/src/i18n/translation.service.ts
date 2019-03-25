import { Observable } from 'rxjs';

export abstract class TranslationService {
  /**
   * Translates given key with options.
   * If key is missing, it tries to load the namespace and emits a value when namespace is loaded.
   * If key is missing after loaded namespace, a fallback value is emitted
   *
   * @param key translation key with preceding namespace
   * @param options values for interpolation in translation
   * @param whitespaceUntilLoaded if true, immediately emits a non-breaking space
   */
  translate: (
    key: string,
    options?: any,
    whitespaceUntilLoaded?: boolean
  ) => Observable<string>;

  /**
   * Loads namespaces
   *
   * @param namespaces array of namespaces to be loaded
   */
  loadNamespaces: (namespaces: string | string[]) => Promise<any>;
}
