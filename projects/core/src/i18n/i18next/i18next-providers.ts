import { Provider, APP_INITIALIZER } from '@angular/core';
import { I18NConfig } from '../config/i18n-config';
import { LanguageService } from '../../site-context/facade/language.service';
import { i18NextInit } from './i18next-init';
import { I18NextService } from './i18next.service';

export const i18nextProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: i18NextInit,
    deps: [I18NConfig, LanguageService],
    multi: true
  },
  I18NextService
];
