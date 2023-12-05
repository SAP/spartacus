/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { NotificationMessageComponent } from './notification-message.component';
import * as i0 from "@angular/core";
export class NotificationMessageModule {
}
NotificationMessageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotificationMessageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NotificationMessageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: NotificationMessageModule, declarations: [NotificationMessageComponent], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
NotificationMessageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotificationMessageModule, imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotificationMessageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
                    declarations: [NotificationMessageComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLW1lc3NhZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9tZXNzYWdlL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24tbWVzc2FnZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBTWhGLE1BQU0sT0FBTyx5QkFBeUI7O3NIQUF6Qix5QkFBeUI7dUhBQXpCLHlCQUF5QixpQkFGckIsNEJBQTRCLGFBRGpDLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLG1CQUFtQjt1SEFHeEQseUJBQXlCLFlBSDFCLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLG1CQUFtQjsyRkFHeEQseUJBQXlCO2tCQUpyQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixDQUFDO29CQUNwRSxZQUFZLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztpQkFDN0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSwgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25NZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9ub3RpZmljYXRpb24tbWVzc2FnZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJMThuTW9kdWxlLCBJY29uTW9kdWxlLCBLZXlib2FyZEZvY3VzTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm90aWZpY2F0aW9uTWVzc2FnZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbk1lc3NhZ2VNb2R1bGUge31cbiJdfQ==