/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export function defaultOccVariantConfiguratorConfigFactory() {
    return {
        backend: {
            occ: {
                endpoints: {
                    createVariantConfiguration: 'products/${productCode}/configurators/ccpconfigurator',
                    readVariantConfiguration: 'ccpconfigurator/${configId}',
                    updateVariantConfiguration: 'ccpconfigurator/${configId}',
                    addVariantConfigurationToCart: 'users/${userId}/carts/${cartId}/entries/ccpconfigurator',
                    readVariantConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/ccpconfigurator',
                    updateVariantConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/ccpconfigurator',
                    readVariantConfigurationOverviewForOrderEntry: 'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/ccpconfigurator/configurationOverview',
                    readVariantConfigurationPriceSummary: 'ccpconfigurator/${configId}/pricing',
                    getVariantConfigurationOverview: 'ccpconfigurator/${configId}/configurationOverview',
                    searchConfiguratorVariants: 'ccpconfigurator/${configId}/variants',
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtY29uZmlndXJhdG9yLXZhcmlhbnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9vY2MvdmFyaWFudC9kZWZhdWx0LW9jYy1jb25maWd1cmF0b3ItdmFyaWFudC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sVUFBVSwwQ0FBMEM7SUFDeEQsT0FBTztRQUNMLE9BQU8sRUFBRTtZQUNQLEdBQUcsRUFBRTtnQkFDSCxTQUFTLEVBQUU7b0JBQ1QsMEJBQTBCLEVBQ3hCLHVEQUF1RDtvQkFFekQsd0JBQXdCLEVBQUUsNkJBQTZCO29CQUV2RCwwQkFBMEIsRUFBRSw2QkFBNkI7b0JBRXpELDZCQUE2QixFQUMzQix5REFBeUQ7b0JBRTNELG9DQUFvQyxFQUNsQyw0RUFBNEU7b0JBRTlFLHNDQUFzQyxFQUNwQyw0RUFBNEU7b0JBRTlFLDZDQUE2QyxFQUMzQyxxR0FBcUc7b0JBRXZHLG9DQUFvQyxFQUNsQyxxQ0FBcUM7b0JBRXZDLCtCQUErQixFQUM3QixtREFBbUQ7b0JBRXJELDBCQUEwQixFQUFFLHNDQUFzQztpQkFDbkU7YUFDRjtTQUNGO0tBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBPY2NDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdE9jY1ZhcmlhbnRDb25maWd1cmF0b3JDb25maWdGYWN0b3J5KCk6IE9jY0NvbmZpZyB7XG4gIHJldHVybiB7XG4gICAgYmFja2VuZDoge1xuICAgICAgb2NjOiB7XG4gICAgICAgIGVuZHBvaW50czoge1xuICAgICAgICAgIGNyZWF0ZVZhcmlhbnRDb25maWd1cmF0aW9uOlxuICAgICAgICAgICAgJ3Byb2R1Y3RzLyR7cHJvZHVjdENvZGV9L2NvbmZpZ3VyYXRvcnMvY2NwY29uZmlndXJhdG9yJyxcblxuICAgICAgICAgIHJlYWRWYXJpYW50Q29uZmlndXJhdGlvbjogJ2NjcGNvbmZpZ3VyYXRvci8ke2NvbmZpZ0lkfScsXG5cbiAgICAgICAgICB1cGRhdGVWYXJpYW50Q29uZmlndXJhdGlvbjogJ2NjcGNvbmZpZ3VyYXRvci8ke2NvbmZpZ0lkfScsXG5cbiAgICAgICAgICBhZGRWYXJpYW50Q29uZmlndXJhdGlvblRvQ2FydDpcbiAgICAgICAgICAgICd1c2Vycy8ke3VzZXJJZH0vY2FydHMvJHtjYXJ0SWR9L2VudHJpZXMvY2NwY29uZmlndXJhdG9yJyxcblxuICAgICAgICAgIHJlYWRWYXJpYW50Q29uZmlndXJhdGlvbkZvckNhcnRFbnRyeTpcbiAgICAgICAgICAgICd1c2Vycy8ke3VzZXJJZH0vY2FydHMvJHtjYXJ0SWR9L2VudHJpZXMvJHtjYXJ0RW50cnlOdW1iZXJ9L2NjcGNvbmZpZ3VyYXRvcicsXG5cbiAgICAgICAgICB1cGRhdGVWYXJpYW50Q29uZmlndXJhdGlvbkZvckNhcnRFbnRyeTpcbiAgICAgICAgICAgICd1c2Vycy8ke3VzZXJJZH0vY2FydHMvJHtjYXJ0SWR9L2VudHJpZXMvJHtjYXJ0RW50cnlOdW1iZXJ9L2NjcGNvbmZpZ3VyYXRvcicsXG5cbiAgICAgICAgICByZWFkVmFyaWFudENvbmZpZ3VyYXRpb25PdmVydmlld0Zvck9yZGVyRW50cnk6XG4gICAgICAgICAgICAndXNlcnMvJHt1c2VySWR9L29yZGVycy8ke29yZGVySWR9L2VudHJpZXMvJHtvcmRlckVudHJ5TnVtYmVyfS9jY3Bjb25maWd1cmF0b3IvY29uZmlndXJhdGlvbk92ZXJ2aWV3JyxcblxuICAgICAgICAgIHJlYWRWYXJpYW50Q29uZmlndXJhdGlvblByaWNlU3VtbWFyeTpcbiAgICAgICAgICAgICdjY3Bjb25maWd1cmF0b3IvJHtjb25maWdJZH0vcHJpY2luZycsXG5cbiAgICAgICAgICBnZXRWYXJpYW50Q29uZmlndXJhdGlvbk92ZXJ2aWV3OlxuICAgICAgICAgICAgJ2NjcGNvbmZpZ3VyYXRvci8ke2NvbmZpZ0lkfS9jb25maWd1cmF0aW9uT3ZlcnZpZXcnLFxuXG4gICAgICAgICAgc2VhcmNoQ29uZmlndXJhdG9yVmFyaWFudHM6ICdjY3Bjb25maWd1cmF0b3IvJHtjb25maWdJZH0vdmFyaWFudHMnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufVxuIl19