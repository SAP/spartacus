/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultPersonalizationConfig = {
    personalization: {
        enabled: false,
        httpHeaderName: {
            id: 'Occ-Personalization-Id',
            timestamp: 'Occ-Personalization-Time',
        },
        context: {
            slotPosition: 'PlaceholderContentSlot',
            componentId: 'PersonalizationScriptComponent',
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1wZXJzb25hbGl6YXRpb24tY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3RyYWNraW5nL3BlcnNvbmFsaXphdGlvbi9yb290L2NvbmZpZy9kZWZhdWx0LXBlcnNvbmFsaXphdGlvbi1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUEwQjtJQUNqRSxlQUFlLEVBQUU7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLGNBQWMsRUFBRTtZQUNkLEVBQUUsRUFBRSx3QkFBd0I7WUFDNUIsU0FBUyxFQUFFLDBCQUEwQjtTQUN0QztRQUNELE9BQU8sRUFBRTtZQUNQLFlBQVksRUFBRSx3QkFBd0I7WUFDdEMsV0FBVyxFQUFFLGdDQUFnQztTQUM5QztLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFBlcnNvbmFsaXphdGlvbkNvbmZpZyB9IGZyb20gJy4vcGVyc29uYWxpemF0aW9uLWNvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0UGVyc29uYWxpemF0aW9uQ29uZmlnOiBQZXJzb25hbGl6YXRpb25Db25maWcgPSB7XG4gIHBlcnNvbmFsaXphdGlvbjoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGh0dHBIZWFkZXJOYW1lOiB7XG4gICAgICBpZDogJ09jYy1QZXJzb25hbGl6YXRpb24tSWQnLFxuICAgICAgdGltZXN0YW1wOiAnT2NjLVBlcnNvbmFsaXphdGlvbi1UaW1lJyxcbiAgICB9LFxuICAgIGNvbnRleHQ6IHtcbiAgICAgIHNsb3RQb3NpdGlvbjogJ1BsYWNlaG9sZGVyQ29udGVudFNsb3QnLFxuICAgICAgY29tcG9uZW50SWQ6ICdQZXJzb25hbGl6YXRpb25TY3JpcHRDb21wb25lbnQnLFxuICAgIH0sXG4gIH0sXG59O1xuIl19