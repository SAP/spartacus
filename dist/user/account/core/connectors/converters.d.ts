import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
export declare const USER_ACCOUNT_NORMALIZER: InjectionToken<Converter<any, User>>;
export declare const USER_ACCOUNT_SERIALIZER: InjectionToken<Converter<User, any>>;
