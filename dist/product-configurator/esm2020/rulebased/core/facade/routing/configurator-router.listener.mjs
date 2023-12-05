/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../configurator-cart.service";
import * as i2 from "@spartacus/core";
import * as i3 from "../../services/configurator-quantity.service";
export class ConfiguratorRouterListener {
    constructor(configuratorCartService, routingService, configuratorQuantityService) {
        this.configuratorCartService = configuratorCartService;
        this.routingService = routingService;
        this.configuratorQuantityService = configuratorQuantityService;
        this.subscription = new Subscription();
        this.observeRouterChanges();
    }
    observeRouterChanges() {
        this.subscription.add(this.routingService.getRouterState().subscribe((routerState) => {
            if (!this.isConfiguratorRelatedRoute(routerState.state.semanticRoute)) {
                this.configuratorCartService.removeCartBoundConfigurations();
                if (this.configuratorQuantityService) {
                    this.configuratorQuantityService.setQuantity(1);
                }
            }
        }));
    }
    isConfiguratorRelatedRoute(semanticRoute) {
        return semanticRoute ? semanticRoute.includes('configure') : false;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ConfiguratorRouterListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterListener, deps: [{ token: i1.ConfiguratorCartService }, { token: i2.RoutingService }, { token: i3.ConfiguratorQuantityService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorRouterListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterListener, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorCartService }, { type: i2.RoutingService }, { type: i3.ConfiguratorQuantityService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXJvdXRlci5saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29yZS9mYWNhZGUvcm91dGluZy9jb25maWd1cmF0b3Itcm91dGVyLmxpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQUtwQyxNQUFNLE9BQU8sMEJBQTBCO0lBa0JyQyxZQUNZLHVCQUFnRCxFQUNoRCxjQUE4QixFQUU5QiwyQkFBeUQ7UUFIekQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFOUIsZ0NBQTJCLEdBQTNCLDJCQUEyQixDQUE4QjtRQXJCM0QsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBdUIxQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRVMsb0JBQW9CO1FBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDckUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLDZCQUE2QixFQUFFLENBQUM7Z0JBQzdELElBQUksSUFBSSxDQUFDLDJCQUEyQixFQUFFO29CQUNwQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqRDthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFUywwQkFBMEIsQ0FBQyxhQUFzQjtRQUN6RCxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzt1SEE5Q1UsMEJBQTBCOzJIQUExQiwwQkFBMEIsY0FEYixNQUFNOzJGQUNuQiwwQkFBMEI7a0JBRHRDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFzQjdCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckNhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vY29uZmlndXJhdG9yLWNhcnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JRdWFudGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb25maWd1cmF0b3ItcXVhbnRpdHkuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yUm91dGVyTGlzdGVuZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIC8vIFRPRE8gKENYU1BBLTMzOTIpOiBtYWtlIGNvbmZpZ3VyYXRvclF1YW50aXR5U2VydmljZSBhIHJlcXVpcmVkIGRlcGVuZGVuY3lcbiAgY29uc3RydWN0b3IoXG4gICAgY29uZmlndXJhdG9yQ2FydFNlcnZpY2U6IENvbmZpZ3VyYXRvckNhcnRTZXJ2aWNlLFxuICAgIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3VuaWZpZWQtc2lnbmF0dXJlc1xuICAgIGNvbmZpZ3VyYXRvclF1YW50aXR5U2VydmljZTogQ29uZmlndXJhdG9yUXVhbnRpdHlTZXJ2aWNlXG4gICk7XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHNpbmNlIDYuMVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgY29uZmlndXJhdG9yQ2FydFNlcnZpY2U6IENvbmZpZ3VyYXRvckNhcnRTZXJ2aWNlLFxuICAgIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZVxuICApO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yQ2FydFNlcnZpY2U6IENvbmZpZ3VyYXRvckNhcnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKClcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yUXVhbnRpdHlTZXJ2aWNlPzogQ29uZmlndXJhdG9yUXVhbnRpdHlTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMub2JzZXJ2ZVJvdXRlckNoYW5nZXMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvYnNlcnZlUm91dGVyQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdldFJvdXRlclN0YXRlKCkuc3Vic2NyaWJlKChyb3V0ZXJTdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaXNDb25maWd1cmF0b3JSZWxhdGVkUm91dGUocm91dGVyU3RhdGUuc3RhdGUuc2VtYW50aWNSb3V0ZSkpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckNhcnRTZXJ2aWNlLnJlbW92ZUNhcnRCb3VuZENvbmZpZ3VyYXRpb25zKCk7XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdG9yUXVhbnRpdHlTZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvclF1YW50aXR5U2VydmljZS5zZXRRdWFudGl0eSgxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0NvbmZpZ3VyYXRvclJlbGF0ZWRSb3V0ZShzZW1hbnRpY1JvdXRlPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNlbWFudGljUm91dGUgPyBzZW1hbnRpY1JvdXRlLmluY2x1ZGVzKCdjb25maWd1cmUnKSA6IGZhbHNlO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19