import { APP_INITIALIZER, Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { CurrencyStatePersistenceService } from '../services/currency-state-persistence.service';
import { LanguageStatePersistenceService } from '../services/language-state-persistence.service';

export function currencyStatePersistenceFactory(
  currencyPersistenceService: CurrencyStatePersistenceService,
  configInit: ConfigInitializerService
) {
  const result = () =>
    configInit.getStableConfig('context').then(() => {
      currencyPersistenceService.initSync();
    });
  return result;
}
export function languageStatePersistenceFactory(
  languagePersistenceService: LanguageStatePersistenceService,
  configInit: ConfigInitializerService
) {
  const result = () =>
    configInit
      .getStableConfig('context')
      .then(() => languagePersistenceService.initSync());
  return result;
}

export const contextPersistenceProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: languageStatePersistenceFactory,
    deps: [LanguageStatePersistenceService, ConfigInitializerService],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: currencyStatePersistenceFactory,
    deps: [CurrencyStatePersistenceService, ConfigInitializerService],
    multi: true,
  },
];
