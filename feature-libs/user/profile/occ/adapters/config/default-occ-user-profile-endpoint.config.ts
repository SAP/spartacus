import { OccConfig } from '@spartacus/core';

export const defaultOccUserProfileConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        userRegister: 'users',
        userForgotPassword: 'forgottenpasswordtokens',
        userResetPassword: 'resetpassword',
        userUpdateLoginId: 'users/${userId}/login',
        userUpdatePassword: 'users/${userId}/password',
        titles: 'titles',
      },
    },
  },
};
