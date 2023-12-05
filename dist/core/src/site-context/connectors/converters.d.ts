import { InjectionToken } from '@angular/core';
import { Converter } from '../../util/converter.service';
import { BaseSite, Currency, Language } from '../../model/misc.model';
import { Country, Region } from '../../model/address.model';
export declare const LANGUAGE_NORMALIZER: InjectionToken<Converter<any, Language>>;
export declare const CURRENCY_NORMALIZER: InjectionToken<Converter<any, Currency>>;
export declare const COUNTRY_NORMALIZER: InjectionToken<Converter<any, Country>>;
export declare const REGION_NORMALIZER: InjectionToken<Converter<any, Region>>;
export declare const BASE_SITE_NORMALIZER: InjectionToken<Converter<any, BaseSite>>;
