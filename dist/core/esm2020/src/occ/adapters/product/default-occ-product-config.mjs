/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultOccProductConfig = {
    backend: {
        occ: {
            endpoints: {
                product: {
                    default: 'products/${productCode}?fields=DEFAULT,averageRating,images(FULL),classifications,manufacturer,numberOfReviews,categories(FULL),baseOptions,baseProduct,variantOptions,variantType',
                    list: 'products/${productCode}?fields=code,name,summary,price(formattedValue),images(DEFAULT,galleryIndex),baseProduct',
                    details: 'products/${productCode}?fields=averageRating,stock(DEFAULT),description,availableForPickup,code,url,price(DEFAULT),numberOfReviews,manufacturer,categories(FULL),priceRange,multidimensional,tags,images(FULL)',
                    attributes: 'products/${productCode}?fields=classifications',
                    price: 'products/${productCode}?fields=price(formattedValue)',
                    stock: 'products/${productCode}?fields=stock(DEFAULT)',
                },
                productReviews: 'products/${productCode}/reviews',
                // Uncomment this when occ gets configured
                // productReferences:
                //   'products/${productCode}/references?fields=DEFAULT,references(target(images(FULL)))&referenceType=${referenceType}',
                productReferences: 'products/${productCode}/references?fields=DEFAULT,references(target(images(FULL)))',
                /* eslint-disable max-len */
                productSearch: 'products/search?fields=products(code,name,summary,configurable,configuratorType,multidimensional,price(FULL),images(DEFAULT),stock(FULL),averageRating,variantOptions),facets,breadcrumbs,pagination(DEFAULT),sorts(DEFAULT),freeTextSearch,currentQuery',
                /* eslint-enable */
                productSuggestions: 'products/suggestions',
            },
        },
        loadingScopes: {
            product: {
                details: {
                    include: ["list" /* ProductScope.LIST */, "variants" /* ProductScope.VARIANTS */],
                },
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtcHJvZHVjdC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvcHJvZHVjdC9kZWZhdWx0LW9jYy1wcm9kdWN0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBS0gsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQWM7SUFDaEQsT0FBTyxFQUFFO1FBQ1AsR0FBRyxFQUFFO1lBQ0gsU0FBUyxFQUFFO2dCQUNULE9BQU8sRUFBRTtvQkFDUCxPQUFPLEVBQ0wsb0xBQW9MO29CQUN0TCxJQUFJLEVBQUUsaUhBQWlIO29CQUN2SCxPQUFPLEVBQ0wsZ05BQWdOO29CQUNsTixVQUFVLEVBQUUsZ0RBQWdEO29CQUM1RCxLQUFLLEVBQUUsc0RBQXNEO29CQUM3RCxLQUFLLEVBQUUsK0NBQStDO2lCQUN2RDtnQkFFRCxjQUFjLEVBQUUsaUNBQWlDO2dCQUNqRCwwQ0FBMEM7Z0JBQzFDLHFCQUFxQjtnQkFDckIseUhBQXlIO2dCQUN6SCxpQkFBaUIsRUFDZixvRkFBb0Y7Z0JBQ3RGLDRCQUE0QjtnQkFDNUIsYUFBYSxFQUNYLDBQQUEwUDtnQkFDNVAsbUJBQW1CO2dCQUNuQixrQkFBa0IsRUFBRSxzQkFBc0I7YUFDM0M7U0FDRjtRQUNELGFBQWEsRUFBRTtZQUNiLE9BQU8sRUFBRTtnQkFDUCxPQUFPLEVBQUU7b0JBQ1AsT0FBTyxFQUFFLHdFQUEwQztpQkFDcEQ7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgUHJvZHVjdFNjb3BlIH0gZnJvbSAnLi4vLi4vLi4vcHJvZHVjdC9tb2RlbC9wcm9kdWN0LXNjb3BlJztcbmltcG9ydCB7IE9jY0NvbmZpZyB9IGZyb20gJy4uLy4uL2NvbmZpZy9vY2MtY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPY2NQcm9kdWN0Q29uZmlnOiBPY2NDb25maWcgPSB7XG4gIGJhY2tlbmQ6IHtcbiAgICBvY2M6IHtcbiAgICAgIGVuZHBvaW50czoge1xuICAgICAgICBwcm9kdWN0OiB7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICdwcm9kdWN0cy8ke3Byb2R1Y3RDb2RlfT9maWVsZHM9REVGQVVMVCxhdmVyYWdlUmF0aW5nLGltYWdlcyhGVUxMKSxjbGFzc2lmaWNhdGlvbnMsbWFudWZhY3R1cmVyLG51bWJlck9mUmV2aWV3cyxjYXRlZ29yaWVzKEZVTEwpLGJhc2VPcHRpb25zLGJhc2VQcm9kdWN0LHZhcmlhbnRPcHRpb25zLHZhcmlhbnRUeXBlJyxcbiAgICAgICAgICBsaXN0OiAncHJvZHVjdHMvJHtwcm9kdWN0Q29kZX0/ZmllbGRzPWNvZGUsbmFtZSxzdW1tYXJ5LHByaWNlKGZvcm1hdHRlZFZhbHVlKSxpbWFnZXMoREVGQVVMVCxnYWxsZXJ5SW5kZXgpLGJhc2VQcm9kdWN0JyxcbiAgICAgICAgICBkZXRhaWxzOlxuICAgICAgICAgICAgJ3Byb2R1Y3RzLyR7cHJvZHVjdENvZGV9P2ZpZWxkcz1hdmVyYWdlUmF0aW5nLHN0b2NrKERFRkFVTFQpLGRlc2NyaXB0aW9uLGF2YWlsYWJsZUZvclBpY2t1cCxjb2RlLHVybCxwcmljZShERUZBVUxUKSxudW1iZXJPZlJldmlld3MsbWFudWZhY3R1cmVyLGNhdGVnb3JpZXMoRlVMTCkscHJpY2VSYW5nZSxtdWx0aWRpbWVuc2lvbmFsLHRhZ3MsaW1hZ2VzKEZVTEwpJyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiAncHJvZHVjdHMvJHtwcm9kdWN0Q29kZX0/ZmllbGRzPWNsYXNzaWZpY2F0aW9ucycsXG4gICAgICAgICAgcHJpY2U6ICdwcm9kdWN0cy8ke3Byb2R1Y3RDb2RlfT9maWVsZHM9cHJpY2UoZm9ybWF0dGVkVmFsdWUpJyxcbiAgICAgICAgICBzdG9jazogJ3Byb2R1Y3RzLyR7cHJvZHVjdENvZGV9P2ZpZWxkcz1zdG9jayhERUZBVUxUKScsXG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJvZHVjdFJldmlld3M6ICdwcm9kdWN0cy8ke3Byb2R1Y3RDb2RlfS9yZXZpZXdzJyxcbiAgICAgICAgLy8gVW5jb21tZW50IHRoaXMgd2hlbiBvY2MgZ2V0cyBjb25maWd1cmVkXG4gICAgICAgIC8vIHByb2R1Y3RSZWZlcmVuY2VzOlxuICAgICAgICAvLyAgICdwcm9kdWN0cy8ke3Byb2R1Y3RDb2RlfS9yZWZlcmVuY2VzP2ZpZWxkcz1ERUZBVUxULHJlZmVyZW5jZXModGFyZ2V0KGltYWdlcyhGVUxMKSkpJnJlZmVyZW5jZVR5cGU9JHtyZWZlcmVuY2VUeXBlfScsXG4gICAgICAgIHByb2R1Y3RSZWZlcmVuY2VzOlxuICAgICAgICAgICdwcm9kdWN0cy8ke3Byb2R1Y3RDb2RlfS9yZWZlcmVuY2VzP2ZpZWxkcz1ERUZBVUxULHJlZmVyZW5jZXModGFyZ2V0KGltYWdlcyhGVUxMKSkpJyxcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuICAgICAgICBwcm9kdWN0U2VhcmNoOlxuICAgICAgICAgICdwcm9kdWN0cy9zZWFyY2g/ZmllbGRzPXByb2R1Y3RzKGNvZGUsbmFtZSxzdW1tYXJ5LGNvbmZpZ3VyYWJsZSxjb25maWd1cmF0b3JUeXBlLG11bHRpZGltZW5zaW9uYWwscHJpY2UoRlVMTCksaW1hZ2VzKERFRkFVTFQpLHN0b2NrKEZVTEwpLGF2ZXJhZ2VSYXRpbmcsdmFyaWFudE9wdGlvbnMpLGZhY2V0cyxicmVhZGNydW1icyxwYWdpbmF0aW9uKERFRkFVTFQpLHNvcnRzKERFRkFVTFQpLGZyZWVUZXh0U2VhcmNoLGN1cnJlbnRRdWVyeScsXG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICAgICAgcHJvZHVjdFN1Z2dlc3Rpb25zOiAncHJvZHVjdHMvc3VnZ2VzdGlvbnMnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGxvYWRpbmdTY29wZXM6IHtcbiAgICAgIHByb2R1Y3Q6IHtcbiAgICAgICAgZGV0YWlsczoge1xuICAgICAgICAgIGluY2x1ZGU6IFtQcm9kdWN0U2NvcGUuTElTVCwgUHJvZHVjdFNjb3BlLlZBUklBTlRTXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=