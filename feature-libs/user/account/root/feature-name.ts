export const USER_ACCOUNT_FEATURE = 'userDetails';
export const USER_ACCOUNT_CORE_FEATURE = 'userDetailsCore';

export const featureConfig = {
  featureModules: {
    [USER_ACCOUNT_FEATURE]: {
      cmsComponents: [
        // 'LoginComponent',
        'ReturningCustomerLoginComponent',
        'ReturningCustomerRegisterComponent',
      ],
    },
  },
};
