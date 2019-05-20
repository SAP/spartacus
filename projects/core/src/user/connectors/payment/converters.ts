import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Country } from '../../../model/address.model';

export const COUNTRY_NORMALIZER = new InjectionToken<Converter<any, Country>>(
  'CountryNormalizer'
);
