/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UserActions } from '../store/actions/index';
import { AddUserAddressEvent, DeleteUserAddressEvent, UpdateUserAddressEvent, } from './user.events';
import * as i0 from "@angular/core";
import * as i1 from "../../state/event/state-event.service";
export class UserEventBuilder {
    constructor(stateEventService) {
        this.stateEventService = stateEventService;
        this.register();
    }
    /**
     * Registers user events
     */
    register() {
        this.updateUserAddressEvent();
        this.deleteUserAddressEvent();
        this.addUserAddressEvent();
    }
    /**
     * Register an address successfully updated event
     */
    updateUserAddressEvent() {
        this.stateEventService.register({
            action: UserActions.UPDATE_USER_ADDRESS,
            event: UpdateUserAddressEvent,
        });
    }
    addUserAddressEvent() {
        this.stateEventService.register({
            action: UserActions.ADD_USER_ADDRESS,
            event: AddUserAddressEvent,
        });
    }
    deleteUserAddressEvent() {
        this.stateEventService.register({
            action: UserActions.DELETE_USER_ADDRESS,
            event: DeleteUserAddressEvent,
        });
    }
}
UserEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEventBuilder, deps: [{ token: i1.StateEventService }], target: i0.ɵɵFactoryTarget.Injectable });
UserEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEventBuilder });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEventBuilder, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.StateEventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ldmVudC5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvdXNlci9ldmVudHMvdXNlci1ldmVudC5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLHNCQUFzQixFQUN0QixzQkFBc0IsR0FDdkIsTUFBTSxlQUFlLENBQUM7OztBQUd2QixNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQXNCLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3hELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDTyxRQUFRO1FBQ2hCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNPLHNCQUFzQjtRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDO1lBQzlCLE1BQU0sRUFBRSxXQUFXLENBQUMsbUJBQW1CO1lBQ3ZDLEtBQUssRUFBRSxzQkFBc0I7U0FDOUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLG1CQUFtQjtRQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDO1lBQzlCLE1BQU0sRUFBRSxXQUFXLENBQUMsZ0JBQWdCO1lBQ3BDLEtBQUssRUFBRSxtQkFBbUI7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLHNCQUFzQjtRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDO1lBQzlCLE1BQU0sRUFBRSxXQUFXLENBQUMsbUJBQW1CO1lBQ3ZDLEtBQUssRUFBRSxzQkFBc0I7U0FDOUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7NkdBcENVLGdCQUFnQjtpSEFBaEIsZ0JBQWdCOzJGQUFoQixnQkFBZ0I7a0JBRDVCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGF0ZUV2ZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3N0YXRlL2V2ZW50L3N0YXRlLWV2ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlckFjdGlvbnMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7XG4gIEFkZFVzZXJBZGRyZXNzRXZlbnQsXG4gIERlbGV0ZVVzZXJBZGRyZXNzRXZlbnQsXG4gIFVwZGF0ZVVzZXJBZGRyZXNzRXZlbnQsXG59IGZyb20gJy4vdXNlci5ldmVudHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlckV2ZW50QnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzdGF0ZUV2ZW50U2VydmljZTogU3RhdGVFdmVudFNlcnZpY2UpIHtcbiAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIHVzZXIgZXZlbnRzXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVVc2VyQWRkcmVzc0V2ZW50KCk7XG4gICAgdGhpcy5kZWxldGVVc2VyQWRkcmVzc0V2ZW50KCk7XG4gICAgdGhpcy5hZGRVc2VyQWRkcmVzc0V2ZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYW4gYWRkcmVzcyBzdWNjZXNzZnVsbHkgdXBkYXRlZCBldmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIHVwZGF0ZVVzZXJBZGRyZXNzRXZlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZUV2ZW50U2VydmljZS5yZWdpc3Rlcih7XG4gICAgICBhY3Rpb246IFVzZXJBY3Rpb25zLlVQREFURV9VU0VSX0FERFJFU1MsXG4gICAgICBldmVudDogVXBkYXRlVXNlckFkZHJlc3NFdmVudCxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZGRVc2VyQWRkcmVzc0V2ZW50KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBVc2VyQWN0aW9ucy5BRERfVVNFUl9BRERSRVNTLFxuICAgICAgZXZlbnQ6IEFkZFVzZXJBZGRyZXNzRXZlbnQsXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZGVsZXRlVXNlckFkZHJlc3NFdmVudCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlRXZlbnRTZXJ2aWNlLnJlZ2lzdGVyKHtcbiAgICAgIGFjdGlvbjogVXNlckFjdGlvbnMuREVMRVRFX1VTRVJfQUREUkVTUyxcbiAgICAgIGV2ZW50OiBEZWxldGVVc2VyQWRkcmVzc0V2ZW50LFxuICAgIH0pO1xuICB9XG59XG4iXX0=