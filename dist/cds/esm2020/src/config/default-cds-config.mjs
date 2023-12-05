/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const DEFAULT_CDS_CONFIG = {
    cds: {
        tenant: '',
        baseUrl: '',
        endpoints: {
            strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
        },
        merchandising: {
            defaultCarouselViewportThreshold: 80,
        },
        consentTemplateId: 'PROFILE',
        profileTag: {
            allowInsecureCookies: false,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jZHMtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZHMvc3JjL2NvbmZpZy9kZWZhdWx0LWNkcy1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFjO0lBQzNDLEdBQUcsRUFBRTtRQUNILE1BQU0sRUFBRSxFQUFFO1FBQ1YsT0FBTyxFQUFFLEVBQUU7UUFDWCxTQUFTLEVBQUU7WUFDVCxnQkFBZ0IsRUFBRSx1REFBdUQ7U0FDMUU7UUFDRCxhQUFhLEVBQUU7WUFDYixnQ0FBZ0MsRUFBRSxFQUFFO1NBQ3JDO1FBQ0QsaUJBQWlCLEVBQUUsU0FBUztRQUM1QixVQUFVLEVBQUU7WUFDVixvQkFBb0IsRUFBRSxLQUFLO1NBQzVCO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2RzQ29uZmlnIH0gZnJvbSAnLi9jZHMtY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ0RTX0NPTkZJRzogQ2RzQ29uZmlnID0ge1xuICBjZHM6IHtcbiAgICB0ZW5hbnQ6ICcnLFxuICAgIGJhc2VVcmw6ICcnLFxuICAgIGVuZHBvaW50czoge1xuICAgICAgc3RyYXRlZ3lQcm9kdWN0czogJy9zdHJhdGVneS8ke3RlbmFudH0vc3RyYXRlZ2llcy8ke3N0cmF0ZWd5SWR9L3Byb2R1Y3RzJyxcbiAgICB9LFxuICAgIG1lcmNoYW5kaXNpbmc6IHtcbiAgICAgIGRlZmF1bHRDYXJvdXNlbFZpZXdwb3J0VGhyZXNob2xkOiA4MCxcbiAgICB9LFxuICAgIGNvbnNlbnRUZW1wbGF0ZUlkOiAnUFJPRklMRScsXG4gICAgcHJvZmlsZVRhZzoge1xuICAgICAgYWxsb3dJbnNlY3VyZUNvb2tpZXM6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG59O1xuIl19