/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ICON_TYPE } from '@spartacus/storefront';
import { CustomerListColumnActionType } from '../model/customer-list.model';
export const defaultAsmConfig = {
    asm: {
        agentSessionTimer: {
            startingDelayInSeconds: 600,
        },
        customerSearch: {
            maxResults: 20,
        },
        customerList: {
            pageSize: 5,
            showAvatar: true,
            columns: [
                {
                    headerLocalizationKey: 'asm.customerList.tableHeader.customer',
                    renderer: (customer) => {
                        return customer?.name ?? '';
                    },
                    actionType: CustomerListColumnActionType.START_SESSION,
                },
                {
                    headerLocalizationKey: 'asm.customerList.tableHeader.email',
                    renderer: (customer) => {
                        return customer?.uid ?? '';
                    },
                },
                {
                    headerLocalizationKey: 'asm.customerList.tableHeader.phone',
                    renderer: (customer) => {
                        return customer?.defaultAddress?.phone ?? '';
                    },
                },
                {
                    headerLocalizationKey: 'asm.customerList.tableHeader.account',
                    renderer: (customer) => {
                        return customer?.orgUnit?.name ?? '';
                    },
                },
                {
                    headerLocalizationKey: 'asm.customerList.tableHeader.cart',
                    icon: {
                        symbol: ICON_TYPE.CART,
                        captionLocalizationKey: 'asm.customerList.tableHeader.cart',
                    },
                    actionType: CustomerListColumnActionType.ACTIVE_CART,
                },
                {
                    headerLocalizationKey: 'asm.customerList.tableHeader.order',
                    icon: {
                        symbol: ICON_TYPE.ORDER,
                        captionLocalizationKey: 'asm.customerList.tableHeader.order',
                    },
                    actionType: CustomerListColumnActionType.ORDER_HISTORY,
                },
            ],
        },
        userIdHttpHeader: {
            enable: true,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1hc20tY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9yb290L2NvbmZpZy9kZWZhdWx0LWFzbS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUc1RSxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBYztJQUN6QyxHQUFHLEVBQUU7UUFDSCxpQkFBaUIsRUFBRTtZQUNqQixzQkFBc0IsRUFBRSxHQUFHO1NBQzVCO1FBQ0QsY0FBYyxFQUFFO1lBQ2QsVUFBVSxFQUFFLEVBQUU7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNaLFFBQVEsRUFBRSxDQUFDO1lBQ1gsVUFBVSxFQUFFLElBQUk7WUFDaEIsT0FBTyxFQUFFO2dCQUNQO29CQUNFLHFCQUFxQixFQUFFLHVDQUF1QztvQkFDOUQsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ3JCLE9BQU8sUUFBUSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQzlCLENBQUM7b0JBQ0QsVUFBVSxFQUFFLDRCQUE0QixDQUFDLGFBQWE7aUJBQ3ZEO2dCQUNEO29CQUNFLHFCQUFxQixFQUFFLG9DQUFvQztvQkFDM0QsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ3JCLE9BQU8sUUFBUSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7b0JBQzdCLENBQUM7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UscUJBQXFCLEVBQUUsb0NBQW9DO29CQUMzRCxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDckIsT0FBTyxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQy9DLENBQUM7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UscUJBQXFCLEVBQUUsc0NBQXNDO29CQUM3RCxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDckIsT0FBTyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ3ZDLENBQUM7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UscUJBQXFCLEVBQUUsbUNBQW1DO29CQUMxRCxJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJO3dCQUN0QixzQkFBc0IsRUFBRSxtQ0FBbUM7cUJBQzVEO29CQUNELFVBQVUsRUFBRSw0QkFBNEIsQ0FBQyxXQUFXO2lCQUNyRDtnQkFDRDtvQkFDRSxxQkFBcUIsRUFBRSxvQ0FBb0M7b0JBQzNELElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUUsU0FBUyxDQUFDLEtBQUs7d0JBQ3ZCLHNCQUFzQixFQUFFLG9DQUFvQztxQkFDN0Q7b0JBQ0QsVUFBVSxFQUFFLDRCQUE0QixDQUFDLGFBQWE7aUJBQ3ZEO2FBQ0Y7U0FDRjtRQUNELGdCQUFnQixFQUFFO1lBQ2hCLE1BQU0sRUFBRSxJQUFJO1NBQ2I7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ3VzdG9tZXJMaXN0Q29sdW1uQWN0aW9uVHlwZSB9IGZyb20gJy4uL21vZGVsL2N1c3RvbWVyLWxpc3QubW9kZWwnO1xuaW1wb3J0IHsgQXNtQ29uZmlnIH0gZnJvbSAnLi9hc20tY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRBc21Db25maWc6IEFzbUNvbmZpZyA9IHtcbiAgYXNtOiB7XG4gICAgYWdlbnRTZXNzaW9uVGltZXI6IHtcbiAgICAgIHN0YXJ0aW5nRGVsYXlJblNlY29uZHM6IDYwMCxcbiAgICB9LFxuICAgIGN1c3RvbWVyU2VhcmNoOiB7XG4gICAgICBtYXhSZXN1bHRzOiAyMCxcbiAgICB9LFxuICAgIGN1c3RvbWVyTGlzdDoge1xuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBzaG93QXZhdGFyOiB0cnVlLFxuICAgICAgY29sdW1uczogW1xuICAgICAgICB7XG4gICAgICAgICAgaGVhZGVyTG9jYWxpemF0aW9uS2V5OiAnYXNtLmN1c3RvbWVyTGlzdC50YWJsZUhlYWRlci5jdXN0b21lcicsXG4gICAgICAgICAgcmVuZGVyZXI6IChjdXN0b21lcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGN1c3RvbWVyPy5uYW1lID8/ICcnO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uVHlwZTogQ3VzdG9tZXJMaXN0Q29sdW1uQWN0aW9uVHlwZS5TVEFSVF9TRVNTSU9OLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaGVhZGVyTG9jYWxpemF0aW9uS2V5OiAnYXNtLmN1c3RvbWVyTGlzdC50YWJsZUhlYWRlci5lbWFpbCcsXG4gICAgICAgICAgcmVuZGVyZXI6IChjdXN0b21lcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGN1c3RvbWVyPy51aWQgPz8gJyc7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGhlYWRlckxvY2FsaXphdGlvbktleTogJ2FzbS5jdXN0b21lckxpc3QudGFibGVIZWFkZXIucGhvbmUnLFxuICAgICAgICAgIHJlbmRlcmVyOiAoY3VzdG9tZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjdXN0b21lcj8uZGVmYXVsdEFkZHJlc3M/LnBob25lID8/ICcnO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBoZWFkZXJMb2NhbGl6YXRpb25LZXk6ICdhc20uY3VzdG9tZXJMaXN0LnRhYmxlSGVhZGVyLmFjY291bnQnLFxuICAgICAgICAgIHJlbmRlcmVyOiAoY3VzdG9tZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjdXN0b21lcj8ub3JnVW5pdD8ubmFtZSA/PyAnJztcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaGVhZGVyTG9jYWxpemF0aW9uS2V5OiAnYXNtLmN1c3RvbWVyTGlzdC50YWJsZUhlYWRlci5jYXJ0JyxcbiAgICAgICAgICBpY29uOiB7XG4gICAgICAgICAgICBzeW1ib2w6IElDT05fVFlQRS5DQVJULFxuICAgICAgICAgICAgY2FwdGlvbkxvY2FsaXphdGlvbktleTogJ2FzbS5jdXN0b21lckxpc3QudGFibGVIZWFkZXIuY2FydCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25UeXBlOiBDdXN0b21lckxpc3RDb2x1bW5BY3Rpb25UeXBlLkFDVElWRV9DQVJULFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaGVhZGVyTG9jYWxpemF0aW9uS2V5OiAnYXNtLmN1c3RvbWVyTGlzdC50YWJsZUhlYWRlci5vcmRlcicsXG4gICAgICAgICAgaWNvbjoge1xuICAgICAgICAgICAgc3ltYm9sOiBJQ09OX1RZUEUuT1JERVIsXG4gICAgICAgICAgICBjYXB0aW9uTG9jYWxpemF0aW9uS2V5OiAnYXNtLmN1c3RvbWVyTGlzdC50YWJsZUhlYWRlci5vcmRlcicsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25UeXBlOiBDdXN0b21lckxpc3RDb2x1bW5BY3Rpb25UeXBlLk9SREVSX0hJU1RPUlksXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgdXNlcklkSHR0cEhlYWRlcjoge1xuICAgICAgZW5hYmxlOiB0cnVlLFxuICAgIH0sXG4gIH0sXG59O1xuIl19