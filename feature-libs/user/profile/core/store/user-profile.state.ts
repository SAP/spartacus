import { ConsignmentTracking, Country, Region, Title } from '@spartacus/core';

export const USER_PROFILE_FEATURE = 'userProfile';

export const UPDATE_USER_PROFILE_PROCESS_ID = 'updateUserProfile';

export const UPDATE_EMAIL_PROCESS_ID = 'updateEmail';
export const UPDATE_PASSWORD_PROCESS_ID = 'updatePassword';
export const REGISTER_USER_PROCESS_ID = 'registerUser';

export const CLOSE_USER_PROCESS_ID = 'closeUser';

export interface StateWithUserProfile {
  [USER_PROFILE_FEATURE]: UserProfileState;
}

export interface UserProfileState {
  titles: TitlesState;
  resetPassword: boolean;
}

export interface TitleEntities {
  [key: string]: Title;
}

export interface TitlesState {
  entities: TitleEntities;
}

export interface RegionsState {
  entities: Region[];
  country: string;
}

export interface BillingCountryEntities {
  [key: string]: Country;
}

export interface BillingCountriesState {
  entities: BillingCountryEntities;
}

export interface DeliveryCountryEntities {
  [key: string]: Country;
}

export interface DeliveryCountriesState {
  entities: DeliveryCountryEntities;
}
export interface ConsignmentTrackingState {
  tracking?: ConsignmentTracking;
}
