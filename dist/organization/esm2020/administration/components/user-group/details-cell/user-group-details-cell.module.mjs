/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { PopoverModule } from '@spartacus/storefront';
import { UserGroupDetailsCellComponent } from './user-group-details-cell.component';
import * as i0 from "@angular/core";
export class UserGroupDetailsCellModule {
}
UserGroupDetailsCellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsCellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserGroupDetailsCellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsCellModule, declarations: [UserGroupDetailsCellComponent], imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule], exports: [UserGroupDetailsCellComponent] });
UserGroupDetailsCellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsCellModule, imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsCellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule],
                    declarations: [UserGroupDetailsCellComponent],
                    exports: [UserGroupDetailsCellComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1kZXRhaWxzLWNlbGwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXItZ3JvdXAvZGV0YWlscy1jZWxsL3VzZXItZ3JvdXAtZGV0YWlscy1jZWxsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQU9wRixNQUFNLE9BQU8sMEJBQTBCOzt1SEFBMUIsMEJBQTBCO3dIQUExQiwwQkFBMEIsaUJBSHRCLDZCQUE2QixhQURsQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxhQUVoRSw2QkFBNkI7d0hBRTVCLDBCQUEwQixZQUozQixZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUzsyRkFJL0QsMEJBQTBCO2tCQUx0QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUM7b0JBQzNFLFlBQVksRUFBRSxDQUFDLDZCQUE2QixDQUFDO29CQUM3QyxPQUFPLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztpQkFDekMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUG9wb3Zlck1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBVc2VyR3JvdXBEZXRhaWxzQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vdXNlci1ncm91cC1kZXRhaWxzLWNlbGwuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUG9wb3Zlck1vZHVsZSwgUm91dGVyTW9kdWxlLCBJMThuTW9kdWxlLCBVcmxNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtVc2VyR3JvdXBEZXRhaWxzQ2VsbENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtVc2VyR3JvdXBEZXRhaWxzQ2VsbENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJHcm91cERldGFpbHNDZWxsTW9kdWxlIHt9XG4iXX0=