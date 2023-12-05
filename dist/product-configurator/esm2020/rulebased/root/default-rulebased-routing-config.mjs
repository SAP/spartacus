/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultRulebasedRoutingConfig = {
    routing: {
        routes: {
            configureCPQCONFIGURATOR: {
                paths: ['configure/vc/:ownerType/entityKey/:entityKey'],
            },
            configureOverviewCPQCONFIGURATOR: {
                paths: [
                    'configure-overview/vc/:ownerType/entityKey/:entityKey/displayOnly/:displayOnly',
                    'configure-overview/vc/:ownerType/entityKey/:entityKey',
                ],
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1ydWxlYmFzZWQtcm91dGluZy1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL3Jvb3QvZGVmYXVsdC1ydWxlYmFzZWQtcm91dGluZy1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFrQjtJQUMxRCxPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUU7WUFDTix3QkFBd0IsRUFBRTtnQkFDeEIsS0FBSyxFQUFFLENBQUMsOENBQThDLENBQUM7YUFDeEQ7WUFDRCxnQ0FBZ0MsRUFBRTtnQkFDaEMsS0FBSyxFQUFFO29CQUNMLGdGQUFnRjtvQkFDaEYsdURBQXVEO2lCQUN4RDthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBSb3V0aW5nQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRSdWxlYmFzZWRSb3V0aW5nQ29uZmlnOiBSb3V0aW5nQ29uZmlnID0ge1xuICByb3V0aW5nOiB7XG4gICAgcm91dGVzOiB7XG4gICAgICBjb25maWd1cmVDUFFDT05GSUdVUkFUT1I6IHtcbiAgICAgICAgcGF0aHM6IFsnY29uZmlndXJlL3ZjLzpvd25lclR5cGUvZW50aXR5S2V5LzplbnRpdHlLZXknXSxcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmVPdmVydmlld0NQUUNPTkZJR1VSQVRPUjoge1xuICAgICAgICBwYXRoczogW1xuICAgICAgICAgICdjb25maWd1cmUtb3ZlcnZpZXcvdmMvOm93bmVyVHlwZS9lbnRpdHlLZXkvOmVudGl0eUtleS9kaXNwbGF5T25seS86ZGlzcGxheU9ubHknLFxuICAgICAgICAgICdjb25maWd1cmUtb3ZlcnZpZXcvdmMvOm93bmVyVHlwZS9lbnRpdHlLZXkvOmVudGl0eUtleScsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuIl19