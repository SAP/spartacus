/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, SpinnerModule } from '@spartacus/storefront';
import { StoreModule } from '../../presentational/index';
import { StoreListComponent } from './store-list.component';
import * as i0 from "@angular/core";
export class StoreListModule {
}
StoreListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreListModule, declarations: [StoreListComponent], imports: [CommonModule, I18nModule, IconModule, SpinnerModule, StoreModule], exports: [StoreListComponent] });
StoreListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreListModule, imports: [CommonModule, I18nModule, IconModule, SpinnerModule, StoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, IconModule, SpinnerModule, StoreModule],
                    exports: [StoreListComponent],
                    declarations: [StoreListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtbGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGlja3VwLWluLXN0b3JlL2NvbXBvbmVudHMvY29udGFpbmVyL3N0b3JlLWxpc3Qvc3RvcmUtbGlzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFPNUQsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFGWCxrQkFBa0IsYUFGdkIsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsYUFDaEUsa0JBQWtCOzZHQUdqQixlQUFlLFlBSmhCLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxXQUFXOzJGQUkvRCxlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxXQUFXLENBQUM7b0JBQzNFLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO29CQUM3QixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDbkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSwgU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBTdG9yZU1vZHVsZSB9IGZyb20gJy4uLy4uL3ByZXNlbnRhdGlvbmFsL2luZGV4JztcbmltcG9ydCB7IFN0b3JlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vc3RvcmUtbGlzdC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJMThuTW9kdWxlLCBJY29uTW9kdWxlLCBTcGlubmVyTW9kdWxlLCBTdG9yZU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtTdG9yZUxpc3RDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtTdG9yZUxpc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZUxpc3RNb2R1bGUge31cbiJdfQ==