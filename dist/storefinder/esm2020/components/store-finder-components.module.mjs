/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { StoreFinderCoreModule } from '@spartacus/storefinder/core';
import { IconModule, ListNavigationModule, OutletModule, SpinnerModule, } from '@spartacus/storefront';
import { ScheduleComponent } from './schedule-component/schedule.component';
import { StoreFinderGridComponent } from './store-finder-grid/store-finder-grid.component';
import { StoreFinderHeaderComponent } from './store-finder-header/store-finder-header.component';
import { StoreFinderListItemComponent } from './store-finder-list-item/store-finder-list-item.component';
import { StoreFinderMapComponent } from './store-finder-map/store-finder-map.component';
import { StoreFinderPaginationDetailsComponent } from './store-finder-pagination-details/store-finder-pagination-details.component';
import { StoreFinderListComponent } from './store-finder-search-result/store-finder-list/store-finder-list.component';
import { StoreFinderSearchResultComponent } from './store-finder-search-result/store-finder-search-result.component';
import { StoreFinderSearchComponent } from './store-finder-search/store-finder-search.component';
import { StoreFinderStoreDescriptionComponent } from './store-finder-store-description/store-finder-store-description.component';
import { StoreFinderStoreComponent } from './store-finder-store/store-finder-store.component';
import { StoreFinderStoresCountComponent } from './store-finder-stores-count/store-finder-stores-count.component';
import { StoreFinderComponent } from './store-finder/store-finder.component';
import * as i0 from "@angular/core";
export class StoreFinderComponentsModule {
}
StoreFinderComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreFinderComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderComponentsModule, declarations: [StoreFinderSearchComponent,
        StoreFinderListComponent,
        StoreFinderMapComponent,
        StoreFinderListItemComponent,
        StoreFinderStoresCountComponent,
        StoreFinderGridComponent,
        StoreFinderStoreDescriptionComponent,
        ScheduleComponent,
        StoreFinderHeaderComponent,
        StoreFinderSearchResultComponent,
        StoreFinderComponent,
        StoreFinderPaginationDetailsComponent,
        StoreFinderStoreComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ListNavigationModule,
        SpinnerModule,
        UrlModule,
        StoreFinderCoreModule,
        I18nModule,
        IconModule,
        OutletModule], exports: [ScheduleComponent,
        StoreFinderComponent,
        StoreFinderGridComponent,
        StoreFinderHeaderComponent,
        StoreFinderListItemComponent,
        StoreFinderMapComponent,
        StoreFinderPaginationDetailsComponent,
        StoreFinderSearchComponent,
        StoreFinderSearchResultComponent,
        StoreFinderListComponent,
        StoreFinderStoreDescriptionComponent,
        StoreFinderStoresCountComponent,
        StoreFinderStoreComponent] });
StoreFinderComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderComponentsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                StoreFinderComponent: {
                    component: StoreFinderComponent,
                    childRoutes: [
                        {
                            path: 'find',
                            component: StoreFinderSearchResultComponent,
                        },
                        {
                            path: 'view-all',
                            component: StoreFinderStoresCountComponent,
                        },
                        {
                            path: 'country/:country',
                            component: StoreFinderGridComponent,
                        },
                        {
                            path: 'country/:country/region/:region',
                            component: StoreFinderGridComponent,
                        },
                        {
                            path: 'country/:country/region/:region/:store',
                            component: StoreFinderStoreComponent,
                        },
                        {
                            path: 'country/:country/:store',
                            component: StoreFinderStoreComponent,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ListNavigationModule,
        SpinnerModule,
        UrlModule,
        StoreFinderCoreModule,
        I18nModule,
        IconModule,
        OutletModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        ListNavigationModule,
                        SpinnerModule,
                        UrlModule,
                        StoreFinderCoreModule,
                        I18nModule,
                        IconModule,
                        OutletModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                StoreFinderComponent: {
                                    component: StoreFinderComponent,
                                    childRoutes: [
                                        {
                                            path: 'find',
                                            component: StoreFinderSearchResultComponent,
                                        },
                                        {
                                            path: 'view-all',
                                            component: StoreFinderStoresCountComponent,
                                        },
                                        {
                                            path: 'country/:country',
                                            component: StoreFinderGridComponent,
                                        },
                                        {
                                            path: 'country/:country/region/:region',
                                            component: StoreFinderGridComponent,
                                        },
                                        {
                                            path: 'country/:country/region/:region/:store',
                                            component: StoreFinderStoreComponent,
                                        },
                                        {
                                            path: 'country/:country/:store',
                                            component: StoreFinderStoreComponent,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [
                        StoreFinderSearchComponent,
                        StoreFinderListComponent,
                        StoreFinderMapComponent,
                        StoreFinderListItemComponent,
                        StoreFinderStoresCountComponent,
                        StoreFinderGridComponent,
                        StoreFinderStoreDescriptionComponent,
                        ScheduleComponent,
                        StoreFinderHeaderComponent,
                        StoreFinderSearchResultComponent,
                        StoreFinderComponent,
                        StoreFinderPaginationDetailsComponent,
                        StoreFinderStoreComponent,
                    ],
                    exports: [
                        ScheduleComponent,
                        StoreFinderComponent,
                        StoreFinderGridComponent,
                        StoreFinderHeaderComponent,
                        StoreFinderListItemComponent,
                        StoreFinderMapComponent,
                        StoreFinderPaginationDetailsComponent,
                        StoreFinderSearchComponent,
                        StoreFinderSearchResultComponent,
                        StoreFinderListComponent,
                        StoreFinderStoreDescriptionComponent,
                        StoreFinderStoresCountComponent,
                        StoreFinderStoreComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtZmluZGVyLWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3N0b3JlZmluZGVyL2NvbXBvbmVudHMvc3RvcmUtZmluZGVyLWNvbXBvbmVudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQ0wsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixZQUFZLEVBQ1osYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDekcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLE1BQU0sNkVBQTZFLENBQUM7QUFDcEksT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNEVBQTRFLENBQUM7QUFDdEgsT0FBTyxFQUFFLGdDQUFnQyxF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LEVBQUUsd0JBQXdCO3lDQUNwQzt3Q0FDRDs0Q0FDRSxJQUFJLEVBQUUsaUNBQWlDOzRDQUN2QyxTQUFTLEVBQUUsd0JBQXdCO3lDQUNwQzt3Q0FDRDs0Q0FDRSxJQUFJLEVBQUUsd0NBQXdDOzRDQUM5QyxTQUFTLEVBQUUseUJBQXlCO3lDQUNyQzt3Q0FDRDs0Q0FDRSxJQUFJLEVBQUUseUJBQXlCOzRDQUMvQixTQUFTLEVBQUUseUJBQXlCO3lDQUNyQztxQ0FDRjtpQ0FDRjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRTt3QkFDWiwwQkFBMEI7d0JBQzFCLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2Qiw0QkFBNEI7d0JBQzVCLCtCQUErQjt3QkFDL0Isd0JBQXdCO3dCQUN4QixvQ0FBb0M7d0JBQ3BDLGlCQUFpQjt3QkFDakIsMEJBQTBCO3dCQUMxQixnQ0FBZ0M7d0JBQ2hDLG9CQUFvQjt3QkFDcEIscUNBQXFDO3dCQUNyQyx5QkFBeUI7cUJBQzFCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxpQkFBaUI7d0JBQ2pCLG9CQUFvQjt3QkFDcEIsd0JBQXdCO3dCQUN4QiwwQkFBMEI7d0JBQzFCLDRCQUE0Qjt3QkFDNUIsdUJBQXVCO3dCQUN2QixxQ0FBcUM7d0JBQ3JDLDBCQUEwQjt3QkFDMUIsZ0NBQWdDO3dCQUNoQyx3QkFBd0I7d0JBQ3hCLG9DQUFvQzt3QkFDcEMsK0JBQStCO3dCQUMvQix5QkFBeUI7cUJBQzFCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJDb3JlTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZpbmRlci9jb3JlJztcbmltcG9ydCB7XG4gIEljb25Nb2R1bGUsXG4gIExpc3ROYXZpZ2F0aW9uTW9kdWxlLFxuICBPdXRsZXRNb2R1bGUsXG4gIFNwaW5uZXJNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBTY2hlZHVsZUNvbXBvbmVudCB9IGZyb20gJy4vc2NoZWR1bGUtY29tcG9uZW50L3NjaGVkdWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZUZpbmRlckdyaWRDb21wb25lbnQgfSBmcm9tICcuL3N0b3JlLWZpbmRlci1ncmlkL3N0b3JlLWZpbmRlci1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZUZpbmRlckhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vc3RvcmUtZmluZGVyLWhlYWRlci9zdG9yZS1maW5kZXItaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZUZpbmRlckxpc3RJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9zdG9yZS1maW5kZXItbGlzdC1pdGVtL3N0b3JlLWZpbmRlci1saXN0LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlRmluZGVyTWFwQ29tcG9uZW50IH0gZnJvbSAnLi9zdG9yZS1maW5kZXItbWFwL3N0b3JlLWZpbmRlci1tYXAuY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlRmluZGVyUGFnaW5hdGlvbkRldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL3N0b3JlLWZpbmRlci1wYWdpbmF0aW9uLWRldGFpbHMvc3RvcmUtZmluZGVyLXBhZ2luYXRpb24tZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9zdG9yZS1maW5kZXItc2VhcmNoLXJlc3VsdC9zdG9yZS1maW5kZXItbGlzdC9zdG9yZS1maW5kZXItbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJTZWFyY2hSZXN1bHRDb21wb25lbnQgfSBmcm9tICcuL3N0b3JlLWZpbmRlci1zZWFyY2gtcmVzdWx0L3N0b3JlLWZpbmRlci1zZWFyY2gtcmVzdWx0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZUZpbmRlclNlYXJjaENvbXBvbmVudCB9IGZyb20gJy4vc3RvcmUtZmluZGVyLXNlYXJjaC9zdG9yZS1maW5kZXItc2VhcmNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZUZpbmRlclN0b3JlRGVzY3JpcHRpb25Db21wb25lbnQgfSBmcm9tICcuL3N0b3JlLWZpbmRlci1zdG9yZS1kZXNjcmlwdGlvbi9zdG9yZS1maW5kZXItc3RvcmUtZGVzY3JpcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlRmluZGVyU3RvcmVDb21wb25lbnQgfSBmcm9tICcuL3N0b3JlLWZpbmRlci1zdG9yZS9zdG9yZS1maW5kZXItc3RvcmUuY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlRmluZGVyU3RvcmVzQ291bnRDb21wb25lbnQgfSBmcm9tICcuL3N0b3JlLWZpbmRlci1zdG9yZXMtY291bnQvc3RvcmUtZmluZGVyLXN0b3Jlcy1jb3VudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJDb21wb25lbnQgfSBmcm9tICcuL3N0b3JlLWZpbmRlci9zdG9yZS1maW5kZXIuY29tcG9uZW50JztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgTGlzdE5hdmlnYXRpb25Nb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgU3RvcmVGaW5kZXJDb3JlTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBPdXRsZXRNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKHtcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgU3RvcmVGaW5kZXJDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFN0b3JlRmluZGVyQ29tcG9uZW50LFxuICAgICAgICAgIGNoaWxkUm91dGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHBhdGg6ICdmaW5kJyxcbiAgICAgICAgICAgICAgY29tcG9uZW50OiBTdG9yZUZpbmRlclNlYXJjaFJlc3VsdENvbXBvbmVudCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHBhdGg6ICd2aWV3LWFsbCcsXG4gICAgICAgICAgICAgIGNvbXBvbmVudDogU3RvcmVGaW5kZXJTdG9yZXNDb3VudENvbXBvbmVudCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHBhdGg6ICdjb3VudHJ5Lzpjb3VudHJ5JyxcbiAgICAgICAgICAgICAgY29tcG9uZW50OiBTdG9yZUZpbmRlckdyaWRDb21wb25lbnQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwYXRoOiAnY291bnRyeS86Y291bnRyeS9yZWdpb24vOnJlZ2lvbicsXG4gICAgICAgICAgICAgIGNvbXBvbmVudDogU3RvcmVGaW5kZXJHcmlkQ29tcG9uZW50LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcGF0aDogJ2NvdW50cnkvOmNvdW50cnkvcmVnaW9uLzpyZWdpb24vOnN0b3JlJyxcbiAgICAgICAgICAgICAgY29tcG9uZW50OiBTdG9yZUZpbmRlclN0b3JlQ29tcG9uZW50LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcGF0aDogJ2NvdW50cnkvOmNvdW50cnkvOnN0b3JlJyxcbiAgICAgICAgICAgICAgY29tcG9uZW50OiBTdG9yZUZpbmRlclN0b3JlQ29tcG9uZW50LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU3RvcmVGaW5kZXJTZWFyY2hDb21wb25lbnQsXG4gICAgU3RvcmVGaW5kZXJMaXN0Q29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyTWFwQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyTGlzdEl0ZW1Db21wb25lbnQsXG4gICAgU3RvcmVGaW5kZXJTdG9yZXNDb3VudENvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlckdyaWRDb21wb25lbnQsXG4gICAgU3RvcmVGaW5kZXJTdG9yZURlc2NyaXB0aW9uQ29tcG9uZW50LFxuICAgIFNjaGVkdWxlQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVySGVhZGVyQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyU2VhcmNoUmVzdWx0Q29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyUGFnaW5hdGlvbkRldGFpbHNDb21wb25lbnQsXG4gICAgU3RvcmVGaW5kZXJTdG9yZUNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNjaGVkdWxlQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyR3JpZENvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlckhlYWRlckNvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlckxpc3RJdGVtQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyTWFwQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyUGFnaW5hdGlvbkRldGFpbHNDb21wb25lbnQsXG4gICAgU3RvcmVGaW5kZXJTZWFyY2hDb21wb25lbnQsXG4gICAgU3RvcmVGaW5kZXJTZWFyY2hSZXN1bHRDb21wb25lbnQsXG4gICAgU3RvcmVGaW5kZXJMaXN0Q29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyU3RvcmVEZXNjcmlwdGlvbkNvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlclN0b3Jlc0NvdW50Q29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyU3RvcmVDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlRmluZGVyQ29tcG9uZW50c01vZHVsZSB7fVxuIl19