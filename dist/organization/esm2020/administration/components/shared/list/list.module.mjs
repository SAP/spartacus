/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule, PaginationModule, SplitViewModule, TableModule, } from '@spartacus/storefront';
import { MessageModule } from '../message/message.module';
import { ListComponent } from './list.component';
import { PopoverModule } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export class ListModule {
}
ListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ListModule, declarations: [ListComponent], imports: [CommonModule,
        RouterModule,
        SplitViewModule,
        TableModule,
        IconModule,
        UrlModule,
        I18nModule,
        PaginationModule,
        NgSelectModule,
        FormsModule,
        MessageModule,
        KeyboardFocusModule,
        PopoverModule], exports: [ListComponent] });
ListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListModule, imports: [CommonModule,
        RouterModule,
        SplitViewModule,
        TableModule,
        IconModule,
        UrlModule,
        I18nModule,
        PaginationModule,
        NgSelectModule,
        FormsModule,
        MessageModule,
        KeyboardFocusModule,
        PopoverModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        SplitViewModule,
                        TableModule,
                        IconModule,
                        UrlModule,
                        I18nModule,
                        PaginationModule,
                        NgSelectModule,
                        FormsModule,
                        MessageModule,
                        KeyboardFocusModule,
                        PopoverModule,
                    ],
                    declarations: [ListComponent],
                    exports: [ListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL2xpc3QvbGlzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUNMLFVBQVUsRUFDVixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixXQUFXLEdBQ1osTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFxQnRELE1BQU0sT0FBTyxVQUFVOzt1R0FBVixVQUFVO3dHQUFWLFVBQVUsaUJBSE4sYUFBYSxhQWQxQixZQUFZO1FBQ1osWUFBWTtRQUNaLGVBQWU7UUFDZixXQUFXO1FBQ1gsVUFBVTtRQUNWLFNBQVM7UUFDVCxVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLGNBQWM7UUFDZCxXQUFXO1FBQ1gsYUFBYTtRQUNiLG1CQUFtQjtRQUNuQixhQUFhLGFBR0wsYUFBYTt3R0FFWixVQUFVLFlBakJuQixZQUFZO1FBQ1osWUFBWTtRQUNaLGVBQWU7UUFDZixXQUFXO1FBQ1gsVUFBVTtRQUNWLFNBQVM7UUFDVCxVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLGNBQWM7UUFDZCxXQUFXO1FBQ1gsYUFBYTtRQUNiLG1CQUFtQjtRQUNuQixhQUFhOzJGQUtKLFVBQVU7a0JBbkJ0QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsU0FBUzt3QkFDVCxVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsY0FBYzt3QkFDZCxXQUFXO3dCQUNYLGFBQWE7d0JBQ2IsbUJBQW1CO3dCQUNuQixhQUFhO3FCQUNkO29CQUNELFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDN0IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO2lCQUN6QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgSWNvbk1vZHVsZSxcbiAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgUGFnaW5hdGlvbk1vZHVsZSxcbiAgU3BsaXRWaWV3TW9kdWxlLFxuICBUYWJsZU1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE1lc3NhZ2VNb2R1bGUgfSBmcm9tICcuLi9tZXNzYWdlL21lc3NhZ2UubW9kdWxlJztcbmltcG9ydCB7IExpc3RDb21wb25lbnQgfSBmcm9tICcuL2xpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFBvcG92ZXJNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBTcGxpdFZpZXdNb2R1bGUsXG4gICAgVGFibGVNb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBQYWdpbmF0aW9uTW9kdWxlLFxuICAgIE5nU2VsZWN0TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1lc3NhZ2VNb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgICBQb3BvdmVyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtMaXN0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0xpc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBMaXN0TW9kdWxlIHt9XG4iXX0=