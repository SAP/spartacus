import { Provider } from '@angular/core';
import { CurrencyStatePersistenceService } from '../../site-context/services/currency-state-persistence.service';
import { LanguageStatePersistenceService } from '../../site-context/services/language-state-persistence.service';
import { HybridStorefrontCurrencyStatePersistenceService } from '../services/hybrid-storefront-currency-state-persistence.service';
import { HybridStorefrontLanguageStatePersistenceService } from '../services/hybrid-storefront-language-state-persistence.service';

export const hybridInitializerProviders: Provider[] = [
  {
    provide: LanguageStatePersistenceService,
    useClass: HybridStorefrontLanguageStatePersistenceService,
  },
  {
    provide: CurrencyStatePersistenceService,
    useClass: HybridStorefrontCurrencyStatePersistenceService,
  },
];
