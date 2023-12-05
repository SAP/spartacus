/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { LogoutEvent } from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../services/configurator-expert-mode.service";
import * as i3 from "../facade/configurator-commons.service";
export class ConfiguratorLogoutEventListener {
    constructor(eventService, configExpertModeService, configuratorCommonsService) {
        this.eventService = eventService;
        this.configExpertModeService = configExpertModeService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.subscription = new Subscription();
        this.onLogout();
    }
    onLogout() {
        this.subscription.add(merge(this.eventService.get(LogoutEvent)).subscribe(() => {
            this.configExpertModeService.setExpModeActive(false);
            this.configExpertModeService.setExpModeRequested(false);
            this.configuratorCommonsService.removeProductBoundConfigurations();
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ConfiguratorLogoutEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorLogoutEventListener, deps: [{ token: i1.EventService }, { token: i2.ConfiguratorExpertModeService }, { token: i3.ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorLogoutEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorLogoutEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorLogoutEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i2.ConfiguratorExpertModeService }, { type: i3.ConfiguratorCommonsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWxvZ291dC1ldmVudC5saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29yZS9ldmVudHMvY29uZmlndXJhdG9yLWxvZ291dC1ldmVudC5saXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVELE9BQU8sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQU8zQyxNQUFNLE9BQU8sK0JBQStCO0lBRzFDLFlBQ1ksWUFBMEIsRUFDMUIsdUJBQXNELEVBQ3RELDBCQUFzRDtRQUZ0RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQStCO1FBQ3RELCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFMeEQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBTzFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRVMsUUFBUTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN2RCxJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7NEhBdkJVLCtCQUErQjtnSUFBL0IsK0JBQStCLGNBRjlCLE1BQU07MkZBRVAsK0JBQStCO2tCQUgzQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRTZXJ2aWNlLCBMb2dvdXRFdmVudCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JFeHBlcnRNb2RlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NvbmZpZ3VyYXRvci1leHBlcnQtbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlIH0gZnJvbSAnLi4vZmFjYWRlL2NvbmZpZ3VyYXRvci1jb21tb25zLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yTG9nb3V0RXZlbnRMaXN0ZW5lciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWdFeHBlcnRNb2RlU2VydmljZTogQ29uZmlndXJhdG9yRXhwZXJ0TW9kZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlOiBDb25maWd1cmF0b3JDb21tb25zU2VydmljZVxuICApIHtcbiAgICB0aGlzLm9uTG9nb3V0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25Mb2dvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgbWVyZ2UodGhpcy5ldmVudFNlcnZpY2UuZ2V0KExvZ291dEV2ZW50KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5jb25maWdFeHBlcnRNb2RlU2VydmljZS5zZXRFeHBNb2RlQWN0aXZlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5jb25maWdFeHBlcnRNb2RlU2VydmljZS5zZXRFeHBNb2RlUmVxdWVzdGVkKGZhbHNlKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0b3JDb21tb25zU2VydmljZS5yZW1vdmVQcm9kdWN0Qm91bmRDb25maWd1cmF0aW9ucygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19