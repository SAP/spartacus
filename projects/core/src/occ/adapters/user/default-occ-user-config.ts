import { OccConfig } from '../../config/occ-config';

export const defaultOccUserConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        user: 'users/${userId}',
        userRegister: 'users',
        userForgotPassword: 'forgottenpasswordtokens',
        userResetPassword: 'resetpassword',
      },
    },
  },
};
