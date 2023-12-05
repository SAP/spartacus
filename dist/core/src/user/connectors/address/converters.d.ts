import { InjectionToken } from '@angular/core';
import { Address, AddressValidation } from '../../../model/address.model';
import { EntitiesModel } from '../../../model/misc.model';
import { Converter } from '../../../util/converter.service';
export declare const ADDRESS_NORMALIZER: InjectionToken<Converter<any, Address>>;
export declare const ADDRESS_LIST_NORMALIZER: InjectionToken<Converter<any, EntitiesModel<Address>>>;
export declare const ADDRESS_SERIALIZER: InjectionToken<Converter<Address, any>>;
export declare const ADDRESS_VALIDATION_NORMALIZER: InjectionToken<Converter<any, AddressValidation>>;
