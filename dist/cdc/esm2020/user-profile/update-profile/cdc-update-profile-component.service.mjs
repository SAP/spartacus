/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { UpdateProfileComponentService } from '@spartacus/user/profile/components';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cdc/root";
export class CDCUpdateProfileComponentService extends UpdateProfileComponentService {
    constructor(userProfile, globalMessageService, cdcJsService) {
        super(userProfile, globalMessageService);
        this.userProfile = userProfile;
        this.globalMessageService = globalMessageService;
        this.cdcJsService = cdcJsService;
    }
    /**
     * Updates the user's details and handles the UI.
     */
    updateProfile() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const formValue = this.form.value;
        this.cdcJsService.updateProfileWithoutScreenSet(formValue).subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onError(_error) {
        const errorMessage = _error?.errorMessage || ' ';
        this.globalMessageService.add(errorMessage, GlobalMessageType.MSG_TYPE_ERROR);
        this.busy$.next(false);
    }
}
CDCUpdateProfileComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileComponentService, deps: [{ token: i1.UserProfileFacade }, { token: i2.GlobalMessageService }, { token: i3.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCUpdateProfileComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserProfileFacade }, { type: i2.GlobalMessageService }, { type: i3.CdcJsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVwZGF0ZS1wcm9maWxlLWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvdXNlci1wcm9maWxlL3VwZGF0ZS1wcm9maWxlL2NkYy11cGRhdGUtcHJvZmlsZS1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7O0FBR2pFLE1BQU0sT0FBTyxnQ0FBaUMsU0FBUSw2QkFBNkI7SUFDakYsWUFDWSxXQUE4QixFQUM5QixvQkFBMEMsRUFDMUMsWUFBMEI7UUFFcEMsS0FBSyxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBSi9CLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUM5Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBR3RDLENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWE7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzdCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsNkJBQTZCLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ25FLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzVCLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDdEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLE9BQU8sQ0FBQyxNQUFXO1FBQzNCLE1BQU0sWUFBWSxHQUFHLE1BQU0sRUFBRSxZQUFZLElBQUksR0FBRyxDQUFDO1FBQ2pELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLFlBQVksRUFDWixpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDOzs2SEFsQ1UsZ0NBQWdDO2lJQUFoQyxnQ0FBZ0M7MkZBQWhDLGdDQUFnQztrQkFENUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENkY0pzU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY2RjL3Jvb3QnO1xuaW1wb3J0IHsgR2xvYmFsTWVzc2FnZVNlcnZpY2UsIEdsb2JhbE1lc3NhZ2VUeXBlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVwZGF0ZVByb2ZpbGVDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBVc2VyUHJvZmlsZUZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ0RDVXBkYXRlUHJvZmlsZUNvbXBvbmVudFNlcnZpY2UgZXh0ZW5kcyBVcGRhdGVQcm9maWxlQ29tcG9uZW50U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB1c2VyUHJvZmlsZTogVXNlclByb2ZpbGVGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2RjSnNTZXJ2aWNlOiBDZGNKc1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIodXNlclByb2ZpbGUsIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB1c2VyJ3MgZGV0YWlscyBhbmQgaGFuZGxlcyB0aGUgVUkuXG4gICAqL1xuICB1cGRhdGVQcm9maWxlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5mb3JtLnZhbGlkKSB7XG4gICAgICB0aGlzLmZvcm0ubWFya0FsbEFzVG91Y2hlZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYnVzeSQubmV4dCh0cnVlKTtcblxuICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuZm9ybS52YWx1ZTtcbiAgICB0aGlzLmNkY0pzU2VydmljZS51cGRhdGVQcm9maWxlV2l0aG91dFNjcmVlblNldChmb3JtVmFsdWUpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAoKSA9PiB0aGlzLm9uU3VjY2VzcygpLFxuICAgICAgZXJyb3I6IChlcnJvcikgPT4gdGhpcy5vbkVycm9yKGVycm9yKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkVycm9yKF9lcnJvcjogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gX2Vycm9yPy5lcnJvck1lc3NhZ2UgfHwgJyAnO1xuICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICApO1xuICAgIHRoaXMuYnVzeSQubmV4dChmYWxzZSk7XG4gIH1cbn1cbiJdfQ==