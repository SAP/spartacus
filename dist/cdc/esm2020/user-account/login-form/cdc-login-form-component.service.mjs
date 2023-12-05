/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import { AuthService, GlobalMessageService, GlobalMessageType, WindowRef, } from '@spartacus/core';
import { LoginFormComponentService } from '@spartacus/user/account/components';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/cdc/root";
export class CdcLoginFormComponentService extends LoginFormComponentService {
    constructor(auth, globalMessageService, winRef, cdcJsService) {
        super(auth, globalMessageService, winRef);
        this.auth = auth;
        this.globalMessageService = globalMessageService;
        this.winRef = winRef;
        this.cdcJsService = cdcJsService;
        this.subscription = new Subscription();
    }
    login() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        this.subscription.add(this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
            if (cdcLoaded) {
                // Logging in using CDC Gigya SDK
                this.cdcJsService
                    .loginUserWithoutScreenSet(this.form.value.userId.toLowerCase(), this.form.value.password)
                    .subscribe({
                    next: () => this.busy$.next(false),
                    error: () => this.busy$.next(false),
                });
            }
            else {
                // CDC Gigya SDK not loaded, show error to the user
                this.globalMessageService.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
                this.busy$.next(false);
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CdcLoginFormComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcLoginFormComponentService, deps: [{ token: i1.AuthService }, { token: i1.GlobalMessageService }, { token: i1.WindowRef }, { token: i2.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcLoginFormComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcLoginFormComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcLoginFormComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.GlobalMessageService }, { type: i1.WindowRef }, { type: i2.CdcJsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWxvZ2luLWZvcm0tY29tcG9uZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy91c2VyLWFjY291bnQvbG9naW4tZm9ybS9jZGMtbG9naW4tZm9ybS1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUNMLFdBQVcsRUFDWCxvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2pCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFHcEMsTUFBTSxPQUFPLDRCQUNYLFNBQVEseUJBQXlCO0lBR2pDLFlBQ1ksSUFBaUIsRUFDakIsb0JBQTBDLEVBQzFDLE1BQWlCLEVBQ2pCLFlBQTBCO1FBRXBDLEtBQUssQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFMaEMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFLNUIsaUJBQVksR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUYxRCxDQUFDO0lBSUQsS0FBSztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDbEQsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsaUNBQWlDO2dCQUNqQyxJQUFJLENBQUMsWUFBWTtxQkFDZCx5QkFBeUIsQ0FDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQ3pCO3FCQUNBLFNBQVMsQ0FBQztvQkFDVCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUNsQyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUNwQyxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDTCxtREFBbUQ7Z0JBQ25ELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCO29CQUNFLEdBQUcsRUFBRSxrQ0FBa0M7aUJBQ3hDLEVBQ0QsaUJBQWlCLENBQUMsY0FBYyxDQUNqQyxDQUFDO2dCQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzt5SEFuRFUsNEJBQTRCOzZIQUE1Qiw0QkFBNEI7MkZBQTVCLDRCQUE0QjtrQkFEeEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RjSnNTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jZGMvcm9vdCc7XG5pbXBvcnQge1xuICBBdXRoU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBXaW5kb3dSZWYsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBMb2dpbkZvcm1Db21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL2FjY291bnQvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENkY0xvZ2luRm9ybUNvbXBvbmVudFNlcnZpY2VcbiAgZXh0ZW5kcyBMb2dpbkZvcm1Db21wb25lbnRTZXJ2aWNlXG4gIGltcGxlbWVudHMgT25EZXN0cm95XG57XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhdXRoOiBBdXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQgY2RjSnNTZXJ2aWNlOiBDZGNKc1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoYXV0aCwgZ2xvYmFsTWVzc2FnZVNlcnZpY2UsIHdpblJlZik7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgbG9naW4oKSB7XG4gICAgaWYgKCF0aGlzLmZvcm0udmFsaWQpIHtcbiAgICAgIHRoaXMuZm9ybS5tYXJrQWxsQXNUb3VjaGVkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5idXN5JC5uZXh0KHRydWUpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuY2RjSnNTZXJ2aWNlLmRpZExvYWQoKS5zdWJzY3JpYmUoKGNkY0xvYWRlZCkgPT4ge1xuICAgICAgICBpZiAoY2RjTG9hZGVkKSB7XG4gICAgICAgICAgLy8gTG9nZ2luZyBpbiB1c2luZyBDREMgR2lneWEgU0RLXG4gICAgICAgICAgdGhpcy5jZGNKc1NlcnZpY2VcbiAgICAgICAgICAgIC5sb2dpblVzZXJXaXRob3V0U2NyZWVuU2V0KFxuICAgICAgICAgICAgICB0aGlzLmZvcm0udmFsdWUudXNlcklkLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgIHRoaXMuZm9ybS52YWx1ZS5wYXNzd29yZFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgIG5leHQ6ICgpID0+IHRoaXMuYnVzeSQubmV4dChmYWxzZSksXG4gICAgICAgICAgICAgIGVycm9yOiAoKSA9PiB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ0RDIEdpZ3lhIFNESyBub3QgbG9hZGVkLCBzaG93IGVycm9yIHRvIHRoZSB1c2VyXG4gICAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGtleTogJ2Vycm9ySGFuZGxlcnMuc2NyaXB0RmFpbGVkVG9Mb2FkJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5idXN5JC5uZXh0KGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19