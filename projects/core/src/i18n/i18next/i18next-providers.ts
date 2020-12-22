import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Optional, Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { LanguageService } from '../../site-context/facade/language.service';
import { SERVER_REQUEST_ORIGIN } from '../../util/ssr.tokens';
import { i18nextInit } from './i18next-init';

export const i18nextProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: i18nextInit,
    deps: [
      ConfigInitializerService,
      LanguageService,
      HttpClient,
      [new Optional(), SERVER_REQUEST_ORIGIN],
    ],
    multi: true,
  },
];
