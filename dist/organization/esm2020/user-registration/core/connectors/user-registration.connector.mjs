/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./user-registration.adapter";
export class UserRegistrationConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    registerUser(userData) {
        return this.adapter.registerUser(userData);
    }
}
UserRegistrationConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationConnector, deps: [{ token: i1.UserRegistrationAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
UserRegistrationConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserRegistrationAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZWdpc3RyYXRpb24uY29ubmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi91c2VyLXJlZ2lzdHJhdGlvbi9jb3JlL2Nvbm5lY3RvcnMvdXNlci1yZWdpc3RyYXRpb24uY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNM0MsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQyxZQUFzQixPQUFnQztRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUFHLENBQUM7SUFFMUQsWUFBWSxDQUNWLFFBQXNDO1FBRXRDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7c0hBUFUseUJBQXlCOzBIQUF6Qix5QkFBeUI7MkZBQXpCLHlCQUF5QjtrQkFEckMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb24gfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi91c2VyLXJlZ2lzdHJhdGlvbi9yb290JztcbmltcG9ydCB7IFVzZXJSZWdpc3RyYXRpb25BZGFwdGVyIH0gZnJvbSAnLi91c2VyLXJlZ2lzdHJhdGlvbi5hZGFwdGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJSZWdpc3RyYXRpb25Db25uZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYWRhcHRlcjogVXNlclJlZ2lzdHJhdGlvbkFkYXB0ZXIpIHt9XG5cbiAgcmVnaXN0ZXJVc2VyKFxuICAgIHVzZXJEYXRhOiBPcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIucmVnaXN0ZXJVc2VyKHVzZXJEYXRhKTtcbiAgfVxufVxuIl19