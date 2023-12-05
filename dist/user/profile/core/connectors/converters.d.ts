import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Title, UserSignUp } from '@spartacus/user/profile/root';
export declare const USER_PROFILE_NORMALIZER: InjectionToken<Converter<User, any>>;
export declare const USER_PROFILE_SERIALIZER: InjectionToken<Converter<User, any>>;
export declare const USER_SERIALIZER: InjectionToken<Converter<User, any>>;
export declare const USER_SIGN_UP_SERIALIZER: InjectionToken<Converter<UserSignUp, any>>;
export declare const TITLE_NORMALIZER: InjectionToken<Converter<any, Title>>;
