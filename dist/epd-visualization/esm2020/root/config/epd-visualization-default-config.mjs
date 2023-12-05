/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export function getEpdVisualizationDefaultConfig() {
    return {
        epdVisualization: {
            usageIds: {
                folderUsageId: {
                    name: 'CommerceCloud-Folder',
                    keys: [
                        {
                            name: 'Function',
                            value: 'Online',
                        },
                    ],
                },
                productUsageId: {
                    name: 'CommerceCloud-SparePart',
                    source: 'CommerceCloud',
                    category: 'SpareParts',
                    keyName: 'ProductCode',
                },
            },
            visualPicking: {
                productReferenceType: 'SPAREPART',
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXBkLXZpc3VhbGl6YXRpb24tZGVmYXVsdC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL3Jvb3QvY29uZmlnL2VwZC12aXN1YWxpemF0aW9uLWRlZmF1bHQtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSCxNQUFNLFVBQVUsZ0NBQWdDO0lBQzlDLE9BQU87UUFDTCxnQkFBZ0IsRUFBRTtZQUNoQixRQUFRLEVBQUU7Z0JBQ1IsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxzQkFBc0I7b0JBQzVCLElBQUksRUFBRTt3QkFDSjs0QkFDRSxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsS0FBSyxFQUFFLFFBQVE7eUJBQ2hCO3FCQUNGO2lCQUNGO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxJQUFJLEVBQUUseUJBQXlCO29CQUMvQixNQUFNLEVBQUUsZUFBZTtvQkFDdkIsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLE9BQU8sRUFBRSxhQUFhO2lCQUN2QjthQUNGO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLG9CQUFvQixFQUFFLFdBQVc7YUFDbEM7U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRXBkVmlzdWFsaXphdGlvbkNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9lcGQtdmlzdWFsaXphdGlvbi1jb25maWcnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXBkVmlzdWFsaXphdGlvbkRlZmF1bHRDb25maWcoKTogRXBkVmlzdWFsaXphdGlvbkNvbmZpZyB7XG4gIHJldHVybiB7XG4gICAgZXBkVmlzdWFsaXphdGlvbjoge1xuICAgICAgdXNhZ2VJZHM6IHtcbiAgICAgICAgZm9sZGVyVXNhZ2VJZDoge1xuICAgICAgICAgIG5hbWU6ICdDb21tZXJjZUNsb3VkLUZvbGRlcicsXG4gICAgICAgICAga2V5czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiAnRnVuY3Rpb24nLFxuICAgICAgICAgICAgICB2YWx1ZTogJ09ubGluZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHByb2R1Y3RVc2FnZUlkOiB7XG4gICAgICAgICAgbmFtZTogJ0NvbW1lcmNlQ2xvdWQtU3BhcmVQYXJ0JyxcbiAgICAgICAgICBzb3VyY2U6ICdDb21tZXJjZUNsb3VkJyxcbiAgICAgICAgICBjYXRlZ29yeTogJ1NwYXJlUGFydHMnLFxuICAgICAgICAgIGtleU5hbWU6ICdQcm9kdWN0Q29kZScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgdmlzdWFsUGlja2luZzoge1xuICAgICAgICBwcm9kdWN0UmVmZXJlbmNlVHlwZTogJ1NQQVJFUEFSVCcsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59XG4iXX0=