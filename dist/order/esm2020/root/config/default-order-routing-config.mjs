/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultOrderRoutingConfig = {
    routing: {
        routes: {
            orders: {
                paths: ['my-account/orders'],
            },
            orderDetails: {
                paths: ['my-account/order/:orderCode'],
                paramsMapping: { orderCode: 'code' },
            },
            orderGuest: {
                paths: ['guest/order/:orderCode'],
                paramsMapping: { orderCode: 'code' },
            },
            orderReturn: {
                paths: ['my-account/order/return/:orderCode'],
                paramsMapping: { orderCode: 'code' },
            },
            orderReturnConfirmation: {
                paths: ['my-account/order/return/confirmation/:orderCode'],
                paramsMapping: { orderCode: 'code' },
            },
            orderCancel: {
                paths: ['my-account/order/cancel/:orderCode'],
                paramsMapping: { orderCode: 'code' },
            },
            orderCancelConfirmation: {
                paths: ['my-account/order/cancel/confirmation/:orderCode'],
                paramsMapping: { orderCode: 'code' },
            },
            returnRequestDetails: {
                paths: ['my-account/return-request/:returnCode'],
                paramsMapping: { returnCode: 'rma' },
            },
            replenishmentOrders: {
                paths: ['my-account/my-replenishments'],
            },
            replenishmentDetails: {
                paths: ['my-account/my-replenishment/:replenishmentOrderCode'],
                paramsMapping: { replenishmentOrderCode: 'replenishmentOrderCode' },
            },
            replenishmentConfirmation: { paths: ['replenishment/confirmation'] },
            orderConfirmation: { paths: ['order-confirmation'] },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vcmRlci1yb3V0aW5nLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9yb290L2NvbmZpZy9kZWZhdWx0LW9yZGVyLXJvdXRpbmctY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBa0I7SUFDdEQsT0FBTyxFQUFFO1FBQ1AsTUFBTSxFQUFFO1lBQ04sTUFBTSxFQUFFO2dCQUNOLEtBQUssRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQzdCO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLEtBQUssRUFBRSxDQUFDLDZCQUE2QixDQUFDO2dCQUN0QyxhQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO2FBQ3JDO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLEtBQUssRUFBRSxDQUFDLHdCQUF3QixDQUFDO2dCQUNqQyxhQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO2FBQ3JDO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLEtBQUssRUFBRSxDQUFDLG9DQUFvQyxDQUFDO2dCQUM3QyxhQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO2FBQ3JDO1lBQ0QsdUJBQXVCLEVBQUU7Z0JBQ3ZCLEtBQUssRUFBRSxDQUFDLGlEQUFpRCxDQUFDO2dCQUMxRCxhQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO2FBQ3JDO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLEtBQUssRUFBRSxDQUFDLG9DQUFvQyxDQUFDO2dCQUM3QyxhQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO2FBQ3JDO1lBQ0QsdUJBQXVCLEVBQUU7Z0JBQ3ZCLEtBQUssRUFBRSxDQUFDLGlEQUFpRCxDQUFDO2dCQUMxRCxhQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO2FBQ3JDO1lBQ0Qsb0JBQW9CLEVBQUU7Z0JBQ3BCLEtBQUssRUFBRSxDQUFDLHVDQUF1QyxDQUFDO2dCQUNoRCxhQUFhLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO2FBQ3JDO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ25CLEtBQUssRUFBRSxDQUFDLDhCQUE4QixDQUFDO2FBQ3hDO1lBQ0Qsb0JBQW9CLEVBQUU7Z0JBQ3BCLEtBQUssRUFBRSxDQUFDLHFEQUFxRCxDQUFDO2dCQUM5RCxhQUFhLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSx3QkFBd0IsRUFBRTthQUNwRTtZQUNELHlCQUF5QixFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsNEJBQTRCLENBQUMsRUFBRTtZQUNwRSxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7U0FDckQ7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBSb3V0aW5nQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPcmRlclJvdXRpbmdDb25maWc6IFJvdXRpbmdDb25maWcgPSB7XG4gIHJvdXRpbmc6IHtcbiAgICByb3V0ZXM6IHtcbiAgICAgIG9yZGVyczoge1xuICAgICAgICBwYXRoczogWydteS1hY2NvdW50L29yZGVycyddLFxuICAgICAgfSxcbiAgICAgIG9yZGVyRGV0YWlsczoge1xuICAgICAgICBwYXRoczogWydteS1hY2NvdW50L29yZGVyLzpvcmRlckNvZGUnXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZzogeyBvcmRlckNvZGU6ICdjb2RlJyB9LFxuICAgICAgfSxcbiAgICAgIG9yZGVyR3Vlc3Q6IHtcbiAgICAgICAgcGF0aHM6IFsnZ3Vlc3Qvb3JkZXIvOm9yZGVyQ29kZSddLFxuICAgICAgICBwYXJhbXNNYXBwaW5nOiB7IG9yZGVyQ29kZTogJ2NvZGUnIH0sXG4gICAgICB9LFxuICAgICAgb3JkZXJSZXR1cm46IHtcbiAgICAgICAgcGF0aHM6IFsnbXktYWNjb3VudC9vcmRlci9yZXR1cm4vOm9yZGVyQ29kZSddLFxuICAgICAgICBwYXJhbXNNYXBwaW5nOiB7IG9yZGVyQ29kZTogJ2NvZGUnIH0sXG4gICAgICB9LFxuICAgICAgb3JkZXJSZXR1cm5Db25maXJtYXRpb246IHtcbiAgICAgICAgcGF0aHM6IFsnbXktYWNjb3VudC9vcmRlci9yZXR1cm4vY29uZmlybWF0aW9uLzpvcmRlckNvZGUnXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZzogeyBvcmRlckNvZGU6ICdjb2RlJyB9LFxuICAgICAgfSxcbiAgICAgIG9yZGVyQ2FuY2VsOiB7XG4gICAgICAgIHBhdGhzOiBbJ215LWFjY291bnQvb3JkZXIvY2FuY2VsLzpvcmRlckNvZGUnXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZzogeyBvcmRlckNvZGU6ICdjb2RlJyB9LFxuICAgICAgfSxcbiAgICAgIG9yZGVyQ2FuY2VsQ29uZmlybWF0aW9uOiB7XG4gICAgICAgIHBhdGhzOiBbJ215LWFjY291bnQvb3JkZXIvY2FuY2VsL2NvbmZpcm1hdGlvbi86b3JkZXJDb2RlJ10sXG4gICAgICAgIHBhcmFtc01hcHBpbmc6IHsgb3JkZXJDb2RlOiAnY29kZScgfSxcbiAgICAgIH0sXG4gICAgICByZXR1cm5SZXF1ZXN0RGV0YWlsczoge1xuICAgICAgICBwYXRoczogWydteS1hY2NvdW50L3JldHVybi1yZXF1ZXN0LzpyZXR1cm5Db2RlJ10sXG4gICAgICAgIHBhcmFtc01hcHBpbmc6IHsgcmV0dXJuQ29kZTogJ3JtYScgfSxcbiAgICAgIH0sXG4gICAgICByZXBsZW5pc2htZW50T3JkZXJzOiB7XG4gICAgICAgIHBhdGhzOiBbJ215LWFjY291bnQvbXktcmVwbGVuaXNobWVudHMnXSxcbiAgICAgIH0sXG4gICAgICByZXBsZW5pc2htZW50RGV0YWlsczoge1xuICAgICAgICBwYXRoczogWydteS1hY2NvdW50L215LXJlcGxlbmlzaG1lbnQvOnJlcGxlbmlzaG1lbnRPcmRlckNvZGUnXSxcbiAgICAgICAgcGFyYW1zTWFwcGluZzogeyByZXBsZW5pc2htZW50T3JkZXJDb2RlOiAncmVwbGVuaXNobWVudE9yZGVyQ29kZScgfSxcbiAgICAgIH0sXG4gICAgICByZXBsZW5pc2htZW50Q29uZmlybWF0aW9uOiB7IHBhdGhzOiBbJ3JlcGxlbmlzaG1lbnQvY29uZmlybWF0aW9uJ10gfSxcbiAgICAgIG9yZGVyQ29uZmlybWF0aW9uOiB7IHBhdGhzOiBbJ29yZGVyLWNvbmZpcm1hdGlvbiddIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=