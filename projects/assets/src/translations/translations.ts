import { en } from './en/index';
import { zh } from './zh/index';

interface TranslationResources {
  [lang: string]: {
    [chunkName: string]: {
      [key: string]: any;
    };
  };
}

export const translations: TranslationResources = {
  en,
  zh,
};
