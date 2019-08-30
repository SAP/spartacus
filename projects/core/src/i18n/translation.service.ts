import { Observable } from 'rxjs';

export abstract class TranslationService {
  /**
   * Translates given key with options.
   * If key is missing, it tries to load the chunk and emits a value when chunk is loaded.
   * If key is missing after loaded chunk, a fallback value is emitted
   *
   * @param key translation key
   * @param options values for interpolation in translation
   * @param whitespaceUntilLoaded if true, immediately emits a non-breaking space
   */
  translate: (
    key: string,
    options?: any,
    whitespaceUntilLoaded?: boolean
  ) => Observable<string>;

  /**
   * Loads chunks with translations
   *
   * @param chunkNames array of chunk names to be loaded
   */
  loadChunks: (chunkNames: string | string[]) => Promise<any>;
}
