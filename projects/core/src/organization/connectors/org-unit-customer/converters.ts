import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { EntitiesModel, OrgUnitCustomer } from '../../../model';

export const ORG_UNIT_CUSTOMER_NORMALIZER = new InjectionToken<
  Converter<any, OrgUnitCustomer>
>('OrgUnitCustomerNormalizer');
export const ORG_UNIT_CUSTOMERS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<OrgUnitCustomer>>
>('OrgUnitCustomerListNormalizer');
