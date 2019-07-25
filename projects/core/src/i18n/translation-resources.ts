export interface TranslationResources {
  [lang: string]: {
    [chunkName: string]: {
      [key: string]: any;
    };
  };
}
