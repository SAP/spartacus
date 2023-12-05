/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export function defaultOccConfiguratorTextfieldConfigFactory() {
    return {
        backend: {
            occ: {
                endpoints: {
                    createTextfieldConfiguration: 'products/${productCode}/configurator/textfield',
                    addTextfieldConfigurationToCart: 'users/${userId}/carts/${cartId}/entries/configurator/textfield',
                    readTextfieldConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/configurator/textfield',
                    readTextfieldConfigurationForOrderEntry: 'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/configurator/textfield',
                    updateTextfieldConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/configurator/textfield',
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtY29uZmlndXJhdG9yLXRleHRmaWVsZC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvdGV4dGZpZWxkL29jYy9kZWZhdWx0LW9jYy1jb25maWd1cmF0b3ItdGV4dGZpZWxkLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBSUgsTUFBTSxVQUFVLDRDQUE0QztJQUMxRCxPQUFPO1FBQ0wsT0FBTyxFQUFFO1lBQ1AsR0FBRyxFQUFFO2dCQUNILFNBQVMsRUFBRTtvQkFDVCw0QkFBNEIsRUFDMUIsZ0RBQWdEO29CQUVsRCwrQkFBK0IsRUFDN0IsZ0VBQWdFO29CQUVsRSxzQ0FBc0MsRUFDcEMsbUZBQW1GO29CQUNyRix1Q0FBdUMsRUFDckMsc0ZBQXNGO29CQUN4Rix3Q0FBd0MsRUFDdEMsbUZBQW1GO2lCQUN0RjthQUNGO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE9jY0NvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0T2NjQ29uZmlndXJhdG9yVGV4dGZpZWxkQ29uZmlnRmFjdG9yeSgpOiBPY2NDb25maWcge1xuICByZXR1cm4ge1xuICAgIGJhY2tlbmQ6IHtcbiAgICAgIG9jYzoge1xuICAgICAgICBlbmRwb2ludHM6IHtcbiAgICAgICAgICBjcmVhdGVUZXh0ZmllbGRDb25maWd1cmF0aW9uOlxuICAgICAgICAgICAgJ3Byb2R1Y3RzLyR7cHJvZHVjdENvZGV9L2NvbmZpZ3VyYXRvci90ZXh0ZmllbGQnLFxuXG4gICAgICAgICAgYWRkVGV4dGZpZWxkQ29uZmlndXJhdGlvblRvQ2FydDpcbiAgICAgICAgICAgICd1c2Vycy8ke3VzZXJJZH0vY2FydHMvJHtjYXJ0SWR9L2VudHJpZXMvY29uZmlndXJhdG9yL3RleHRmaWVsZCcsXG5cbiAgICAgICAgICByZWFkVGV4dGZpZWxkQ29uZmlndXJhdGlvbkZvckNhcnRFbnRyeTpcbiAgICAgICAgICAgICd1c2Vycy8ke3VzZXJJZH0vY2FydHMvJHtjYXJ0SWR9L2VudHJpZXMvJHtjYXJ0RW50cnlOdW1iZXJ9L2NvbmZpZ3VyYXRvci90ZXh0ZmllbGQnLFxuICAgICAgICAgIHJlYWRUZXh0ZmllbGRDb25maWd1cmF0aW9uRm9yT3JkZXJFbnRyeTpcbiAgICAgICAgICAgICd1c2Vycy8ke3VzZXJJZH0vb3JkZXJzLyR7b3JkZXJJZH0vZW50cmllcy8ke29yZGVyRW50cnlOdW1iZXJ9L2NvbmZpZ3VyYXRvci90ZXh0ZmllbGQnLFxuICAgICAgICAgIHVwZGF0ZVRleHRmaWVsZENvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnk6XG4gICAgICAgICAgICAndXNlcnMvJHt1c2VySWR9L2NhcnRzLyR7Y2FydElkfS9lbnRyaWVzLyR7Y2FydEVudHJ5TnVtYmVyfS9jb25maWd1cmF0b3IvdGV4dGZpZWxkJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn1cbiJdfQ==