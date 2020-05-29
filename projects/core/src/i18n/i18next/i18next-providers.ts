import { APP_INITIALIZER, Provider } from '@angular/core';
import { TranslationService } from '../translation.service';
import { I18nextInitializer } from './i18next-init';
import { I18nextTranslationService } from './i18next-translation.service';

export function initializeI18next(
  i18nextInitializer: I18nextInitializer
): () => Promise<any> {
  const result = () => i18nextInitializer.init();
  return result;
}

export const i18nextProviders: Provider[] = [
  {
    provide: TranslationService,
    useExisting: I18nextTranslationService,
  },

  {
    provide: APP_INITIALIZER,
    useFactory: initializeI18next,
    deps: [I18nextInitializer],
    multi: true,
  },
];
