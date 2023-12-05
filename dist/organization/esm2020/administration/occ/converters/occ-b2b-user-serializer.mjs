/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OccB2bUserSerializer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        delete target.isAssignedToApprovers;
        if (target.active === false) {
            target.roles = [];
        }
        return target;
    }
}
OccB2bUserSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccB2bUserSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccB2bUserSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccB2bUserSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccB2bUserSerializer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWIyYi11c2VyLXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL29jYy9jb252ZXJ0ZXJzL29jYy1iMmItdXNlci1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU0zQyxNQUFNLE9BQU8sb0JBQW9CO0lBQy9CO1FBQ0UsZ0NBQWdDO0lBQ2xDLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBZSxFQUFFLE1BQW9CO1FBQzNDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLEdBQUcsRUFBRSxHQUFJLE1BQWMsRUFBaUIsQ0FBQztTQUNoRDtRQUNELE9BQVEsTUFBa0IsQ0FBQyxxQkFBcUIsQ0FBQztRQUNqRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQzNCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7aUhBZFUsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQjJCVXNlciwgQ29udmVydGVyLCBPY2MgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT2NjQjJiVXNlclNlcmlhbGl6ZXIgaW1wbGVtZW50cyBDb252ZXJ0ZXI8QjJCVXNlciwgT2NjLkIyQlVzZXI+IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxuXG4gIGNvbnZlcnQoc291cmNlOiBCMkJVc2VyLCB0YXJnZXQ/OiBPY2MuQjJCVXNlcik6IE9jYy5CMkJVc2VyIHtcbiAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldCA9IHsgLi4uKHNvdXJjZSBhcyBhbnkpIH0gYXMgT2NjLkIyQlVzZXI7XG4gICAgfVxuICAgIGRlbGV0ZSAodGFyZ2V0IGFzIEIyQlVzZXIpLmlzQXNzaWduZWRUb0FwcHJvdmVycztcbiAgICBpZiAodGFyZ2V0LmFjdGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRhcmdldC5yb2xlcyA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG59XG4iXX0=