/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The endpoints to call from the OCC adapter for stock levels.
 */
export const defaultOccStockConfig = {
    backend: {
        occ: {
            endpoints: {
                stock: 'products/${productCode}/stock',
                stockAtStore: 'products/${productCode}/stock/${storeName}',
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2Mtc3RvY2stY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9vY2MvYWRhcHRlcnMvZGVmYXVsdC1vY2Mtc3RvY2stY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFjO0lBQzlDLE9BQU8sRUFBRTtRQUNQLEdBQUcsRUFBRTtZQUNILFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsK0JBQStCO2dCQUN0QyxZQUFZLEVBQUUsNENBQTRDO2FBQzNEO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBPY2NDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG4vKipcbiAqIFRoZSBlbmRwb2ludHMgdG8gY2FsbCBmcm9tIHRoZSBPQ0MgYWRhcHRlciBmb3Igc3RvY2sgbGV2ZWxzLlxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdE9jY1N0b2NrQ29uZmlnOiBPY2NDb25maWcgPSB7XG4gIGJhY2tlbmQ6IHtcbiAgICBvY2M6IHtcbiAgICAgIGVuZHBvaW50czoge1xuICAgICAgICBzdG9jazogJ3Byb2R1Y3RzLyR7cHJvZHVjdENvZGV9L3N0b2NrJyxcbiAgICAgICAgc3RvY2tBdFN0b3JlOiAncHJvZHVjdHMvJHtwcm9kdWN0Q29kZX0vc3RvY2svJHtzdG9yZU5hbWV9JyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=