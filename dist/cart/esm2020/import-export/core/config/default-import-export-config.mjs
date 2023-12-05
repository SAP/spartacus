/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { OrderEntriesSource } from '@spartacus/cart/base/root';
import { CartNameSource } from '../model/import-entries.config';
export const defaultImportExportConfig = {
    cartImportExport: {
        file: {
            separator: ',',
        },
        import: {
            fileValidity: {
                maxSize: 1,
                maxEntries: {
                    [OrderEntriesSource.NEW_SAVED_CART]: 100,
                    [OrderEntriesSource.SAVED_CART]: 100,
                    [OrderEntriesSource.ACTIVE_CART]: 10,
                    [OrderEntriesSource.QUICK_ORDER]: 10,
                },
                allowedTypes: [
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.ms-excel',
                    'text/csv',
                    '.csv',
                ],
            },
            cartNameGeneration: {
                source: CartNameSource.FILE_NAME,
            },
        },
        export: {
            additionalColumns: [
                {
                    name: {
                        key: 'name',
                    },
                    value: 'product.name',
                },
                {
                    name: {
                        key: 'price',
                    },
                    value: 'totalPrice.formattedValue',
                },
            ],
            messageEnabled: true,
            downloadDelay: 1000,
            maxEntries: 1000,
            fileOptions: {
                fileName: 'cart',
                extension: 'csv',
                type: 'text/csv',
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1pbXBvcnQtZXhwb3J0LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2ltcG9ydC1leHBvcnQvY29yZS9jb25maWcvZGVmYXVsdC1pbXBvcnQtZXhwb3J0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBR2hFLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUF1QjtJQUMzRCxnQkFBZ0IsRUFBRTtRQUNoQixJQUFJLEVBQUU7WUFDSixTQUFTLEVBQUUsR0FBRztTQUNmO1FBQ0QsTUFBTSxFQUFFO1lBQ04sWUFBWSxFQUFFO2dCQUNaLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFVBQVUsRUFBRTtvQkFDVixDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxFQUFFLEdBQUc7b0JBQ3hDLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRztvQkFDcEMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFO29CQUNwQyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUU7aUJBQ3JDO2dCQUNELFlBQVksRUFBRTtvQkFDWixtRUFBbUU7b0JBQ25FLDBCQUEwQjtvQkFDMUIsVUFBVTtvQkFDVixNQUFNO2lCQUNQO2FBQ0Y7WUFDRCxrQkFBa0IsRUFBRTtnQkFDbEIsTUFBTSxFQUFFLGNBQWMsQ0FBQyxTQUFTO2FBQ2pDO1NBQ0Y7UUFDRCxNQUFNLEVBQUU7WUFDTixpQkFBaUIsRUFBRTtnQkFDakI7b0JBQ0UsSUFBSSxFQUFFO3dCQUNKLEdBQUcsRUFBRSxNQUFNO3FCQUNaO29CQUNELEtBQUssRUFBRSxjQUFjO2lCQUN0QjtnQkFDRDtvQkFDRSxJQUFJLEVBQUU7d0JBQ0osR0FBRyxFQUFFLE9BQU87cUJBQ2I7b0JBQ0QsS0FBSyxFQUFFLDJCQUEyQjtpQkFDbkM7YUFDRjtZQUNELGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFdBQVcsRUFBRTtnQkFDWCxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLElBQUksRUFBRSxVQUFVO2FBQ2pCO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBPcmRlckVudHJpZXNTb3VyY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IENhcnROYW1lU291cmNlIH0gZnJvbSAnLi4vbW9kZWwvaW1wb3J0LWVudHJpZXMuY29uZmlnJztcbmltcG9ydCB7IEltcG9ydEV4cG9ydENvbmZpZyB9IGZyb20gJy4vaW1wb3J0LWV4cG9ydC1jb25maWcnO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEltcG9ydEV4cG9ydENvbmZpZzogSW1wb3J0RXhwb3J0Q29uZmlnID0ge1xuICBjYXJ0SW1wb3J0RXhwb3J0OiB7XG4gICAgZmlsZToge1xuICAgICAgc2VwYXJhdG9yOiAnLCcsXG4gICAgfSxcbiAgICBpbXBvcnQ6IHtcbiAgICAgIGZpbGVWYWxpZGl0eToge1xuICAgICAgICBtYXhTaXplOiAxLFxuICAgICAgICBtYXhFbnRyaWVzOiB7XG4gICAgICAgICAgW09yZGVyRW50cmllc1NvdXJjZS5ORVdfU0FWRURfQ0FSVF06IDEwMCxcbiAgICAgICAgICBbT3JkZXJFbnRyaWVzU291cmNlLlNBVkVEX0NBUlRdOiAxMDAsXG4gICAgICAgICAgW09yZGVyRW50cmllc1NvdXJjZS5BQ1RJVkVfQ0FSVF06IDEwLFxuICAgICAgICAgIFtPcmRlckVudHJpZXNTb3VyY2UuUVVJQ0tfT1JERVJdOiAxMCxcbiAgICAgICAgfSxcbiAgICAgICAgYWxsb3dlZFR5cGVzOiBbXG4gICAgICAgICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0JyxcbiAgICAgICAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAgICAgICAndGV4dC9jc3YnLFxuICAgICAgICAgICcuY3N2JyxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBjYXJ0TmFtZUdlbmVyYXRpb246IHtcbiAgICAgICAgc291cmNlOiBDYXJ0TmFtZVNvdXJjZS5GSUxFX05BTUUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgZXhwb3J0OiB7XG4gICAgICBhZGRpdGlvbmFsQ29sdW1uczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAga2V5OiAnbmFtZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2YWx1ZTogJ3Byb2R1Y3QubmFtZScsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBrZXk6ICdwcmljZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2YWx1ZTogJ3RvdGFsUHJpY2UuZm9ybWF0dGVkVmFsdWUnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIG1lc3NhZ2VFbmFibGVkOiB0cnVlLFxuICAgICAgZG93bmxvYWREZWxheTogMTAwMCxcbiAgICAgIG1heEVudHJpZXM6IDEwMDAsXG4gICAgICBmaWxlT3B0aW9uczoge1xuICAgICAgICBmaWxlTmFtZTogJ2NhcnQnLFxuICAgICAgICBleHRlbnNpb246ICdjc3YnLFxuICAgICAgICB0eXBlOiAndGV4dC9jc3YnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==