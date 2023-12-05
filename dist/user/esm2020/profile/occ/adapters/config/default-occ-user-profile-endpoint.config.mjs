/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultOccUserProfileConfig = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtdXNlci1wcm9maWxlLWVuZHBvaW50LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy91c2VyL3Byb2ZpbGUvb2NjL2FkYXB0ZXJzL2NvbmZpZy9kZWZhdWx0LW9jYy11c2VyLXByb2ZpbGUtZW5kcG9pbnQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSCxNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBYztJQUNwRCxPQUFPLEVBQUU7UUFDUCxHQUFHLEVBQUU7WUFDSCxTQUFTLEVBQUU7Z0JBQ1QsWUFBWSxFQUFFLE9BQU87Z0JBQ3JCLGtCQUFrQixFQUFFLHlCQUF5QjtnQkFDN0MsaUJBQWlCLEVBQUUsZUFBZTtnQkFDbEMsaUJBQWlCLEVBQUUsdUJBQXVCO2dCQUMxQyxrQkFBa0IsRUFBRSwwQkFBMEI7Z0JBQzlDLE1BQU0sRUFBRSxRQUFRO2FBQ2pCO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBPY2NDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdE9jY1VzZXJQcm9maWxlQ29uZmlnOiBPY2NDb25maWcgPSB7XG4gIGJhY2tlbmQ6IHtcbiAgICBvY2M6IHtcbiAgICAgIGVuZHBvaW50czoge1xuICAgICAgICB1c2VyUmVnaXN0ZXI6ICd1c2VycycsXG4gICAgICAgIHVzZXJGb3Jnb3RQYXNzd29yZDogJ2ZvcmdvdHRlbnBhc3N3b3JkdG9rZW5zJyxcbiAgICAgICAgdXNlclJlc2V0UGFzc3dvcmQ6ICdyZXNldHBhc3N3b3JkJyxcbiAgICAgICAgdXNlclVwZGF0ZUxvZ2luSWQ6ICd1c2Vycy8ke3VzZXJJZH0vbG9naW4nLFxuICAgICAgICB1c2VyVXBkYXRlUGFzc3dvcmQ6ICd1c2Vycy8ke3VzZXJJZH0vcGFzc3dvcmQnLFxuICAgICAgICB0aXRsZXM6ICd0aXRsZXMnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==