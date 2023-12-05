/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Input, Directive } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefinder/core";
/* eslint-disable @angular-eslint/directive-class-suffix */
export class AbstractStoreItemComponent {
    constructor(storeFinderService) {
        this.storeFinderService = storeFinderService;
    }
    getDirections(location) {
        return this.storeFinderService.getDirections(location);
    }
    getFormattedStoreAddress(addressParts) {
        return addressParts.filter(Boolean).join(', ');
    }
}
AbstractStoreItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AbstractStoreItemComponent, deps: [{ token: i1.StoreFinderService }], target: i0.ɵɵFactoryTarget.Directive });
AbstractStoreItemComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: AbstractStoreItemComponent, inputs: { location: "location" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AbstractStoreItemComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.StoreFinderService }]; }, propDecorators: { location: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3Qtc3RvcmUtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvc3RvcmVmaW5kZXIvY29tcG9uZW50cy9hYnN0cmFjdC1zdG9yZS1pdGVtL2Fic3RyYWN0LXN0b3JlLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBR2pELDJEQUEyRDtBQUUzRCxNQUFNLE9BQU8sMEJBQTBCO0lBR3JDLFlBQXNCLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQUcsQ0FBQztJQUVoRSxhQUFhLENBQUMsUUFBYTtRQUN6QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELHdCQUF3QixDQUFDLFlBQXNCO1FBQzdDLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7dUhBWFUsMEJBQTBCOzJHQUExQiwwQkFBMEI7MkZBQTFCLDBCQUEwQjtrQkFEdEMsU0FBUzt5R0FFQyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZpbmRlci9jb3JlJztcblxuLyogZXNsaW50LWRpc2FibGUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1jbGFzcy1zdWZmaXggKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEFic3RyYWN0U3RvcmVJdGVtQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbG9jYXRpb247XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHN0b3JlRmluZGVyU2VydmljZTogU3RvcmVGaW5kZXJTZXJ2aWNlKSB7fVxuXG4gIGdldERpcmVjdGlvbnMobG9jYXRpb246IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmVGaW5kZXJTZXJ2aWNlLmdldERpcmVjdGlvbnMobG9jYXRpb24pO1xuICB9XG5cbiAgZ2V0Rm9ybWF0dGVkU3RvcmVBZGRyZXNzKGFkZHJlc3NQYXJ0czogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgIHJldHVybiBhZGRyZXNzUGFydHMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywgJyk7XG4gIH1cbn1cbiJdfQ==