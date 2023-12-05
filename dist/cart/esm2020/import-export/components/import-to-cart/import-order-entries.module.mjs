/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigModule, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { FileUploadModule, FormErrorsModule, IconModule, KeyboardFocusModule, } from '@spartacus/storefront';
import { defaultImportEntriesLayoutConfig } from './default-import-entries-layout.config';
import { ImportEntriesDialogComponent } from './import-entries-dialog/import-entries-dialog.component';
import { ImportEntriesFormComponent } from './import-entries-dialog/import-entries-form/import-entries-form.component';
import { ImportEntriesSummaryComponent } from './import-entries-dialog/import-entries-summary/import-entries-summary.component';
import { ImportToNewSavedCartFormComponent } from './import-entries-dialog/import-to-new-saved-cart-form/import-to-new-saved-cart-form.component';
import { ImportOrderEntriesComponent } from './import-entries/import-order-entries.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class ImportOrderEntriesModule {
}
ImportOrderEntriesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportOrderEntriesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImportOrderEntriesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ImportOrderEntriesModule, declarations: [ImportOrderEntriesComponent,
        ImportEntriesDialogComponent,
        ImportEntriesFormComponent,
        ImportEntriesSummaryComponent,
        ImportToNewSavedCartFormComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormErrorsModule,
        IconModule,
        KeyboardFocusModule,
        FileUploadModule,
        I18nModule, i1.ConfigModule], exports: [ImportOrderEntriesComponent,
        ImportEntriesDialogComponent,
        ImportEntriesFormComponent,
        ImportEntriesSummaryComponent,
        ImportToNewSavedCartFormComponent] });
ImportOrderEntriesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportOrderEntriesModule, providers: [provideDefaultConfig(defaultImportEntriesLayoutConfig)], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormErrorsModule,
        IconModule,
        KeyboardFocusModule,
        FileUploadModule,
        I18nModule,
        ConfigModule.withConfig({
            cmsComponents: {
                ImportOrderEntriesComponent: {
                    component: ImportOrderEntriesComponent,
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportOrderEntriesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        IconModule,
                        KeyboardFocusModule,
                        FileUploadModule,
                        I18nModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                ImportOrderEntriesComponent: {
                                    component: ImportOrderEntriesComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [
                        ImportOrderEntriesComponent,
                        ImportEntriesDialogComponent,
                        ImportEntriesFormComponent,
                        ImportEntriesSummaryComponent,
                        ImportToNewSavedCartFormComponent,
                    ],
                    exports: [
                        ImportOrderEntriesComponent,
                        ImportEntriesDialogComponent,
                        ImportEntriesFormComponent,
                        ImportEntriesSummaryComponent,
                        ImportToNewSavedCartFormComponent,
                    ],
                    providers: [provideDefaultConfig(defaultImportEntriesLayoutConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LW9yZGVyLWVudHJpZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvaW1wb3J0LWV4cG9ydC9jb21wb25lbnRzL2ltcG9ydC10by1jYXJ0L2ltcG9ydC1vcmRlci1lbnRyaWVzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFFTCxZQUFZLEVBQ1osVUFBVSxFQUNWLG9CQUFvQixHQUNyQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLFVBQVUsRUFDVixtQkFBbUIsR0FDcEIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyRUFBMkUsQ0FBQztBQUN2SCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxpRkFBaUYsQ0FBQztBQUNoSSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSwrRkFBK0YsQ0FBQztBQUNsSixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7O0FBb0M5RixNQUFNLE9BQU8sd0JBQXdCOztxSEFBeEIsd0JBQXdCO3NIQUF4Qix3QkFBd0IsaUJBZmpDLDJCQUEyQjtRQUMzQiw0QkFBNEI7UUFDNUIsMEJBQTBCO1FBQzFCLDZCQUE2QjtRQUM3QixpQ0FBaUMsYUFyQmpDLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixVQUFVLDhCQWlCViwyQkFBMkI7UUFDM0IsNEJBQTRCO1FBQzVCLDBCQUEwQjtRQUMxQiw2QkFBNkI7UUFDN0IsaUNBQWlDO3NIQUl4Qix3QkFBd0IsYUFGeEIsQ0FBQyxvQkFBb0IsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLFlBOUJqRSxZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsVUFBVTtRQUNWLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsVUFBVTtRQUNWLFlBQVksQ0FBQyxVQUFVLENBQVk7WUFDakMsYUFBYSxFQUFFO2dCQUNiLDJCQUEyQixFQUFFO29CQUMzQixTQUFTLEVBQUUsMkJBQTJCO2lCQUN2QzthQUNGO1NBQ0YsQ0FBQzsyRkFrQk8sd0JBQXdCO2tCQWxDcEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsZ0JBQWdCO3dCQUNoQixVQUFVO3dCQUNWLG1CQUFtQjt3QkFDbkIsZ0JBQWdCO3dCQUNoQixVQUFVO3dCQUNWLFlBQVksQ0FBQyxVQUFVLENBQVk7NEJBQ2pDLGFBQWEsRUFBRTtnQ0FDYiwyQkFBMkIsRUFBRTtvQ0FDM0IsU0FBUyxFQUFFLDJCQUEyQjtpQ0FDdkM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osMkJBQTJCO3dCQUMzQiw0QkFBNEI7d0JBQzVCLDBCQUEwQjt3QkFDMUIsNkJBQTZCO3dCQUM3QixpQ0FBaUM7cUJBQ2xDO29CQUNELE9BQU8sRUFBRTt3QkFDUCwyQkFBMkI7d0JBQzNCLDRCQUE0Qjt3QkFDNUIsMEJBQTBCO3dCQUMxQiw2QkFBNkI7d0JBQzdCLGlDQUFpQztxQkFDbEM7b0JBQ0QsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztpQkFDcEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBDb25maWdNb2R1bGUsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgRmlsZVVwbG9hZE1vZHVsZSxcbiAgRm9ybUVycm9yc01vZHVsZSxcbiAgSWNvbk1vZHVsZSxcbiAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IGRlZmF1bHRJbXBvcnRFbnRyaWVzTGF5b3V0Q29uZmlnIH0gZnJvbSAnLi9kZWZhdWx0LWltcG9ydC1lbnRyaWVzLWxheW91dC5jb25maWcnO1xuaW1wb3J0IHsgSW1wb3J0RW50cmllc0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vaW1wb3J0LWVudHJpZXMtZGlhbG9nL2ltcG9ydC1lbnRyaWVzLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1wb3J0RW50cmllc0Zvcm1Db21wb25lbnQgfSBmcm9tICcuL2ltcG9ydC1lbnRyaWVzLWRpYWxvZy9pbXBvcnQtZW50cmllcy1mb3JtL2ltcG9ydC1lbnRyaWVzLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IEltcG9ydEVudHJpZXNTdW1tYXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9pbXBvcnQtZW50cmllcy1kaWFsb2cvaW1wb3J0LWVudHJpZXMtc3VtbWFyeS9pbXBvcnQtZW50cmllcy1zdW1tYXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbXBvcnRUb05ld1NhdmVkQ2FydEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2ltcG9ydC1lbnRyaWVzLWRpYWxvZy9pbXBvcnQtdG8tbmV3LXNhdmVkLWNhcnQtZm9ybS9pbXBvcnQtdG8tbmV3LXNhdmVkLWNhcnQtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1wb3J0T3JkZXJFbnRyaWVzQ29tcG9uZW50IH0gZnJvbSAnLi9pbXBvcnQtZW50cmllcy9pbXBvcnQtb3JkZXItZW50cmllcy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gICAgRmlsZVVwbG9hZE1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIENvbmZpZ01vZHVsZS53aXRoQ29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBJbXBvcnRPcmRlckVudHJpZXNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IEltcG9ydE9yZGVyRW50cmllc0NvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEltcG9ydE9yZGVyRW50cmllc0NvbXBvbmVudCxcbiAgICBJbXBvcnRFbnRyaWVzRGlhbG9nQ29tcG9uZW50LFxuICAgIEltcG9ydEVudHJpZXNGb3JtQ29tcG9uZW50LFxuICAgIEltcG9ydEVudHJpZXNTdW1tYXJ5Q29tcG9uZW50LFxuICAgIEltcG9ydFRvTmV3U2F2ZWRDYXJ0Rm9ybUNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEltcG9ydE9yZGVyRW50cmllc0NvbXBvbmVudCxcbiAgICBJbXBvcnRFbnRyaWVzRGlhbG9nQ29tcG9uZW50LFxuICAgIEltcG9ydEVudHJpZXNGb3JtQ29tcG9uZW50LFxuICAgIEltcG9ydEVudHJpZXNTdW1tYXJ5Q29tcG9uZW50LFxuICAgIEltcG9ydFRvTmV3U2F2ZWRDYXJ0Rm9ybUNvbXBvbmVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdEltcG9ydEVudHJpZXNMYXlvdXRDb25maWcpXSxcbn0pXG5leHBvcnQgY2xhc3MgSW1wb3J0T3JkZXJFbnRyaWVzTW9kdWxlIHt9XG4iXX0=