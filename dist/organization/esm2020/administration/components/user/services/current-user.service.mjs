/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { map } from 'rxjs/operators';
import { CurrentItemService } from '../../shared/current-item.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/organization/administration/core";
export class CurrentUserService extends CurrentItemService {
    constructor(routingService, b2bUserService) {
        super(routingService);
        this.routingService = routingService;
        this.b2bUserService = b2bUserService;
        this.name$ = this.item$.pipe(map((user) => user?.name));
    }
    getParamKey() {
        return ROUTE_PARAMS.userCode;
    }
    getItem(code) {
        return this.b2bUserService.get(code);
    }
    getError(code) {
        return this.b2bUserService.getErrorState(code);
    }
}
CurrentUserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUserService, deps: [{ token: i1.RoutingService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentUserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC11c2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci9zZXJ2aWNlcy9jdXJyZW50LXVzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFM0UsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7O0FBS3ZFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxrQkFBMkI7SUFLakUsWUFDWSxjQUE4QixFQUM5QixjQUE4QjtRQUV4QyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFIWixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTmpDLFVBQUssR0FBbUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQzlELEdBQUcsQ0FBQyxDQUFDLElBQXlCLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDL0MsQ0FBQztJQU9GLENBQUM7SUFFUyxXQUFXO1FBQ25CLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRVMsT0FBTyxDQUFDLElBQVk7UUFDNUIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVk7UUFDbkIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDOzsrR0F0QlUsa0JBQWtCO21IQUFsQixrQkFBa0IsY0FGakIsTUFBTTsyRkFFUCxrQkFBa0I7a0JBSDlCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQjJCVXNlciwgUm91dGluZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQjJCVXNlclNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IFJPVVRFX1BBUkFNUyB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ3VycmVudEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2N1cnJlbnQtaXRlbS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbnRVc2VyU2VydmljZSBleHRlbmRzIEN1cnJlbnRJdGVtU2VydmljZTxCMkJVc2VyPiB7XG4gIHJlYWRvbmx5IG5hbWUkOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4gPSB0aGlzLml0ZW0kLnBpcGUoXG4gICAgbWFwKCh1c2VyOiBCMkJVc2VyIHwgdW5kZWZpbmVkKSA9PiB1c2VyPy5uYW1lKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGIyYlVzZXJTZXJ2aWNlOiBCMkJVc2VyU2VydmljZVxuICApIHtcbiAgICBzdXBlcihyb3V0aW5nU2VydmljZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0UGFyYW1LZXkoKSB7XG4gICAgcmV0dXJuIFJPVVRFX1BBUkFNUy51c2VyQ29kZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJdGVtKGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8QjJCVXNlcj4ge1xuICAgIHJldHVybiB0aGlzLmIyYlVzZXJTZXJ2aWNlLmdldChjb2RlKTtcbiAgfVxuXG4gIGdldEVycm9yKGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmIyYlVzZXJTZXJ2aWNlLmdldEVycm9yU3RhdGUoY29kZSk7XG4gIH1cbn1cbiJdfQ==