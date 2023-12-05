/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultTextfieldRoutingConfig = {
    routing: {
        routes: {
            configureTEXTFIELD: {
                paths: ['configure/textfield/:ownerType/entityKey/:entityKey'],
            },
            configureOverviewTEXTFIELD: {
                paths: [
                    'configure-overview/textfield/:ownerType/entityKey/:entityKey/displayOnly/:displayOnly',
                    'configure-overview/textfield/:ownerType/entityKey/:entityKey',
                ],
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC10ZXh0ZmllbGQtcm91dGluZy1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvdGV4dGZpZWxkL3Jvb3QvZGVmYXVsdC10ZXh0ZmllbGQtcm91dGluZy1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFrQjtJQUMxRCxPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUU7WUFDTixrQkFBa0IsRUFBRTtnQkFDbEIsS0FBSyxFQUFFLENBQUMscURBQXFELENBQUM7YUFDL0Q7WUFDRCwwQkFBMEIsRUFBRTtnQkFDMUIsS0FBSyxFQUFFO29CQUNMLHVGQUF1RjtvQkFDdkYsOERBQThEO2lCQUMvRDthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBSb3V0aW5nQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRUZXh0ZmllbGRSb3V0aW5nQ29uZmlnOiBSb3V0aW5nQ29uZmlnID0ge1xuICByb3V0aW5nOiB7XG4gICAgcm91dGVzOiB7XG4gICAgICBjb25maWd1cmVURVhURklFTEQ6IHtcbiAgICAgICAgcGF0aHM6IFsnY29uZmlndXJlL3RleHRmaWVsZC86b3duZXJUeXBlL2VudGl0eUtleS86ZW50aXR5S2V5J10sXG4gICAgICB9LFxuICAgICAgY29uZmlndXJlT3ZlcnZpZXdURVhURklFTEQ6IHtcbiAgICAgICAgcGF0aHM6IFtcbiAgICAgICAgICAnY29uZmlndXJlLW92ZXJ2aWV3L3RleHRmaWVsZC86b3duZXJUeXBlL2VudGl0eUtleS86ZW50aXR5S2V5L2Rpc3BsYXlPbmx5LzpkaXNwbGF5T25seScsXG4gICAgICAgICAgJ2NvbmZpZ3VyZS1vdmVydmlldy90ZXh0ZmllbGQvOm93bmVyVHlwZS9lbnRpdHlLZXkvOmVudGl0eUtleScsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuIl19