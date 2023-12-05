/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export function defaultOccCpqConfiguratorConfigFactory() {
    return {
        backend: {
            occ: {
                endpoints: {
                    getCpqAccessData: 'users/${userId}/access/cpqconfigurator',
                    addCpqConfigurationToCart: 'users/${userId}/carts/${cartId}/entries/cpqconfigurator',
                    readCpqConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator',
                    readCpqConfigurationForOrderEntry: 'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/cpqconfigurator',
                    updateCpqConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator',
                    createCpqConfiguration: 'products/${productCode}/configurators/cpqconfigurator',
                    readCpqConfiguration: 'cpqconfigurator/${configurationId}/configuration?tabId=${tabId}',
                    readCpqConfigurationOverview: 'cpqconfigurator/${configurationId}/configurationOverview',
                    updateCpqAttribute: 'cpqconfigurator/${configurationId}/attributes/${attributeCode}?tabId=${tabId}',
                    updateCpqAttributeValueQuantity: 'cpqconfigurator/${configurationId}/attributes/${attributeCode}/values/${attributeValueId}?tabId=${tabId}',
                    readCpqConfigurationForCartEntryFull: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator/configuration',
                    readCpqConfigurationForOrderEntryFull: 'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/cpqconfigurator/configuration',
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtY29uZmlndXJhdG9yLWNwcS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NwcS9vY2MvZGVmYXVsdC1vY2MtY29uZmlndXJhdG9yLWNwcS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sVUFBVSxzQ0FBc0M7SUFDcEQsT0FBTztRQUNMLE9BQU8sRUFBRTtZQUNQLEdBQUcsRUFBRTtnQkFDSCxTQUFTLEVBQUU7b0JBQ1QsZ0JBQWdCLEVBQUUsd0NBQXdDO29CQUMxRCx5QkFBeUIsRUFDdkIseURBQXlEO29CQUMzRCxnQ0FBZ0MsRUFDOUIsNEVBQTRFO29CQUM5RSxpQ0FBaUMsRUFDL0IsK0VBQStFO29CQUNqRixrQ0FBa0MsRUFDaEMsNEVBQTRFO29CQUM5RSxzQkFBc0IsRUFDcEIsdURBQXVEO29CQUN6RCxvQkFBb0IsRUFDbEIsaUVBQWlFO29CQUNuRSw0QkFBNEIsRUFDMUIsMERBQTBEO29CQUM1RCxrQkFBa0IsRUFDaEIsK0VBQStFO29CQUNqRiwrQkFBK0IsRUFDN0IsMEdBQTBHO29CQUM1RyxvQ0FBb0MsRUFDbEMsMEZBQTBGO29CQUM1RixxQ0FBcUMsRUFDbkMsNkZBQTZGO2lCQUNoRzthQUNGO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE9jY0NvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0T2NjQ3BxQ29uZmlndXJhdG9yQ29uZmlnRmFjdG9yeSgpOiBPY2NDb25maWcge1xuICByZXR1cm4ge1xuICAgIGJhY2tlbmQ6IHtcbiAgICAgIG9jYzoge1xuICAgICAgICBlbmRwb2ludHM6IHtcbiAgICAgICAgICBnZXRDcHFBY2Nlc3NEYXRhOiAndXNlcnMvJHt1c2VySWR9L2FjY2Vzcy9jcHFjb25maWd1cmF0b3InLFxuICAgICAgICAgIGFkZENwcUNvbmZpZ3VyYXRpb25Ub0NhcnQ6XG4gICAgICAgICAgICAndXNlcnMvJHt1c2VySWR9L2NhcnRzLyR7Y2FydElkfS9lbnRyaWVzL2NwcWNvbmZpZ3VyYXRvcicsXG4gICAgICAgICAgcmVhZENwcUNvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnk6XG4gICAgICAgICAgICAndXNlcnMvJHt1c2VySWR9L2NhcnRzLyR7Y2FydElkfS9lbnRyaWVzLyR7Y2FydEVudHJ5TnVtYmVyfS9jcHFjb25maWd1cmF0b3InLFxuICAgICAgICAgIHJlYWRDcHFDb25maWd1cmF0aW9uRm9yT3JkZXJFbnRyeTpcbiAgICAgICAgICAgICd1c2Vycy8ke3VzZXJJZH0vb3JkZXJzLyR7b3JkZXJJZH0vZW50cmllcy8ke29yZGVyRW50cnlOdW1iZXJ9L2NwcWNvbmZpZ3VyYXRvcicsXG4gICAgICAgICAgdXBkYXRlQ3BxQ29uZmlndXJhdGlvbkZvckNhcnRFbnRyeTpcbiAgICAgICAgICAgICd1c2Vycy8ke3VzZXJJZH0vY2FydHMvJHtjYXJ0SWR9L2VudHJpZXMvJHtjYXJ0RW50cnlOdW1iZXJ9L2NwcWNvbmZpZ3VyYXRvcicsXG4gICAgICAgICAgY3JlYXRlQ3BxQ29uZmlndXJhdGlvbjpcbiAgICAgICAgICAgICdwcm9kdWN0cy8ke3Byb2R1Y3RDb2RlfS9jb25maWd1cmF0b3JzL2NwcWNvbmZpZ3VyYXRvcicsXG4gICAgICAgICAgcmVhZENwcUNvbmZpZ3VyYXRpb246XG4gICAgICAgICAgICAnY3BxY29uZmlndXJhdG9yLyR7Y29uZmlndXJhdGlvbklkfS9jb25maWd1cmF0aW9uP3RhYklkPSR7dGFiSWR9JyxcbiAgICAgICAgICByZWFkQ3BxQ29uZmlndXJhdGlvbk92ZXJ2aWV3OlxuICAgICAgICAgICAgJ2NwcWNvbmZpZ3VyYXRvci8ke2NvbmZpZ3VyYXRpb25JZH0vY29uZmlndXJhdGlvbk92ZXJ2aWV3JyxcbiAgICAgICAgICB1cGRhdGVDcHFBdHRyaWJ1dGU6XG4gICAgICAgICAgICAnY3BxY29uZmlndXJhdG9yLyR7Y29uZmlndXJhdGlvbklkfS9hdHRyaWJ1dGVzLyR7YXR0cmlidXRlQ29kZX0/dGFiSWQ9JHt0YWJJZH0nLFxuICAgICAgICAgIHVwZGF0ZUNwcUF0dHJpYnV0ZVZhbHVlUXVhbnRpdHk6XG4gICAgICAgICAgICAnY3BxY29uZmlndXJhdG9yLyR7Y29uZmlndXJhdGlvbklkfS9hdHRyaWJ1dGVzLyR7YXR0cmlidXRlQ29kZX0vdmFsdWVzLyR7YXR0cmlidXRlVmFsdWVJZH0/dGFiSWQ9JHt0YWJJZH0nLFxuICAgICAgICAgIHJlYWRDcHFDb25maWd1cmF0aW9uRm9yQ2FydEVudHJ5RnVsbDpcbiAgICAgICAgICAgICd1c2Vycy8ke3VzZXJJZH0vY2FydHMvJHtjYXJ0SWR9L2VudHJpZXMvJHtjYXJ0RW50cnlOdW1iZXJ9L2NwcWNvbmZpZ3VyYXRvci9jb25maWd1cmF0aW9uJyxcbiAgICAgICAgICByZWFkQ3BxQ29uZmlndXJhdGlvbkZvck9yZGVyRW50cnlGdWxsOlxuICAgICAgICAgICAgJ3VzZXJzLyR7dXNlcklkfS9vcmRlcnMvJHtvcmRlcklkfS9lbnRyaWVzLyR7b3JkZXJFbnRyeU51bWJlcn0vY3BxY29uZmlndXJhdG9yL2NvbmZpZ3VyYXRpb24nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufVxuIl19