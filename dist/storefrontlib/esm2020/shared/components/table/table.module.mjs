/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { defaultTableConfig } from './config/default-table.config';
import { TableDataCellModule } from './table-data-cell/table-data-cell.module';
import { TableHeaderCellModule } from './table-header-cell/table-header-cell.module';
import { TableComponent } from './table.component';
import * as i0 from "@angular/core";
/**
 * The TableModule provides a table component that is driven by (responsible) configuration.
 */
export class TableModule {
}
TableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TableModule, declarations: [TableComponent], imports: [CommonModule,
        OutletModule,
        TableHeaderCellModule,
        TableDataCellModule], exports: [TableComponent] });
TableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TableModule, providers: [provideDefaultConfig(defaultTableConfig)], imports: [CommonModule,
        OutletModule,
        TableHeaderCellModule,
        TableDataCellModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OutletModule,
                        TableHeaderCellModule,
                        TableDataCellModule,
                    ],
                    declarations: [TableComponent],
                    exports: [TableComponent],
                    providers: [provideDefaultConfig(defaultTableConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy90YWJsZS90YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNyRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRW5EOztHQUVHO0FBWUgsTUFBTSxPQUFPLFdBQVc7O3dHQUFYLFdBQVc7eUdBQVgsV0FBVyxpQkFKUCxjQUFjLGFBTDNCLFlBQVk7UUFDWixZQUFZO1FBQ1oscUJBQXFCO1FBQ3JCLG1CQUFtQixhQUdYLGNBQWM7eUdBR2IsV0FBVyxhQUZYLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxZQVBuRCxZQUFZO1FBQ1osWUFBWTtRQUNaLHFCQUFxQjtRQUNyQixtQkFBbUI7MkZBTVYsV0FBVztrQkFYdkIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLHFCQUFxQjt3QkFDckIsbUJBQW1CO3FCQUNwQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7b0JBQzlCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDekIsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDdEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE91dGxldE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvb3V0bGV0L291dGxldC5tb2R1bGUnO1xuaW1wb3J0IHsgZGVmYXVsdFRhYmxlQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC10YWJsZS5jb25maWcnO1xuaW1wb3J0IHsgVGFibGVEYXRhQ2VsbE1vZHVsZSB9IGZyb20gJy4vdGFibGUtZGF0YS1jZWxsL3RhYmxlLWRhdGEtY2VsbC5tb2R1bGUnO1xuaW1wb3J0IHsgVGFibGVIZWFkZXJDZWxsTW9kdWxlIH0gZnJvbSAnLi90YWJsZS1oZWFkZXItY2VsbC90YWJsZS1oZWFkZXItY2VsbC5tb2R1bGUnO1xuaW1wb3J0IHsgVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLmNvbXBvbmVudCc7XG5cbi8qKlxuICogVGhlIFRhYmxlTW9kdWxlIHByb3ZpZGVzIGEgdGFibGUgY29tcG9uZW50IHRoYXQgaXMgZHJpdmVuIGJ5IChyZXNwb25zaWJsZSkgY29uZmlndXJhdGlvbi5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBPdXRsZXRNb2R1bGUsXG4gICAgVGFibGVIZWFkZXJDZWxsTW9kdWxlLFxuICAgIFRhYmxlRGF0YUNlbGxNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RhYmxlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RhYmxlQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdFRhYmxlQ29uZmlnKV0sXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlTW9kdWxlIHt9XG4iXX0=