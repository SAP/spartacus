/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { filter, map, pairwise } from 'rxjs/operators';
import { createFrom } from '../../../util/create-from';
import { AuthActions } from '../store/actions/index';
import { LoginEvent, LogoutEvent } from './user-auth.events';
import * as i0 from "@angular/core";
import * as i1 from "../../../state/event/index";
import * as i2 from "../../../event/event.service";
import * as i3 from "../facade/auth.service";
export class UserAuthEventBuilder {
    constructor(stateEventService, eventService, authService) {
        this.stateEventService = stateEventService;
        this.eventService = eventService;
        this.authService = authService;
        this.register();
    }
    /**
     * Registers user auth events
     */
    register() {
        this.registerLoginEvent();
        this.registerLogoutEvent();
    }
    /**
     * Register a login event
     */
    registerLoginEvent() {
        this.stateEventService.register({
            action: AuthActions.LOGIN,
            event: LoginEvent,
        });
    }
    /**
     * Register a logout event
     */
    registerLogoutEvent() {
        this.eventService.register(LogoutEvent, this.buildLogoutEvent());
    }
    /**
     * Returns logout event stream
     */
    buildLogoutEvent() {
        return this.authService.isUserLoggedIn().pipe(pairwise(), filter(([prev, curr]) => prev && !curr), map(() => createFrom(LogoutEvent, {})));
    }
}
UserAuthEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAuthEventBuilder, deps: [{ token: i1.StateEventService }, { token: i2.EventService }, { token: i3.AuthService }], target: i0.ɵɵFactoryTarget.Injectable });
UserAuthEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAuthEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAuthEventBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StateEventService }, { type: i2.EventService }, { type: i3.AuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hdXRoLWV2ZW50LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9hdXRoL3VzZXItYXV0aC9ldmVudHMvdXNlci1hdXRoLWV2ZW50LmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7OztBQUs3RCxNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLFlBQ1ksaUJBQW9DLEVBQ3BDLFlBQTBCLEVBQzFCLFdBQXdCO1FBRnhCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFFbEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNPLFFBQVE7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBQ08sa0JBQWtCO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUM7WUFDOUIsTUFBTSxFQUFFLFdBQVcsQ0FBQyxLQUFLO1lBQ3pCLEtBQUssRUFBRSxVQUFVO1NBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNPLG1CQUFtQjtRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7O09BRUc7SUFDTyxnQkFBZ0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FDM0MsUUFBUSxFQUFFLEVBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUN2QyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUN2QyxDQUFDO0lBQ0osQ0FBQzs7aUhBM0NVLG9CQUFvQjtxSEFBcEIsb0JBQW9CLGNBRm5CLE1BQU07MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBwYWlyd2lzZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEV2ZW50U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2V2ZW50L2V2ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhdGVFdmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9ldmVudC9pbmRleCc7XG5pbXBvcnQgeyBjcmVhdGVGcm9tIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9jcmVhdGUtZnJvbSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL2ZhY2FkZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aEFjdGlvbnMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IExvZ2luRXZlbnQsIExvZ291dEV2ZW50IH0gZnJvbSAnLi91c2VyLWF1dGguZXZlbnRzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJBdXRoRXZlbnRCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHN0YXRlRXZlbnRTZXJ2aWNlOiBTdGF0ZUV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZVxuICApIHtcbiAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIHVzZXIgYXV0aCBldmVudHNcbiAgICovXG4gIHByb3RlY3RlZCByZWdpc3RlcigpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdGVyTG9naW5FdmVudCgpO1xuICAgIHRoaXMucmVnaXN0ZXJMb2dvdXRFdmVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbG9naW4gZXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCByZWdpc3RlckxvZ2luRXZlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZUV2ZW50U2VydmljZS5yZWdpc3Rlcih7XG4gICAgICBhY3Rpb246IEF1dGhBY3Rpb25zLkxPR0lOLFxuICAgICAgZXZlbnQ6IExvZ2luRXZlbnQsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBsb2dvdXQgZXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCByZWdpc3RlckxvZ291dEV2ZW50KCk6IHZvaWQge1xuICAgIHRoaXMuZXZlbnRTZXJ2aWNlLnJlZ2lzdGVyKExvZ291dEV2ZW50LCB0aGlzLmJ1aWxkTG9nb3V0RXZlbnQoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBsb2dvdXQgZXZlbnQgc3RyZWFtXG4gICAqL1xuICBwcm90ZWN0ZWQgYnVpbGRMb2dvdXRFdmVudCgpOiBPYnNlcnZhYmxlPExvZ291dEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UuaXNVc2VyTG9nZ2VkSW4oKS5waXBlKFxuICAgICAgcGFpcndpc2UoKSxcbiAgICAgIGZpbHRlcigoW3ByZXYsIGN1cnJdKSA9PiBwcmV2ICYmICFjdXJyKSxcbiAgICAgIG1hcCgoKSA9PiBjcmVhdGVGcm9tKExvZ291dEV2ZW50LCB7fSkpXG4gICAgKTtcbiAgfVxufVxuIl19