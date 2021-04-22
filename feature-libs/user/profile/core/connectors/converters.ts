import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import {
  NotificationPreference,
  Title,
  UserSignUp,
} from '@spartacus/user/profile/root';

export const USER_PROFILE_NORMALIZER = new InjectionToken<Converter<User, any>>(
  'UserProfileNormalizer'
);

export const USER_PROFILE_SERIALIZER = new InjectionToken<Converter<User, any>>(
  'UserProfileSerializer'
);

export const USER_SERIALIZER = new InjectionToken<Converter<User, any>>(
  'UserSerializer'
);

export const USER_SIGN_UP_SERIALIZER = new InjectionToken<
  Converter<UserSignUp, any>
>('UserSignUpSerializer');

export const TITLE_NORMALIZER = new InjectionToken<Converter<any, Title>>(
  'TitleNormalizer'
);

export const NOTIFICATION_PREFERENCE_SERIALIZER = new InjectionToken<
  Converter<NotificationPreference[], any>
>('NotificationPreferenceSerializer');

export const NOTIFICATION_PREFERENCE_NORMALIZER = new InjectionToken<
  Converter<any, NotificationPreference>
>('NotificationPreferenceNormalizer');
