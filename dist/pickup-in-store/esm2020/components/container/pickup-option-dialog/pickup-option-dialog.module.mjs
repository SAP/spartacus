/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule, SpinnerModule, } from '@spartacus/storefront';
import { StoreListModule } from '../store-list/index';
import { StoreSearchModule } from '../store-search/index';
import { PickupOptionDialogComponent } from './pickup-option-dialog.component';
import * as i0 from "@angular/core";
export class PickupOptionDialogModule {
}
PickupOptionDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupOptionDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionDialogModule, declarations: [PickupOptionDialogComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        SpinnerModule,
        StoreListModule,
        StoreSearchModule], exports: [PickupOptionDialogComponent] });
PickupOptionDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionDialogModule, imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        SpinnerModule,
        StoreListModule,
        StoreSearchModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        KeyboardFocusModule,
                        SpinnerModule,
                        StoreListModule,
                        StoreSearchModule,
                    ],
                    entryComponents: [PickupOptionDialogComponent],
                    declarations: [PickupOptionDialogComponent],
                    exports: [PickupOptionDialogComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLW9wdGlvbi1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9jb21wb25lbnRzL2NvbnRhaW5lci9waWNrdXAtb3B0aW9uLWRpYWxvZy9waWNrdXAtb3B0aW9uLWRpYWxvZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQ0wsVUFBVSxFQUNWLG1CQUFtQixFQUNuQixhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBZ0IvRSxNQUFNLE9BQU8sd0JBQXdCOztxSEFBeEIsd0JBQXdCO3NIQUF4Qix3QkFBd0IsaUJBSHBCLDJCQUEyQixhQVR4QyxZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLGVBQWU7UUFDZixpQkFBaUIsYUFJVCwyQkFBMkI7c0hBRTFCLHdCQUF3QixZQVpqQyxZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLGVBQWU7UUFDZixpQkFBaUI7MkZBTVIsd0JBQXdCO2tCQWRwQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixtQkFBbUI7d0JBQ25CLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixpQkFBaUI7cUJBQ2xCO29CQUNELGVBQWUsRUFBRSxDQUFDLDJCQUEyQixDQUFDO29CQUM5QyxZQUFZLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztvQkFDM0MsT0FBTyxFQUFFLENBQUMsMkJBQTJCLENBQUM7aUJBQ3ZDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEljb25Nb2R1bGUsXG4gIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gIFNwaW5uZXJNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBTdG9yZUxpc3RNb2R1bGUgfSBmcm9tICcuLi9zdG9yZS1saXN0L2luZGV4JztcbmltcG9ydCB7IFN0b3JlU2VhcmNoTW9kdWxlIH0gZnJvbSAnLi4vc3RvcmUtc2VhcmNoL2luZGV4JztcbmltcG9ydCB7IFBpY2t1cE9wdGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vcGlja3VwLW9wdGlvbi1kaWFsb2cuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIFN0b3JlTGlzdE1vZHVsZSxcbiAgICBTdG9yZVNlYXJjaE1vZHVsZSxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbUGlja3VwT3B0aW9uRGlhbG9nQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbUGlja3VwT3B0aW9uRGlhbG9nQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1BpY2t1cE9wdGlvbkRpYWxvZ0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFBpY2t1cE9wdGlvbkRpYWxvZ01vZHVsZSB7fVxuIl19