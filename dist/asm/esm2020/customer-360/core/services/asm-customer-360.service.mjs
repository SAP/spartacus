/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../connectors/asm-customer-360.connector";
import * as i3 from "@spartacus/user/account/root";
export class AsmCustomer360Service {
    constructor(commandService, asmCustomer360Connector, userAccountFacade) {
        this.commandService = commandService;
        this.asmCustomer360Connector = asmCustomer360Connector;
        this.userAccountFacade = userAccountFacade;
        this.asmCustomer360Command$ = this.commandService.create((tabComponents) => {
            return this.userAccountFacade.get().pipe(take(1), concatMap((customer) => {
                const queries = tabComponents.reduce((requests, component) => {
                    if (component.requestData) {
                        return requests.concat(component.requestData);
                    }
                    return requests;
                }, []);
                if (queries.length > 0) {
                    const request = {
                        queries,
                        options: {
                            userId: customer?.customerId ?? '',
                        },
                    };
                    return this.asmCustomer360Connector.getAsmCustomer360Data(request);
                }
                else {
                    return of({
                        value: [],
                    });
                }
            }));
        });
    }
    get360Data(components) {
        return this.asmCustomer360Command$.execute(components);
    }
}
AsmCustomer360Service.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Service, deps: [{ token: i1.CommandService }, { token: i2.AsmCustomer360Connector }, { token: i3.UserAccountFacade }], target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomer360Service.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Service });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Service, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CommandService }, { type: i2.AsmCustomer360Connector }, { type: i3.UserAccountFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jdXN0b21lci0zNjAvY29yZS9zZXJ2aWNlcy9hc20tY3VzdG9tZXItMzYwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFVM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUlqRCxNQUFNLE9BQU8scUJBQXFCO0lBTWhDLFlBQ1ksY0FBOEIsRUFDOUIsdUJBQWdELEVBQ2hELGlCQUFvQztRQUZwQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRTlDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FDdEQsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDckIsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FDbEMsQ0FBQyxRQUFvQyxFQUFFLFNBQVMsRUFBRSxFQUFFO29CQUNsRCxJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUU7d0JBQ3pCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQy9DO29CQUNELE9BQU8sUUFBUSxDQUFDO2dCQUNsQixDQUFDLEVBQ0QsRUFBRSxDQUNILENBQUM7Z0JBRUYsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDdEIsTUFBTSxPQUFPLEdBQTBCO3dCQUNyQyxPQUFPO3dCQUNQLE9BQU8sRUFBRTs0QkFDUCxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsSUFBSSxFQUFFO3lCQUNuQztxQkFDRixDQUFDO29CQUNGLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLHFCQUFxQixDQUN2RCxPQUFPLENBQ1IsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxPQUFPLEVBQUUsQ0FBQzt3QkFDUixLQUFLLEVBQUUsRUFBRTtxQkFDVixDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0osQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsVUFBVSxDQUNSLFVBQTZDO1FBRTdDLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxDQUFDOztrSEFuRFUscUJBQXFCO3NIQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFzbUN1c3RvbWVyMzYwRmFjYWRlLFxuICBBc21DdXN0b21lcjM2MFF1ZXJ5LFxuICBBc21DdXN0b21lcjM2MFJlcXVlc3QsXG4gIEFzbUN1c3RvbWVyMzYwUmVzcG9uc2UsXG4gIEFzbUN1c3RvbWVyMzYwVGFiQ29tcG9uZW50LFxufSBmcm9tICdAc3BhcnRhY3VzL2FzbS9jdXN0b21lci0zNjAvcm9vdCc7XG5pbXBvcnQgeyBDb21tYW5kLCBDb21tYW5kU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyQWNjb3VudEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9hY2NvdW50L3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwQ29ubmVjdG9yIH0gZnJvbSAnLi4vY29ubmVjdG9ycy9hc20tY3VzdG9tZXItMzYwLmNvbm5lY3Rvcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBc21DdXN0b21lcjM2MFNlcnZpY2UgaW1wbGVtZW50cyBBc21DdXN0b21lcjM2MEZhY2FkZSB7XG4gIHByb3RlY3RlZCBhc21DdXN0b21lcjM2MENvbW1hbmQkOiBDb21tYW5kPFxuICAgIEFycmF5PEFzbUN1c3RvbWVyMzYwVGFiQ29tcG9uZW50PixcbiAgICBBc21DdXN0b21lcjM2MFJlc3BvbnNlXG4gID47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbW1hbmRTZXJ2aWNlOiBDb21tYW5kU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXNtQ3VzdG9tZXIzNjBDb25uZWN0b3I6IEFzbUN1c3RvbWVyMzYwQ29ubmVjdG9yLFxuICAgIHByb3RlY3RlZCB1c2VyQWNjb3VudEZhY2FkZTogVXNlckFjY291bnRGYWNhZGVcbiAgKSB7XG4gICAgdGhpcy5hc21DdXN0b21lcjM2MENvbW1hbmQkID0gdGhpcy5jb21tYW5kU2VydmljZS5jcmVhdGUoXG4gICAgICAodGFiQ29tcG9uZW50cykgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyQWNjb3VudEZhY2FkZS5nZXQoKS5waXBlKFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgY29uY2F0TWFwKChjdXN0b21lcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgcXVlcmllcyA9IHRhYkNvbXBvbmVudHMucmVkdWNlKFxuICAgICAgICAgICAgICAocmVxdWVzdHM6IEFycmF5PEFzbUN1c3RvbWVyMzYwUXVlcnk+LCBjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LnJlcXVlc3REYXRhKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdHMuY29uY2F0KGNvbXBvbmVudC5yZXF1ZXN0RGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0cztcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW11cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChxdWVyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdDogQXNtQ3VzdG9tZXIzNjBSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgIHF1ZXJpZXMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgdXNlcklkOiBjdXN0b21lcj8uY3VzdG9tZXJJZCA/PyAnJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hc21DdXN0b21lcjM2MENvbm5lY3Rvci5nZXRBc21DdXN0b21lcjM2MERhdGEoXG4gICAgICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9mKHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogW10sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGdldDM2MERhdGEoXG4gICAgY29tcG9uZW50czogQXJyYXk8QXNtQ3VzdG9tZXIzNjBUYWJDb21wb25lbnQ+XG4gICk6IE9ic2VydmFibGU8QXNtQ3VzdG9tZXIzNjBSZXNwb25zZSB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmFzbUN1c3RvbWVyMzYwQ29tbWFuZCQuZXhlY3V0ZShjb21wb25lbnRzKTtcbiAgfVxufVxuIl19