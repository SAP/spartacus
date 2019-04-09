import { Provider, APP_INITIALIZER } from '@angular/core';
import { I18nConfig } from '../config/i18n-config';
import { LanguageService } from '../../site-context/facade/language.service';
import { i18nextInit } from './i18next-init';

export const i18nextProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: i18nextInit,
    deps: [I18nConfig, LanguageService],
    multi: true,
  },
];
