export const AUTH_OCC_USER_ID_FEATURE = 'auth/occ-user-id';

export interface StateWithOccUserId {
  [AUTH_OCC_USER_ID_FEATURE]: OccUserIdState;
}

export interface OccUserIdState {
  occUserId: string;
}
