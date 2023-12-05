/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultAuthConfig = {
    authentication: {
        client_id: 'mobile_android',
        client_secret: 'secret',
        tokenEndpoint: '/oauth/token',
        revokeEndpoint: '/oauth/revoke',
        loginUrl: '/oauth/authorize',
        OAuthLibConfig: {
            scope: '',
            customTokenParameters: ['token_type'],
            strictDiscoveryDocumentValidation: false,
            skipIssuerCheck: true,
            disablePKCE: true,
            oidc: false,
            clearHashAfterLogin: false,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1hdXRoLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2F1dGgvdXNlci1hdXRoL2NvbmZpZy9kZWZhdWx0LWF1dGgtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBZTtJQUMzQyxjQUFjLEVBQUU7UUFDZCxTQUFTLEVBQUUsZ0JBQWdCO1FBQzNCLGFBQWEsRUFBRSxRQUFRO1FBQ3ZCLGFBQWEsRUFBRSxjQUFjO1FBQzdCLGNBQWMsRUFBRSxlQUFlO1FBQy9CLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsY0FBYyxFQUFFO1lBQ2QsS0FBSyxFQUFFLEVBQUU7WUFDVCxxQkFBcUIsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNyQyxpQ0FBaUMsRUFBRSxLQUFLO1lBQ3hDLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLElBQUksRUFBRSxLQUFLO1lBQ1gsbUJBQW1CLEVBQUUsS0FBSztTQUMzQjtLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEF1dGhDb25maWcgfSBmcm9tICcuL2F1dGgtY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRBdXRoQ29uZmlnOiBBdXRoQ29uZmlnID0ge1xuICBhdXRoZW50aWNhdGlvbjoge1xuICAgIGNsaWVudF9pZDogJ21vYmlsZV9hbmRyb2lkJyxcbiAgICBjbGllbnRfc2VjcmV0OiAnc2VjcmV0JyxcbiAgICB0b2tlbkVuZHBvaW50OiAnL29hdXRoL3Rva2VuJyxcbiAgICByZXZva2VFbmRwb2ludDogJy9vYXV0aC9yZXZva2UnLFxuICAgIGxvZ2luVXJsOiAnL29hdXRoL2F1dGhvcml6ZScsXG4gICAgT0F1dGhMaWJDb25maWc6IHtcbiAgICAgIHNjb3BlOiAnJyxcbiAgICAgIGN1c3RvbVRva2VuUGFyYW1ldGVyczogWyd0b2tlbl90eXBlJ10sXG4gICAgICBzdHJpY3REaXNjb3ZlcnlEb2N1bWVudFZhbGlkYXRpb246IGZhbHNlLFxuICAgICAgc2tpcElzc3VlckNoZWNrOiB0cnVlLFxuICAgICAgZGlzYWJsZVBLQ0U6IHRydWUsXG4gICAgICBvaWRjOiBmYWxzZSxcbiAgICAgIGNsZWFySGFzaEFmdGVyTG9naW46IGZhbHNlLFxuICAgIH0sXG4gIH0sXG59O1xuIl19