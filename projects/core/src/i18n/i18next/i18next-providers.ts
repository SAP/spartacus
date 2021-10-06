import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Optional, Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { LanguageService } from '../../site-context/facade/language.service';
import { SERVER_REQUEST_ORIGIN } from '../../util/ssr.tokens';
import { i18nextInit, SiteContextI18nextSynchronizer } from './i18next-init';
import { I18NEXT_INSTANCE } from './i18next-instance';

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
];
