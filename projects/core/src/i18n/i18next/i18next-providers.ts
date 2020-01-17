import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { LanguageService } from '../../site-context/facade/language.service';
import { i18nextInit } from './i18next-init';

export const i18nextProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: i18nextInit,
    deps: [ConfigInitializerService, LanguageService, HttpClient],
    multi: true,
  },
];
