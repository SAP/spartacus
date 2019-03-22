export interface TranslationResources {
  [lang: string]: {
    [namespace: string]: {
      [key: string]: any;
    };
  };
}
