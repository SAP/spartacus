/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultCpqConfiguratorEndpointConfig = {
    backend: {
        cpq: {
            endpoints: {
                configurationInit: 'configurations',
                configurationDisplay: 'configurations/${configId}/display',
                attributeUpdate: 'configurations/${configId}/attributes/${attributeCode}',
                valueUpdate: 'configurations/${configId}/attributes/${attributeCode}/attributeValues/${valueCode}',
            },
            prefix: '/api/configuration/v1/',
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jcHEtY29uZmlndXJhdG9yLWVuZHBvaW50LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY3BxL3Jlc3QvZGVmYXVsdC1jcHEtY29uZmlndXJhdG9yLWVuZHBvaW50LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBSUgsTUFBTSxDQUFDLE1BQU0sb0NBQW9DLEdBQy9DO0lBQ0UsT0FBTyxFQUFFO1FBQ1AsR0FBRyxFQUFFO1lBQ0gsU0FBUyxFQUFFO2dCQUNULGlCQUFpQixFQUFFLGdCQUFnQjtnQkFDbkMsb0JBQW9CLEVBQUUsb0NBQW9DO2dCQUMxRCxlQUFlLEVBQ2Isd0RBQXdEO2dCQUMxRCxXQUFXLEVBQ1QscUZBQXFGO2FBQ3hGO1lBQ0QsTUFBTSxFQUFFLHdCQUF3QjtTQUNqQztLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENwcUNvbmZpZ3VyYXRvckVuZHBvaW50Q29uZmlnIH0gZnJvbSAnLi9jcHEtY29uZmlndXJhdG9yLWVuZHBvaW50LmNvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q3BxQ29uZmlndXJhdG9yRW5kcG9pbnRDb25maWc6IENwcUNvbmZpZ3VyYXRvckVuZHBvaW50Q29uZmlnID1cbiAge1xuICAgIGJhY2tlbmQ6IHtcbiAgICAgIGNwcToge1xuICAgICAgICBlbmRwb2ludHM6IHtcbiAgICAgICAgICBjb25maWd1cmF0aW9uSW5pdDogJ2NvbmZpZ3VyYXRpb25zJyxcbiAgICAgICAgICBjb25maWd1cmF0aW9uRGlzcGxheTogJ2NvbmZpZ3VyYXRpb25zLyR7Y29uZmlnSWR9L2Rpc3BsYXknLFxuICAgICAgICAgIGF0dHJpYnV0ZVVwZGF0ZTpcbiAgICAgICAgICAgICdjb25maWd1cmF0aW9ucy8ke2NvbmZpZ0lkfS9hdHRyaWJ1dGVzLyR7YXR0cmlidXRlQ29kZX0nLFxuICAgICAgICAgIHZhbHVlVXBkYXRlOlxuICAgICAgICAgICAgJ2NvbmZpZ3VyYXRpb25zLyR7Y29uZmlnSWR9L2F0dHJpYnV0ZXMvJHthdHRyaWJ1dGVDb2RlfS9hdHRyaWJ1dGVWYWx1ZXMvJHt2YWx1ZUNvZGV9JyxcbiAgICAgICAgfSxcbiAgICAgICAgcHJlZml4OiAnL2FwaS9jb25maWd1cmF0aW9uL3YxLycsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG4iXX0=