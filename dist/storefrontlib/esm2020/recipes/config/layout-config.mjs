/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The layout configuration is used to define the overall layout of the storefront.
 * The configuration includes the following aspects:
 * - breakpoint layout (AKA screen layout)
 * - Page sections slot configuration (i.e. header vs footer)
 * - page template slot configuration (i.e. landing page template vs PDP page template)
 * - deferred loading configuration
 *
 * The page slot configurations is directly related to the data in the backend. If you use the
 * Spartacus sample-data, you will have an aligned setup. However, if you introduce custom page
 * templates and/or slots, you most likely need to further adjust or replace this configuration.
 */
export const layoutConfig = {
    // deferredLoading: {
    //   strategy: DeferLoadingStrategy.DEFER,
    //   intersectionMargin: '50px',
    // },
    layoutSlots: {
        header: {
            lg: {
                slots: [
                    'PreHeader',
                    'SiteContext',
                    'SiteLinks',
                    'SiteLogo',
                    'SearchBox',
                    'SiteLogin',
                    'MiniCart',
                    'NavigationBar',
                ],
            },
            slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
        },
        navigation: {
            lg: { slots: [] },
            slots: ['SiteLogin', 'NavigationBar', 'SiteContext', 'SiteLinks'],
        },
        footer: {
            slots: ['Footer'],
        },
        LandingPage2Template: {
            pageFold: 'Section2B',
            slots: [
                'Section1',
                'Section2A',
                'Section2B',
                'Section2C',
                'Section3',
                'Section4',
                'Section5',
            ],
        },
        ContentPage1Template: {
            slots: ['Section2A', 'Section2B'],
        },
        CategoryPageTemplate: {
            pageFold: 'Section2',
            slots: ['Section1', 'Section2', 'Section3'],
        },
        ProductListPageTemplate: {
            slots: ['ProductLeftRefinements', 'ProductListSlot'],
        },
        ProductGridPageTemplate: {
            slots: ['ProductLeftRefinements', 'ProductGridSlot'],
        },
        SearchResultsListPageTemplate: {
            slots: [
                'Section2',
                'ProductLeftRefinements',
                'SearchResultsListSlot',
                'Section4',
            ],
        },
        SearchResultsGridPageTemplate: {
            slots: [
                'Section2',
                'ProductLeftRefinements',
                'SearchResultsGridSlot',
                'Section4',
            ],
        },
        ProductDetailsPageTemplate: {
            lg: {
                pageFold: 'UpSelling',
            },
            pageFold: 'Summary',
            slots: [
                'Summary',
                'UpSelling',
                'CrossSelling',
                'Tabs',
                'PlaceholderContentSlot',
            ],
        },
        CartPageTemplate: {
            slots: ['TopContent', 'CenterRightContentSlot', 'EmptyCartMiddleContent'],
        },
        AccountPageTemplate: {
            slots: ['BodyContent', 'SideContent'],
        },
        LoginPageTemplate: {
            slots: ['LeftContentSlot', 'RightContentSlot'],
        },
        ErrorPageTemplate: {
            slots: ['TopContent', 'MiddleContent', 'BottomContent'],
        },
        OrderConfirmationPageTemplate: {
            slots: ['BodyContent', 'SideContent'],
        },
        MultiStepCheckoutSummaryPageTemplate: {
            slots: ['TopContent', 'BodyContent', 'SideContent', 'BottomContent'],
        },
        CheckoutLoginPageTemplate: {
            slots: ['RightContentSlot'],
        },
        MyAccountViewPageTemplate: {
            slots: ['LeftContentSlot', 'RightContentSlot'],
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvcmVjaXBlcy9jb25maWcvbGF5b3V0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBSUg7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQWlCO0lBQ3hDLHFCQUFxQjtJQUNyQiwwQ0FBMEM7SUFDMUMsZ0NBQWdDO0lBQ2hDLEtBQUs7SUFDTCxXQUFXLEVBQUU7UUFDWCxNQUFNLEVBQUU7WUFDTixFQUFFLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFO29CQUNMLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYixXQUFXO29CQUNYLFVBQVU7b0JBQ1YsV0FBVztvQkFDWCxXQUFXO29CQUNYLFVBQVU7b0JBQ1YsZUFBZTtpQkFDaEI7YUFDRjtZQUNELEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQztTQUMxRDtRQUNELFVBQVUsRUFBRTtZQUNWLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDakIsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDO1NBQ2xFO1FBQ0QsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDO1NBQ2xCO1FBQ0Qsb0JBQW9CLEVBQUU7WUFDcEIsUUFBUSxFQUFFLFdBQVc7WUFDckIsS0FBSyxFQUFFO2dCQUNMLFVBQVU7Z0JBQ1YsV0FBVztnQkFDWCxXQUFXO2dCQUNYLFdBQVc7Z0JBQ1gsVUFBVTtnQkFDVixVQUFVO2dCQUNWLFVBQVU7YUFDWDtTQUNGO1FBQ0Qsb0JBQW9CLEVBQUU7WUFDcEIsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztTQUNsQztRQUNELG9CQUFvQixFQUFFO1lBQ3BCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLEtBQUssRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO1NBQzVDO1FBQ0QsdUJBQXVCLEVBQUU7WUFDdkIsS0FBSyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsaUJBQWlCLENBQUM7U0FDckQ7UUFDRCx1QkFBdUIsRUFBRTtZQUN2QixLQUFLLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxpQkFBaUIsQ0FBQztTQUNyRDtRQUNELDZCQUE2QixFQUFFO1lBQzdCLEtBQUssRUFBRTtnQkFDTCxVQUFVO2dCQUNWLHdCQUF3QjtnQkFDeEIsdUJBQXVCO2dCQUN2QixVQUFVO2FBQ1g7U0FDRjtRQUNELDZCQUE2QixFQUFFO1lBQzdCLEtBQUssRUFBRTtnQkFDTCxVQUFVO2dCQUNWLHdCQUF3QjtnQkFDeEIsdUJBQXVCO2dCQUN2QixVQUFVO2FBQ1g7U0FDRjtRQUNELDBCQUEwQixFQUFFO1lBQzFCLEVBQUUsRUFBRTtnQkFDRixRQUFRLEVBQUUsV0FBVzthQUN0QjtZQUNELFFBQVEsRUFBRSxTQUFTO1lBQ25CLEtBQUssRUFBRTtnQkFDTCxTQUFTO2dCQUNULFdBQVc7Z0JBQ1gsY0FBYztnQkFDZCxNQUFNO2dCQUNOLHdCQUF3QjthQUN6QjtTQUNGO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDaEIsS0FBSyxFQUFFLENBQUMsWUFBWSxFQUFFLHdCQUF3QixFQUFFLHdCQUF3QixDQUFDO1NBQzFFO1FBQ0QsbUJBQW1CLEVBQUU7WUFDbkIsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQztTQUN0QztRQUNELGlCQUFpQixFQUFFO1lBQ2pCLEtBQUssRUFBRSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDO1NBQy9DO1FBQ0QsaUJBQWlCLEVBQUU7WUFDakIsS0FBSyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUM7U0FDeEQ7UUFDRCw2QkFBNkIsRUFBRTtZQUM3QixLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDO1NBQ3RDO1FBQ0Qsb0NBQW9DLEVBQUU7WUFDcEMsS0FBSyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDO1NBQ3JFO1FBQ0QseUJBQXlCLEVBQUU7WUFDekIsS0FBSyxFQUFFLENBQUMsa0JBQWtCLENBQUM7U0FDNUI7UUFDRCx5QkFBeUIsRUFBRTtZQUN6QixLQUFLLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQztTQUMvQztLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IExheW91dENvbmZpZyB9IGZyb20gJy4uLy4uL2xheW91dC9jb25maWcvbGF5b3V0LWNvbmZpZyc7XG5cbi8qKlxuICogVGhlIGxheW91dCBjb25maWd1cmF0aW9uIGlzIHVzZWQgdG8gZGVmaW5lIHRoZSBvdmVyYWxsIGxheW91dCBvZiB0aGUgc3RvcmVmcm9udC5cbiAqIFRoZSBjb25maWd1cmF0aW9uIGluY2x1ZGVzIHRoZSBmb2xsb3dpbmcgYXNwZWN0czpcbiAqIC0gYnJlYWtwb2ludCBsYXlvdXQgKEFLQSBzY3JlZW4gbGF5b3V0KVxuICogLSBQYWdlIHNlY3Rpb25zIHNsb3QgY29uZmlndXJhdGlvbiAoaS5lLiBoZWFkZXIgdnMgZm9vdGVyKVxuICogLSBwYWdlIHRlbXBsYXRlIHNsb3QgY29uZmlndXJhdGlvbiAoaS5lLiBsYW5kaW5nIHBhZ2UgdGVtcGxhdGUgdnMgUERQIHBhZ2UgdGVtcGxhdGUpXG4gKiAtIGRlZmVycmVkIGxvYWRpbmcgY29uZmlndXJhdGlvblxuICpcbiAqIFRoZSBwYWdlIHNsb3QgY29uZmlndXJhdGlvbnMgaXMgZGlyZWN0bHkgcmVsYXRlZCB0byB0aGUgZGF0YSBpbiB0aGUgYmFja2VuZC4gSWYgeW91IHVzZSB0aGVcbiAqIFNwYXJ0YWN1cyBzYW1wbGUtZGF0YSwgeW91IHdpbGwgaGF2ZSBhbiBhbGlnbmVkIHNldHVwLiBIb3dldmVyLCBpZiB5b3UgaW50cm9kdWNlIGN1c3RvbSBwYWdlXG4gKiB0ZW1wbGF0ZXMgYW5kL29yIHNsb3RzLCB5b3UgbW9zdCBsaWtlbHkgbmVlZCB0byBmdXJ0aGVyIGFkanVzdCBvciByZXBsYWNlIHRoaXMgY29uZmlndXJhdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGxheW91dENvbmZpZzogTGF5b3V0Q29uZmlnID0ge1xuICAvLyBkZWZlcnJlZExvYWRpbmc6IHtcbiAgLy8gICBzdHJhdGVneTogRGVmZXJMb2FkaW5nU3RyYXRlZ3kuREVGRVIsXG4gIC8vICAgaW50ZXJzZWN0aW9uTWFyZ2luOiAnNTBweCcsXG4gIC8vIH0sXG4gIGxheW91dFNsb3RzOiB7XG4gICAgaGVhZGVyOiB7XG4gICAgICBsZzoge1xuICAgICAgICBzbG90czogW1xuICAgICAgICAgICdQcmVIZWFkZXInLFxuICAgICAgICAgICdTaXRlQ29udGV4dCcsXG4gICAgICAgICAgJ1NpdGVMaW5rcycsXG4gICAgICAgICAgJ1NpdGVMb2dvJyxcbiAgICAgICAgICAnU2VhcmNoQm94JyxcbiAgICAgICAgICAnU2l0ZUxvZ2luJyxcbiAgICAgICAgICAnTWluaUNhcnQnLFxuICAgICAgICAgICdOYXZpZ2F0aW9uQmFyJyxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBzbG90czogWydQcmVIZWFkZXInLCAnU2l0ZUxvZ28nLCAnU2VhcmNoQm94JywgJ01pbmlDYXJ0J10sXG4gICAgfSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBsZzogeyBzbG90czogW10gfSxcbiAgICAgIHNsb3RzOiBbJ1NpdGVMb2dpbicsICdOYXZpZ2F0aW9uQmFyJywgJ1NpdGVDb250ZXh0JywgJ1NpdGVMaW5rcyddLFxuICAgIH0sXG4gICAgZm9vdGVyOiB7XG4gICAgICBzbG90czogWydGb290ZXInXSxcbiAgICB9LFxuICAgIExhbmRpbmdQYWdlMlRlbXBsYXRlOiB7XG4gICAgICBwYWdlRm9sZDogJ1NlY3Rpb24yQicsXG4gICAgICBzbG90czogW1xuICAgICAgICAnU2VjdGlvbjEnLFxuICAgICAgICAnU2VjdGlvbjJBJyxcbiAgICAgICAgJ1NlY3Rpb24yQicsXG4gICAgICAgICdTZWN0aW9uMkMnLFxuICAgICAgICAnU2VjdGlvbjMnLFxuICAgICAgICAnU2VjdGlvbjQnLFxuICAgICAgICAnU2VjdGlvbjUnLFxuICAgICAgXSxcbiAgICB9LFxuICAgIENvbnRlbnRQYWdlMVRlbXBsYXRlOiB7XG4gICAgICBzbG90czogWydTZWN0aW9uMkEnLCAnU2VjdGlvbjJCJ10sXG4gICAgfSxcbiAgICBDYXRlZ29yeVBhZ2VUZW1wbGF0ZToge1xuICAgICAgcGFnZUZvbGQ6ICdTZWN0aW9uMicsXG4gICAgICBzbG90czogWydTZWN0aW9uMScsICdTZWN0aW9uMicsICdTZWN0aW9uMyddLFxuICAgIH0sXG4gICAgUHJvZHVjdExpc3RQYWdlVGVtcGxhdGU6IHtcbiAgICAgIHNsb3RzOiBbJ1Byb2R1Y3RMZWZ0UmVmaW5lbWVudHMnLCAnUHJvZHVjdExpc3RTbG90J10sXG4gICAgfSxcbiAgICBQcm9kdWN0R3JpZFBhZ2VUZW1wbGF0ZToge1xuICAgICAgc2xvdHM6IFsnUHJvZHVjdExlZnRSZWZpbmVtZW50cycsICdQcm9kdWN0R3JpZFNsb3QnXSxcbiAgICB9LFxuICAgIFNlYXJjaFJlc3VsdHNMaXN0UGFnZVRlbXBsYXRlOiB7XG4gICAgICBzbG90czogW1xuICAgICAgICAnU2VjdGlvbjInLFxuICAgICAgICAnUHJvZHVjdExlZnRSZWZpbmVtZW50cycsXG4gICAgICAgICdTZWFyY2hSZXN1bHRzTGlzdFNsb3QnLFxuICAgICAgICAnU2VjdGlvbjQnLFxuICAgICAgXSxcbiAgICB9LFxuICAgIFNlYXJjaFJlc3VsdHNHcmlkUGFnZVRlbXBsYXRlOiB7XG4gICAgICBzbG90czogW1xuICAgICAgICAnU2VjdGlvbjInLFxuICAgICAgICAnUHJvZHVjdExlZnRSZWZpbmVtZW50cycsXG4gICAgICAgICdTZWFyY2hSZXN1bHRzR3JpZFNsb3QnLFxuICAgICAgICAnU2VjdGlvbjQnLFxuICAgICAgXSxcbiAgICB9LFxuICAgIFByb2R1Y3REZXRhaWxzUGFnZVRlbXBsYXRlOiB7XG4gICAgICBsZzoge1xuICAgICAgICBwYWdlRm9sZDogJ1VwU2VsbGluZycsXG4gICAgICB9LFxuICAgICAgcGFnZUZvbGQ6ICdTdW1tYXJ5JyxcbiAgICAgIHNsb3RzOiBbXG4gICAgICAgICdTdW1tYXJ5JyxcbiAgICAgICAgJ1VwU2VsbGluZycsXG4gICAgICAgICdDcm9zc1NlbGxpbmcnLFxuICAgICAgICAnVGFicycsXG4gICAgICAgICdQbGFjZWhvbGRlckNvbnRlbnRTbG90JyxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBDYXJ0UGFnZVRlbXBsYXRlOiB7XG4gICAgICBzbG90czogWydUb3BDb250ZW50JywgJ0NlbnRlclJpZ2h0Q29udGVudFNsb3QnLCAnRW1wdHlDYXJ0TWlkZGxlQ29udGVudCddLFxuICAgIH0sXG4gICAgQWNjb3VudFBhZ2VUZW1wbGF0ZToge1xuICAgICAgc2xvdHM6IFsnQm9keUNvbnRlbnQnLCAnU2lkZUNvbnRlbnQnXSxcbiAgICB9LFxuICAgIExvZ2luUGFnZVRlbXBsYXRlOiB7XG4gICAgICBzbG90czogWydMZWZ0Q29udGVudFNsb3QnLCAnUmlnaHRDb250ZW50U2xvdCddLFxuICAgIH0sXG4gICAgRXJyb3JQYWdlVGVtcGxhdGU6IHtcbiAgICAgIHNsb3RzOiBbJ1RvcENvbnRlbnQnLCAnTWlkZGxlQ29udGVudCcsICdCb3R0b21Db250ZW50J10sXG4gICAgfSxcbiAgICBPcmRlckNvbmZpcm1hdGlvblBhZ2VUZW1wbGF0ZToge1xuICAgICAgc2xvdHM6IFsnQm9keUNvbnRlbnQnLCAnU2lkZUNvbnRlbnQnXSxcbiAgICB9LFxuICAgIE11bHRpU3RlcENoZWNrb3V0U3VtbWFyeVBhZ2VUZW1wbGF0ZToge1xuICAgICAgc2xvdHM6IFsnVG9wQ29udGVudCcsICdCb2R5Q29udGVudCcsICdTaWRlQ29udGVudCcsICdCb3R0b21Db250ZW50J10sXG4gICAgfSxcbiAgICBDaGVja291dExvZ2luUGFnZVRlbXBsYXRlOiB7XG4gICAgICBzbG90czogWydSaWdodENvbnRlbnRTbG90J10sXG4gICAgfSxcbiAgICBNeUFjY291bnRWaWV3UGFnZVRlbXBsYXRlOiB7XG4gICAgICBzbG90czogWydMZWZ0Q29udGVudFNsb3QnLCAnUmlnaHRDb250ZW50U2xvdCddLFxuICAgIH0sXG4gIH0sXG59O1xuIl19