import { Provider } from '@angular/core';
import { BaseSiteInitializer } from '../services/base-site-initializer';
import { CurrencyInitializer } from '../services/currency-initializer';
import { LanguageInitializer } from '../services/language-initializer';
export declare function initializeCurrency(currencyInitializer: CurrencyInitializer): () => void;
export declare function initializeLanguage(languageInitializer: LanguageInitializer): () => void;
export declare function initializeBaseSite(baseSiteInitializer: BaseSiteInitializer): () => void;
export declare const contextInitializerProviders: Provider[];
