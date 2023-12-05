/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ConfiguratorProductScope } from '../core/model/configurator-product-scope';
export const defaultOccConfiguratorProductConfig = {
    backend: {
        occ: {
            endpoints: {
                product: {
                    configurator: 'products/${productCode}?fields=code,configurable,configuratorType',
                    configuratorProductCard: 'products/${productCode}?fields=code,description,images(DEFAULT)',
                },
            },
        },
        loadingScopes: {
            product: {
                list: {
                    include: [ConfiguratorProductScope.CONFIGURATOR],
                },
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtY29uZmlndXJhdG9yLXByb2R1Y3QtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbi9vY2MvZGVmYXVsdC1vY2MtY29uZmlndXJhdG9yLXByb2R1Y3QtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFHSCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUVwRixNQUFNLENBQUMsTUFBTSxtQ0FBbUMsR0FBYztJQUM1RCxPQUFPLEVBQUU7UUFDUCxHQUFHLEVBQUU7WUFDSCxTQUFTLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFO29CQUNQLFlBQVksRUFDVixtRUFBbUU7b0JBQ3JFLHVCQUF1QixFQUNyQixpRUFBaUU7aUJBQ3BFO2FBQ0Y7U0FDRjtRQUNELGFBQWEsRUFBRTtZQUNiLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUMsWUFBWSxDQUFDO2lCQUNqRDthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBPY2NDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yUHJvZHVjdFNjb3BlIH0gZnJvbSAnLi4vY29yZS9tb2RlbC9jb25maWd1cmF0b3ItcHJvZHVjdC1zY29wZSc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T2NjQ29uZmlndXJhdG9yUHJvZHVjdENvbmZpZzogT2NjQ29uZmlnID0ge1xuICBiYWNrZW5kOiB7XG4gICAgb2NjOiB7XG4gICAgICBlbmRwb2ludHM6IHtcbiAgICAgICAgcHJvZHVjdDoge1xuICAgICAgICAgIGNvbmZpZ3VyYXRvcjpcbiAgICAgICAgICAgICdwcm9kdWN0cy8ke3Byb2R1Y3RDb2RlfT9maWVsZHM9Y29kZSxjb25maWd1cmFibGUsY29uZmlndXJhdG9yVHlwZScsXG4gICAgICAgICAgY29uZmlndXJhdG9yUHJvZHVjdENhcmQ6XG4gICAgICAgICAgICAncHJvZHVjdHMvJHtwcm9kdWN0Q29kZX0/ZmllbGRzPWNvZGUsZGVzY3JpcHRpb24saW1hZ2VzKERFRkFVTFQpJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBsb2FkaW5nU2NvcGVzOiB7XG4gICAgICBwcm9kdWN0OiB7XG4gICAgICAgIGxpc3Q6IHtcbiAgICAgICAgICBpbmNsdWRlOiBbQ29uZmlndXJhdG9yUHJvZHVjdFNjb3BlLkNPTkZJR1VSQVRPUl0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuIl19