import { InjectionToken } from '@angular/core';
import { Converter, B2BUser, EntitiesModel } from '@spartacus/core';
export declare const B2B_USER_NORMALIZER: InjectionToken<Converter<any, B2BUser>>;
export declare const B2B_USER_SERIALIZER: InjectionToken<Converter<B2BUser, any>>;
export declare const B2B_USERS_NORMALIZER: InjectionToken<Converter<any, EntitiesModel<B2BUser>>>;
