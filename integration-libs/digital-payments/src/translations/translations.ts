import { en } from './en/index';

interface TranslationResources {
  [lang: string]: {
    [chunkName: string]: {
      [key: string]: any;
    };
  };
}

export const dpTranslations: TranslationResources = {
  en,
};
