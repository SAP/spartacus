/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { PaginationComponent, PaginationModule } from './pagination/index';
import { SortingComponent } from './sorting/sorting.component';
import { SortingModule } from './sorting/sorting.module';
import { TotalModule } from './total';
import { TotalComponent } from './total/total.component';
import * as i0 from "@angular/core";
export class ListNavigationModule {
}
ListNavigationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListNavigationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ListNavigationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ListNavigationModule, imports: [CommonModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        IconModule,
        PaginationModule,
        SortingModule,
        TotalModule], exports: [SortingComponent, PaginationComponent, TotalComponent] });
ListNavigationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListNavigationModule, imports: [CommonModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        IconModule,
        PaginationModule,
        SortingModule,
        TotalModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListNavigationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        NgSelectModule,
                        FormsModule,
                        ReactiveFormsModule,
                        IconModule,
                        PaginationModule,
                        SortingModule,
                        TotalModule,
                    ],
                    exports: [SortingComponent, PaginationComponent, TotalComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1uYXZpZ2F0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvbGlzdC1uYXZpZ2F0aW9uL2xpc3QtbmF2aWdhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFlekQsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CLFlBWDdCLFlBQVk7UUFDWixjQUFjO1FBQ2QsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixXQUFXLGFBRUgsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsY0FBYztrSEFFcEQsb0JBQW9CLFlBWDdCLFlBQVk7UUFDWixjQUFjO1FBQ2QsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixXQUFXOzJGQUlGLG9CQUFvQjtrQkFiaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixjQUFjO3dCQUNkLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYixXQUFXO3FCQUNaO29CQUNELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLGNBQWMsQ0FBQztpQkFDakUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQgeyBJY29uTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vY21zLWNvbXBvbmVudHMvbWlzYy9pY29uL2ljb24ubW9kdWxlJztcbmltcG9ydCB7IFBhZ2luYXRpb25Db21wb25lbnQsIFBhZ2luYXRpb25Nb2R1bGUgfSBmcm9tICcuL3BhZ2luYXRpb24vaW5kZXgnO1xuaW1wb3J0IHsgU29ydGluZ0NvbXBvbmVudCB9IGZyb20gJy4vc29ydGluZy9zb3J0aW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTb3J0aW5nTW9kdWxlIH0gZnJvbSAnLi9zb3J0aW5nL3NvcnRpbmcubW9kdWxlJztcbmltcG9ydCB7IFRvdGFsTW9kdWxlIH0gZnJvbSAnLi90b3RhbCc7XG5pbXBvcnQgeyBUb3RhbENvbXBvbmVudCB9IGZyb20gJy4vdG90YWwvdG90YWwuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOZ1NlbGVjdE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gICAgUGFnaW5hdGlvbk1vZHVsZSxcbiAgICBTb3J0aW5nTW9kdWxlLFxuICAgIFRvdGFsTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbU29ydGluZ0NvbXBvbmVudCwgUGFnaW5hdGlvbkNvbXBvbmVudCwgVG90YWxDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBMaXN0TmF2aWdhdGlvbk1vZHVsZSB7fVxuIl19