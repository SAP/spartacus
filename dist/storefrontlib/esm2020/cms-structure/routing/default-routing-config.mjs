/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultStorefrontRoutesConfig = {
    home: { paths: [''] },
    notFound: { paths: ['not-found'] },
    // semantic links for login related pages
    login: {
        paths: ['login'],
        protected: false,
        authFlow: true,
    },
    register: {
        paths: ['login/register'],
        protected: false,
        authFlow: true,
    },
    forgotPassword: {
        paths: ['login/forgot-password'],
        protected: false,
        authFlow: true,
    },
    resetPassword: {
        paths: ['login/pw/change'],
        protected: false,
        authFlow: true,
    },
    logout: { paths: ['logout'], protected: false, authFlow: true },
    // plp routes
    search: { paths: ['search/:query'] },
    category: {
        paths: ['category/:categoryCode'],
        paramsMapping: { categoryCode: 'code' },
    },
    brand: { paths: ['Brands/:brandName/c/:brandCode'] },
    // pdp routes
    product: {
        paths: ['product/:productCode/:name'],
        paramsMapping: { productCode: 'code' },
    },
    termsAndConditions: { paths: ['terms-and-conditions'] },
    coupons: { paths: ['my-account/coupons'] },
    couponClaim: {
        paths: ['my-account/coupon/claim/:couponCode'],
        paramsMapping: { couponCode: 'code' },
    },
    myInterests: {
        paths: ['my-account/my-interests'],
    },
    notificationPreference: {
        paths: ['my-account/notification-preference'],
    },
};
export const defaultRoutingConfig = {
    routing: {
        routes: defaultStorefrontRoutesConfig,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1yb3V0aW5nLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9yb3V0aW5nL2RlZmF1bHQtcm91dGluZy1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFpQjtJQUN6RCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNyQixRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRTtJQUVsQyx5Q0FBeUM7SUFDekMsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2hCLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxRQUFRLEVBQUU7UUFDUixLQUFLLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN6QixTQUFTLEVBQUUsS0FBSztRQUNoQixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsS0FBSyxFQUFFLENBQUMsdUJBQXVCLENBQUM7UUFDaEMsU0FBUyxFQUFFLEtBQUs7UUFDaEIsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELGFBQWEsRUFBRTtRQUNiLEtBQUssRUFBRSxDQUFDLGlCQUFpQixDQUFDO1FBQzFCLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFFL0QsYUFBYTtJQUNiLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFFO0lBQ3BDLFFBQVEsRUFBRTtRQUNSLEtBQUssRUFBRSxDQUFDLHdCQUF3QixDQUFDO1FBQ2pDLGFBQWEsRUFBRSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUU7S0FDeEM7SUFDRCxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFO0lBRXBELGFBQWE7SUFDYixPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztRQUNyQyxhQUFhLEVBQUUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFO0tBQ3ZDO0lBRUQsa0JBQWtCLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO0lBQ3ZELE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7SUFDMUMsV0FBVyxFQUFFO1FBQ1gsS0FBSyxFQUFFLENBQUMscUNBQXFDLENBQUM7UUFDOUMsYUFBYSxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTtLQUN0QztJQUNELFdBQVcsRUFBRTtRQUNYLEtBQUssRUFBRSxDQUFDLHlCQUF5QixDQUFDO0tBQ25DO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsS0FBSyxFQUFFLENBQUMsb0NBQW9DLENBQUM7S0FDOUM7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQWtCO0lBQ2pELE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRSw2QkFBNkI7S0FDdEM7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgUm91dGVzQ29uZmlnLCBSb3V0aW5nQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTdG9yZWZyb250Um91dGVzQ29uZmlnOiBSb3V0ZXNDb25maWcgPSB7XG4gIGhvbWU6IHsgcGF0aHM6IFsnJ10gfSxcbiAgbm90Rm91bmQ6IHsgcGF0aHM6IFsnbm90LWZvdW5kJ10gfSxcblxuICAvLyBzZW1hbnRpYyBsaW5rcyBmb3IgbG9naW4gcmVsYXRlZCBwYWdlc1xuICBsb2dpbjoge1xuICAgIHBhdGhzOiBbJ2xvZ2luJ10sXG4gICAgcHJvdGVjdGVkOiBmYWxzZSxcbiAgICBhdXRoRmxvdzogdHJ1ZSxcbiAgfSxcbiAgcmVnaXN0ZXI6IHtcbiAgICBwYXRoczogWydsb2dpbi9yZWdpc3RlciddLFxuICAgIHByb3RlY3RlZDogZmFsc2UsXG4gICAgYXV0aEZsb3c6IHRydWUsXG4gIH0sXG4gIGZvcmdvdFBhc3N3b3JkOiB7XG4gICAgcGF0aHM6IFsnbG9naW4vZm9yZ290LXBhc3N3b3JkJ10sXG4gICAgcHJvdGVjdGVkOiBmYWxzZSxcbiAgICBhdXRoRmxvdzogdHJ1ZSxcbiAgfSxcbiAgcmVzZXRQYXNzd29yZDoge1xuICAgIHBhdGhzOiBbJ2xvZ2luL3B3L2NoYW5nZSddLFxuICAgIHByb3RlY3RlZDogZmFsc2UsXG4gICAgYXV0aEZsb3c6IHRydWUsXG4gIH0sXG4gIGxvZ291dDogeyBwYXRoczogWydsb2dvdXQnXSwgcHJvdGVjdGVkOiBmYWxzZSwgYXV0aEZsb3c6IHRydWUgfSxcblxuICAvLyBwbHAgcm91dGVzXG4gIHNlYXJjaDogeyBwYXRoczogWydzZWFyY2gvOnF1ZXJ5J10gfSxcbiAgY2F0ZWdvcnk6IHtcbiAgICBwYXRoczogWydjYXRlZ29yeS86Y2F0ZWdvcnlDb2RlJ10sXG4gICAgcGFyYW1zTWFwcGluZzogeyBjYXRlZ29yeUNvZGU6ICdjb2RlJyB9LFxuICB9LFxuICBicmFuZDogeyBwYXRoczogWydCcmFuZHMvOmJyYW5kTmFtZS9jLzpicmFuZENvZGUnXSB9LFxuXG4gIC8vIHBkcCByb3V0ZXNcbiAgcHJvZHVjdDoge1xuICAgIHBhdGhzOiBbJ3Byb2R1Y3QvOnByb2R1Y3RDb2RlLzpuYW1lJ10sXG4gICAgcGFyYW1zTWFwcGluZzogeyBwcm9kdWN0Q29kZTogJ2NvZGUnIH0sXG4gIH0sXG5cbiAgdGVybXNBbmRDb25kaXRpb25zOiB7IHBhdGhzOiBbJ3Rlcm1zLWFuZC1jb25kaXRpb25zJ10gfSxcbiAgY291cG9uczogeyBwYXRoczogWydteS1hY2NvdW50L2NvdXBvbnMnXSB9LFxuICBjb3Vwb25DbGFpbToge1xuICAgIHBhdGhzOiBbJ215LWFjY291bnQvY291cG9uL2NsYWltLzpjb3Vwb25Db2RlJ10sXG4gICAgcGFyYW1zTWFwcGluZzogeyBjb3Vwb25Db2RlOiAnY29kZScgfSxcbiAgfSxcbiAgbXlJbnRlcmVzdHM6IHtcbiAgICBwYXRoczogWydteS1hY2NvdW50L215LWludGVyZXN0cyddLFxuICB9LFxuICBub3RpZmljYXRpb25QcmVmZXJlbmNlOiB7XG4gICAgcGF0aHM6IFsnbXktYWNjb3VudC9ub3RpZmljYXRpb24tcHJlZmVyZW5jZSddLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRSb3V0aW5nQ29uZmlnOiBSb3V0aW5nQ29uZmlnID0ge1xuICByb3V0aW5nOiB7XG4gICAgcm91dGVzOiBkZWZhdWx0U3RvcmVmcm9udFJvdXRlc0NvbmZpZyxcbiAgfSxcbn07XG4iXX0=