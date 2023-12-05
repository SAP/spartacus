/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultCmsModuleConfig = {
    backend: {
        occ: {
            endpoints: {
                component: 'cms/components/${id}',
                components: 'cms/components',
                pages: 'cms/pages',
                page: 'cms/pages/${id}',
            },
        },
    },
    cmsComponents: {},
    componentsLoading: {
        pageSize: 50,
    },
};
// TODO: (CXSPA-4886) replace and remove this with defaultCmsModuleConfig in the major
export const defaultUserCmsModuleConfig = {
    ...defaultCmsModuleConfig,
    backend: {
        occ: {
            endpoints: {
                component: 'users/${userId}/cms/components/${id}',
                components: 'users/${userId}/cms/components',
                pages: 'users/${userId}/cms/pages',
                page: 'users/${userId}/cms/pages/${id}',
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jbXMtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvY21zL2NvbmZpZy9kZWZhdWx0LWNtcy1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFjO0lBQy9DLE9BQU8sRUFBRTtRQUNQLEdBQUcsRUFBRTtZQUNILFNBQVMsRUFBRTtnQkFDVCxTQUFTLEVBQUUsc0JBQXNCO2dCQUNqQyxVQUFVLEVBQUUsZ0JBQWdCO2dCQUM1QixLQUFLLEVBQUUsV0FBVztnQkFDbEIsSUFBSSxFQUFFLGlCQUFpQjthQUN4QjtTQUNGO0tBQ0Y7SUFDRCxhQUFhLEVBQUUsRUFBRTtJQUNqQixpQkFBaUIsRUFBRTtRQUNqQixRQUFRLEVBQUUsRUFBRTtLQUNiO0NBQ0YsQ0FBQztBQUVGLHNGQUFzRjtBQUN0RixNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBYztJQUNuRCxHQUFHLHNCQUFzQjtJQUN6QixPQUFPLEVBQUU7UUFDUCxHQUFHLEVBQUU7WUFDSCxTQUFTLEVBQUU7Z0JBQ1QsU0FBUyxFQUFFLHNDQUFzQztnQkFDakQsVUFBVSxFQUFFLGdDQUFnQztnQkFDNUMsS0FBSyxFQUFFLDJCQUEyQjtnQkFDbEMsSUFBSSxFQUFFLGlDQUFpQzthQUN4QztTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ21zQ29uZmlnIH0gZnJvbSAnLi9jbXMtY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDbXNNb2R1bGVDb25maWc6IENtc0NvbmZpZyA9IHtcbiAgYmFja2VuZDoge1xuICAgIG9jYzoge1xuICAgICAgZW5kcG9pbnRzOiB7XG4gICAgICAgIGNvbXBvbmVudDogJ2Ntcy9jb21wb25lbnRzLyR7aWR9JyxcbiAgICAgICAgY29tcG9uZW50czogJ2Ntcy9jb21wb25lbnRzJyxcbiAgICAgICAgcGFnZXM6ICdjbXMvcGFnZXMnLFxuICAgICAgICBwYWdlOiAnY21zL3BhZ2VzLyR7aWR9JyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgY21zQ29tcG9uZW50czoge30sXG4gIGNvbXBvbmVudHNMb2FkaW5nOiB7XG4gICAgcGFnZVNpemU6IDUwLFxuICB9LFxufTtcblxuLy8gVE9ETzogKENYU1BBLTQ4ODYpIHJlcGxhY2UgYW5kIHJlbW92ZSB0aGlzIHdpdGggZGVmYXVsdENtc01vZHVsZUNvbmZpZyBpbiB0aGUgbWFqb3JcbmV4cG9ydCBjb25zdCBkZWZhdWx0VXNlckNtc01vZHVsZUNvbmZpZzogQ21zQ29uZmlnID0ge1xuICAuLi5kZWZhdWx0Q21zTW9kdWxlQ29uZmlnLFxuICBiYWNrZW5kOiB7XG4gICAgb2NjOiB7XG4gICAgICBlbmRwb2ludHM6IHtcbiAgICAgICAgY29tcG9uZW50OiAndXNlcnMvJHt1c2VySWR9L2Ntcy9jb21wb25lbnRzLyR7aWR9JyxcbiAgICAgICAgY29tcG9uZW50czogJ3VzZXJzLyR7dXNlcklkfS9jbXMvY29tcG9uZW50cycsXG4gICAgICAgIHBhZ2VzOiAndXNlcnMvJHt1c2VySWR9L2Ntcy9wYWdlcycsXG4gICAgICAgIHBhZ2U6ICd1c2Vycy8ke3VzZXJJZH0vY21zL3BhZ2VzLyR7aWR9JyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=