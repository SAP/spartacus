import common from './en/common.en';
import { TranslationResources } from '@spartacus/core';

export const translations: TranslationResources = {
  en: {
    common,

    example: {
      greeting: 'Hi, {{name}}',
      categoryPage: {
        heading: '{{count}} result for {{query}}',
        heading_plural: '{{count}} results for {{query}}'
      }
    }
  }
};
