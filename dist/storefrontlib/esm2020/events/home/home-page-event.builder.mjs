/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createFrom } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import { NavigationEvent } from '../navigation/navigation.event';
import { HomePageEvent } from './home-page.events';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class HomePageEventBuilder {
    constructor(eventService) {
        this.eventService = eventService;
        this.register();
    }
    register() {
        this.eventService.register(HomePageEvent, this.buildHomePageEvent());
    }
    buildHomePageEvent() {
        return this.eventService.get(NavigationEvent).pipe(filter((navigationEvent) => navigationEvent.semanticRoute === 'home'), map((navigationEvent) => createFrom(HomePageEvent, {
            navigation: navigationEvent,
        })));
    }
}
HomePageEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HomePageEventBuilder, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
HomePageEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HomePageEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HomePageEventBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLWV2ZW50LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2V2ZW50cy9ob21lL2hvbWUtcGFnZS1ldmVudC5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQWdCLE1BQU0saUJBQWlCLENBQUM7QUFFM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7QUFLbkQsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUFzQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUM5QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVTLFFBQVE7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVTLGtCQUFrQjtRQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FDaEQsTUFBTSxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxFQUNyRSxHQUFHLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUN0QixVQUFVLENBQUMsYUFBYSxFQUFFO1lBQ3hCLFVBQVUsRUFBRSxlQUFlO1NBQzVCLENBQUMsQ0FDSCxDQUNGLENBQUM7SUFDSixDQUFDOztpSEFsQlUsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlRnJvbSwgRXZlbnRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkV2ZW50IH0gZnJvbSAnLi4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmV2ZW50JztcbmltcG9ydCB7IEhvbWVQYWdlRXZlbnQgfSBmcm9tICcuL2hvbWUtcGFnZS5ldmVudHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSG9tZVBhZ2VFdmVudEJ1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UpIHtcbiAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5ldmVudFNlcnZpY2UucmVnaXN0ZXIoSG9tZVBhZ2VFdmVudCwgdGhpcy5idWlsZEhvbWVQYWdlRXZlbnQoKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYnVpbGRIb21lUGFnZUV2ZW50KCk6IE9ic2VydmFibGU8SG9tZVBhZ2VFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZS5nZXQoTmF2aWdhdGlvbkV2ZW50KS5waXBlKFxuICAgICAgZmlsdGVyKChuYXZpZ2F0aW9uRXZlbnQpID0+IG5hdmlnYXRpb25FdmVudC5zZW1hbnRpY1JvdXRlID09PSAnaG9tZScpLFxuICAgICAgbWFwKChuYXZpZ2F0aW9uRXZlbnQpID0+XG4gICAgICAgIGNyZWF0ZUZyb20oSG9tZVBhZ2VFdmVudCwge1xuICAgICAgICAgIG5hdmlnYXRpb246IG5hdmlnYXRpb25FdmVudCxcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG59XG4iXX0=