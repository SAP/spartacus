/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { concatMap, map, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../connectors";
import * as i3 from "@spartacus/user/account/root";
export class AsmBindCartService {
    constructor(commandService, asmConnector, userAccountFacade) {
        this.commandService = commandService;
        this.asmConnector = asmConnector;
        this.userAccountFacade = userAccountFacade;
        this.bindCartCommand$ = this.commandService.create((cartId) => this.userAccountFacade.get().pipe(map((user) => {
            if (user?.uid) {
                return user.uid;
            }
            else {
                throw new Error('No identifier for authenticated user found.');
            }
        }), take(1), concatMap((customerId) => this.asmConnector.bindCart({
            cartId,
            customerId,
        }))));
    }
    bindCart(cartId) {
        return this.bindCartCommand$.execute(cartId);
    }
}
AsmBindCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartService, deps: [{ token: i1.CommandService }, { token: i2.AsmConnector }, { token: i3.UserAccountFacade }], target: i0.ɵɵFactoryTarget.Injectable });
AsmBindCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CommandService }, { type: i2.AsmConnector }, { type: i3.UserAccountFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWJpbmQtY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jb3JlL2ZhY2FkZS9hc20tYmluZC1jYXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBSXRELE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFDWSxjQUE4QixFQUM5QixZQUEwQixFQUMxQixpQkFBb0M7UUFGcEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFHdEMscUJBQWdCLEdBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FDL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDWCxJQUFJLElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ2pCO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQzthQUNoRTtRQUNILENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUN6QixNQUFNO1lBQ04sVUFBVTtTQUNYLENBQUMsQ0FDSCxDQUNGLENBQ0YsQ0FBQztJQXBCRCxDQUFDO0lBc0JKLFFBQVEsQ0FBQyxNQUFjO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDOzsrR0E3QlUsa0JBQWtCO21IQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFzbUJpbmRDYXJ0RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9hc20vcm9vdCc7XG5pbXBvcnQgeyBDb21tYW5kLCBDb21tYW5kU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyQWNjb3VudEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9hY2NvdW50L3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY29uY2F0TWFwLCBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBc21Db25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFzbUJpbmRDYXJ0U2VydmljZSBpbXBsZW1lbnRzIEFzbUJpbmRDYXJ0RmFjYWRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbW1hbmRTZXJ2aWNlOiBDb21tYW5kU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXNtQ29ubmVjdG9yOiBBc21Db25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIHVzZXJBY2NvdW50RmFjYWRlOiBVc2VyQWNjb3VudEZhY2FkZVxuICApIHt9XG5cbiAgcHJvdGVjdGVkIGJpbmRDYXJ0Q29tbWFuZCQ6IENvbW1hbmQ8c3RyaW5nLCB1bmtub3duPiA9XG4gICAgdGhpcy5jb21tYW5kU2VydmljZS5jcmVhdGUoKGNhcnRJZCkgPT5cbiAgICAgIHRoaXMudXNlckFjY291bnRGYWNhZGUuZ2V0KCkucGlwZShcbiAgICAgICAgbWFwKCh1c2VyKSA9PiB7XG4gICAgICAgICAgaWYgKHVzZXI/LnVpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHVzZXIudWlkO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGlkZW50aWZpZXIgZm9yIGF1dGhlbnRpY2F0ZWQgdXNlciBmb3VuZC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICBjb25jYXRNYXAoKGN1c3RvbWVySWQpID0+XG4gICAgICAgICAgdGhpcy5hc21Db25uZWN0b3IuYmluZENhcnQoe1xuICAgICAgICAgICAgY2FydElkLFxuICAgICAgICAgICAgY3VzdG9tZXJJZCxcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcblxuICBiaW5kQ2FydChjYXJ0SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLmJpbmRDYXJ0Q29tbWFuZCQuZXhlY3V0ZShjYXJ0SWQpO1xuICB9XG59XG4iXX0=