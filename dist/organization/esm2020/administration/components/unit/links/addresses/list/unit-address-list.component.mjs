/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { ListService } from '../../../../shared/list/list.service';
import { UnitAddressListService } from './unit-address-list.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../../shared/sub-list/sub-list.component";
import * as i3 from "@spartacus/core";
export class UnitAddressListComponent {
    constructor() {
        this.routerKey = ROUTE_PARAMS.addressCode;
    }
}
UnitAddressListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UnitAddressListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitAddressListComponent, selector: "cx-org-unit-address-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UnitAddressListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list\n  key=\"id\"\n  [routerKey]=\"routerKey\"\n  class=\"has-nested-view\"\n  [showHint]=\"true\"\n>\n  <a actions class=\"link\" routerLink=\"create\">\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i2.SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-address-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UnitAddressListService,
                        },
                    ], template: "<cx-org-sub-list\n  key=\"id\"\n  [routerKey]=\"routerKey\"\n  class=\"has-nested-view\"\n  [showHint]=\"true\"\n>\n  <a actions class=\"link\" routerLink=\"create\">\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1hZGRyZXNzLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlua3MvYWRkcmVzc2VzL2xpc3QvdW5pdC1hZGRyZXNzLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlua3MvYWRkcmVzc2VzL2xpc3QvdW5pdC1hZGRyZXNzLWxpc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7QUFjckUsTUFBTSxPQUFPLHdCQUF3QjtJQVpyQztRQWFFLGNBQVMsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDO0tBQ3RDOztxSEFGWSx3QkFBd0I7eUdBQXhCLHdCQUF3QixnR0FQeEI7UUFDVDtZQUNFLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLFdBQVcsRUFBRSxzQkFBc0I7U0FDcEM7S0FDRiwwQkNyQkgscVBBVUE7MkZEYWEsd0JBQXdCO2tCQVpwQyxTQUFTOytCQUNFLDBCQUEwQixtQkFFbkIsdUJBQXVCLENBQUMsTUFBTSxRQUN6QyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxhQUN2Qjt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsV0FBVzs0QkFDcEIsV0FBVyxFQUFFLHNCQUFzQjt5QkFDcEM7cUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBST1VURV9QQVJBTVMgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9yb290JztcbmltcG9ydCB7IExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2xpc3QvbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFVuaXRBZGRyZXNzTGlzdFNlcnZpY2UgfSBmcm9tICcuL3VuaXQtYWRkcmVzcy1saXN0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctdW5pdC1hZGRyZXNzLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vdW5pdC1hZGRyZXNzLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDogeyBjbGFzczogJ2NvbnRlbnQtd3JhcHBlcicgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTGlzdFNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogVW5pdEFkZHJlc3NMaXN0U2VydmljZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0QWRkcmVzc0xpc3RDb21wb25lbnQge1xuICByb3V0ZXJLZXkgPSBST1VURV9QQVJBTVMuYWRkcmVzc0NvZGU7XG59XG4iLCI8Y3gtb3JnLXN1Yi1saXN0XG4gIGtleT1cImlkXCJcbiAgW3JvdXRlcktleV09XCJyb3V0ZXJLZXlcIlxuICBjbGFzcz1cImhhcy1uZXN0ZWQtdmlld1wiXG4gIFtzaG93SGludF09XCJ0cnVlXCJcbj5cbiAgPGEgYWN0aW9ucyBjbGFzcz1cImxpbmtcIiByb3V0ZXJMaW5rPVwiY3JlYXRlXCI+XG4gICAge3sgJ29yZ2FuaXphdGlvbi5jcmVhdGUnIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9hPlxuPC9jeC1vcmctc3ViLWxpc3Q+XG4iXX0=