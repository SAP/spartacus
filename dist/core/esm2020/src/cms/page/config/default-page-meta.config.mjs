/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultPageMetaConfig = {
    pageMeta: {
        resolvers: [
            {
                property: 'title',
                method: 'resolveTitle',
            },
            {
                property: 'heading',
                method: 'resolveHeading',
            },
            {
                property: 'breadcrumbs',
                method: 'resolveBreadcrumbs',
            },
            {
                property: 'description',
                method: 'resolveDescription',
                disabledInCsr: true,
            },
            {
                property: 'image',
                method: 'resolveImage',
                disabledInCsr: true,
            },
            {
                property: 'robots',
                method: 'resolveRobots',
                disabledInCsr: true,
            },
            {
                property: 'canonicalUrl',
                method: 'resolveCanonicalUrl',
                disabledInCsr: true,
            },
        ],
        canonicalUrl: {
            forceHttps: true,
            forceWww: false,
            removeQueryParams: true,
            forceTrailingSlash: true,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1wYWdlLW1ldGEuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvY21zL3BhZ2UvY29uZmlnL2RlZmF1bHQtcGFnZS1tZXRhLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBSUgsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQW1CO0lBQ25ELFFBQVEsRUFBRTtRQUNSLFNBQVMsRUFBRTtZQUNUO2dCQUNFLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixNQUFNLEVBQUUsY0FBYzthQUN2QjtZQUNEO2dCQUNFLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixNQUFNLEVBQUUsZ0JBQWdCO2FBQ3pCO1lBQ0Q7Z0JBQ0UsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLE1BQU0sRUFBRSxvQkFBb0I7YUFDN0I7WUFDRDtnQkFDRSxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsTUFBTSxFQUFFLG9CQUFvQjtnQkFDNUIsYUFBYSxFQUFFLElBQUk7YUFDcEI7WUFDRDtnQkFDRSxRQUFRLEVBQUUsT0FBTztnQkFDakIsTUFBTSxFQUFFLGNBQWM7Z0JBQ3RCLGFBQWEsRUFBRSxJQUFJO2FBQ3BCO1lBQ0Q7Z0JBQ0UsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLE1BQU0sRUFBRSxlQUFlO2dCQUN2QixhQUFhLEVBQUUsSUFBSTthQUNwQjtZQUNEO2dCQUNFLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixNQUFNLEVBQUUscUJBQXFCO2dCQUM3QixhQUFhLEVBQUUsSUFBSTthQUNwQjtTQUNGO1FBQ0QsWUFBWSxFQUFFO1lBQ1osVUFBVSxFQUFFLElBQUk7WUFDaEIsUUFBUSxFQUFFLEtBQUs7WUFDZixpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLGtCQUFrQixFQUFFLElBQUk7U0FDekI7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBQYWdlTWV0YUNvbmZpZyB9IGZyb20gJy4vcGFnZS1tZXRhLmNvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0UGFnZU1ldGFDb25maWc6IFBhZ2VNZXRhQ29uZmlnID0ge1xuICBwYWdlTWV0YToge1xuICAgIHJlc29sdmVyczogW1xuICAgICAge1xuICAgICAgICBwcm9wZXJ0eTogJ3RpdGxlJyxcbiAgICAgICAgbWV0aG9kOiAncmVzb2x2ZVRpdGxlJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHByb3BlcnR5OiAnaGVhZGluZycsXG4gICAgICAgIG1ldGhvZDogJ3Jlc29sdmVIZWFkaW5nJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHByb3BlcnR5OiAnYnJlYWRjcnVtYnMnLFxuICAgICAgICBtZXRob2Q6ICdyZXNvbHZlQnJlYWRjcnVtYnMnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcHJvcGVydHk6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgIG1ldGhvZDogJ3Jlc29sdmVEZXNjcmlwdGlvbicsXG4gICAgICAgIGRpc2FibGVkSW5Dc3I6IHRydWUsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwcm9wZXJ0eTogJ2ltYWdlJyxcbiAgICAgICAgbWV0aG9kOiAncmVzb2x2ZUltYWdlJyxcbiAgICAgICAgZGlzYWJsZWRJbkNzcjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHByb3BlcnR5OiAncm9ib3RzJyxcbiAgICAgICAgbWV0aG9kOiAncmVzb2x2ZVJvYm90cycsXG4gICAgICAgIGRpc2FibGVkSW5Dc3I6IHRydWUsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwcm9wZXJ0eTogJ2Nhbm9uaWNhbFVybCcsXG4gICAgICAgIG1ldGhvZDogJ3Jlc29sdmVDYW5vbmljYWxVcmwnLFxuICAgICAgICBkaXNhYmxlZEluQ3NyOiB0cnVlLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGNhbm9uaWNhbFVybDoge1xuICAgICAgZm9yY2VIdHRwczogdHJ1ZSxcbiAgICAgIGZvcmNlV3d3OiBmYWxzZSxcbiAgICAgIHJlbW92ZVF1ZXJ5UGFyYW1zOiB0cnVlLFxuICAgICAgZm9yY2VUcmFpbGluZ1NsYXNoOiB0cnVlLFxuICAgIH0sXG4gIH0sXG59O1xuIl19