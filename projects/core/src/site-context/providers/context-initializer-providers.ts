import { APP_INITIALIZER, Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { CurrencyStatePersistenceService } from '../services/currency-state-persistence.service';
import { LanguageInitializer } from '../services/language-initializer';

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
export function initializeLanguage(
  languageInitializer: LanguageInitializer,
  configInit: ConfigInitializerService
) {
  const result = async () => {
    await configInit.getStable('context').toPromise();
    await languageInitializer.initialize().toPromise();
  };
  return result;
}

export const contextInitializerProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeLanguage,
    deps: [LanguageInitializer, ConfigInitializerService],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: currencyStatePersistenceFactory,
    deps: [CurrencyStatePersistenceService, ConfigInitializerService],
    multi: true,
  },
];
