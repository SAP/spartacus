import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Optional, Provider } from '@angular/core';
import i18next, { i18n } from 'i18next';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { LanguageService } from '../../site-context/facade/language.service';
import { SERVER_REQUEST_ORIGIN } from '../../ssr/ssr.providers';
import { i18nextInit, SiteContextI18nextSynchronizer } from './i18next-init';
import { I18NEXT_INSTANCE } from './i18next-instance';

export function createI18nextInstance(): i18n {
  // the global `i18next` instance should be used once - only to create
  // a fresh i18next instance per application bootstrap
  return i18next.createInstance();
}

export const i18nextProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: i18nextInit,
    deps: [
      I18NEXT_INSTANCE,
      ConfigInitializerService,
      LanguageService,
      HttpClient,
      [new Optional(), SERVER_REQUEST_ORIGIN],
      SiteContextI18nextSynchronizer,
    ],
    multi: true,
  },
  {
    provide: I18NEXT_INSTANCE,
    useFactory: createI18nextInstance,
  },
];
