/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { createFrom, } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { NavigationEvent } from './navigation.event';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
/**
 * A builder for the NavigationEvent
 */
export class NavigationEventBuilder {
    constructor(actions, eventService) {
        this.actions = actions;
        this.eventService = eventService;
        this.register();
    }
    /**
     * Registers events
     */
    register() {
        this.eventService.register(NavigationEvent, this.buildNavigationEvent());
    }
    /**
     * Builds the navigation events
     */
    buildNavigationEvent() {
        return this.getNavigatedEvent().pipe(map((state) => createFrom(NavigationEvent, {
            context: state.context,
            semanticRoute: state.semanticRoute,
            url: state.url,
            params: state.params,
        })));
    }
    getNavigatedEvent() {
        return this.actions.pipe(ofType(ROUTER_NAVIGATED), map((event) => event.payload.routerState));
    }
}
NavigationEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NavigationEventBuilder, deps: [{ token: i1.ActionsSubject }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
NavigationEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NavigationEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NavigationEventBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ActionsSubject }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1ldmVudC5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9ldmVudHMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLWV2ZW50LmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQXlCLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFN0UsT0FBTyxFQUVMLFVBQVUsR0FFWCxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFFckQ7O0dBRUc7QUFJSCxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLFlBQ1ksT0FBdUIsRUFDdkIsWUFBMEI7UUFEMUIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFcEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNPLFFBQVE7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVEOztPQUVHO0lBQ08sb0JBQW9CO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUNsQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNaLFVBQVUsQ0FBQyxlQUFlLEVBQUU7WUFDMUIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ3RCLGFBQWEsRUFBRSxLQUFLLENBQUMsYUFBYTtZQUNsQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7WUFDZCxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07U0FDckIsQ0FBQyxDQUNILENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDdEIsTUFBTSxDQUNKLGdCQUFnQixDQUNqQixFQUNELEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FDMUMsQ0FBQztJQUNKLENBQUM7O21IQXRDVSxzQkFBc0I7dUhBQXRCLHNCQUFzQixjQUZyQixNQUFNOzJGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IFJvdXRlck5hdmlnYXRlZEFjdGlvbiwgUk9VVEVSX05BVklHQVRFRCB9IGZyb20gJ0BuZ3J4L3JvdXRlci1zdG9yZSc7XG5pbXBvcnQgeyBBY3Rpb25zU3ViamVjdCB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlclN0YXRlU25hcHNob3QsXG4gIGNyZWF0ZUZyb20sXG4gIEV2ZW50U2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5hdmlnYXRpb25FdmVudCB9IGZyb20gJy4vbmF2aWdhdGlvbi5ldmVudCc7XG5cbi8qKlxuICogQSBidWlsZGVyIGZvciB0aGUgTmF2aWdhdGlvbkV2ZW50XG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uRXZlbnRCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFjdGlvbnM6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZVxuICApIHtcbiAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGV2ZW50c1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyKCk6IHZvaWQge1xuICAgIHRoaXMuZXZlbnRTZXJ2aWNlLnJlZ2lzdGVyKE5hdmlnYXRpb25FdmVudCwgdGhpcy5idWlsZE5hdmlnYXRpb25FdmVudCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZHMgdGhlIG5hdmlnYXRpb24gZXZlbnRzXG4gICAqL1xuICBwcm90ZWN0ZWQgYnVpbGROYXZpZ2F0aW9uRXZlbnQoKTogT2JzZXJ2YWJsZTxOYXZpZ2F0aW9uRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXZpZ2F0ZWRFdmVudCgpLnBpcGUoXG4gICAgICBtYXAoKHN0YXRlKSA9PlxuICAgICAgICBjcmVhdGVGcm9tKE5hdmlnYXRpb25FdmVudCwge1xuICAgICAgICAgIGNvbnRleHQ6IHN0YXRlLmNvbnRleHQsXG4gICAgICAgICAgc2VtYW50aWNSb3V0ZTogc3RhdGUuc2VtYW50aWNSb3V0ZSxcbiAgICAgICAgICB1cmw6IHN0YXRlLnVybCxcbiAgICAgICAgICBwYXJhbXM6IHN0YXRlLnBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROYXZpZ2F0ZWRFdmVudCgpOiBPYnNlcnZhYmxlPEFjdGl2YXRlZFJvdXRlclN0YXRlU25hcHNob3Q+IHtcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zLnBpcGUoXG4gICAgICBvZlR5cGU8Um91dGVyTmF2aWdhdGVkQWN0aW9uPEFjdGl2YXRlZFJvdXRlclN0YXRlU25hcHNob3Q+PihcbiAgICAgICAgUk9VVEVSX05BVklHQVRFRFxuICAgICAgKSxcbiAgICAgIG1hcCgoZXZlbnQpID0+IGV2ZW50LnBheWxvYWQucm91dGVyU3RhdGUpXG4gICAgKTtcbiAgfVxufVxuIl19