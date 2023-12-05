/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import { GlobalMessageService, GlobalMessageType, WindowRef, } from '@spartacus/core';
import { CreateButtonType, UserListService, } from '@spartacus/organization/administration/components';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/organization/administration/core";
import * as i3 from "@spartacus/core";
import * as i4 from "@spartacus/cdc/root";
export class CdcUserListService extends UserListService {
    constructor(tableService, userService, globalMessageService, winRef, cdcJsService) {
        super(tableService, userService);
        this.tableService = tableService;
        this.userService = userService;
        this.globalMessageService = globalMessageService;
        this.winRef = winRef;
        this.cdcJsService = cdcJsService;
        this.subscription = new Subscription();
    }
    onCreateButtonClick() {
        // get current organization ID using CDC Gigya SDK
        const sub = this.cdcJsService
            .getOrganizationContext()
            .pipe(tap({
            next: (response) => {
                if (response.orgId) {
                    // open new screen to create/edit users using CDC Gigya SDK
                    this.cdcJsService.openDelegatedAdminLogin(response.orgId);
                }
                else {
                    this.globalMessageService.add({
                        key: 'generalErrors.pageFailure',
                    }, GlobalMessageType.MSG_TYPE_ERROR);
                }
            },
            error: () => this.globalMessageService.add({
                key: 'generalErrors.pageFailure',
            }, GlobalMessageType.MSG_TYPE_ERROR),
        }))
            .subscribe();
        this.subscription.add(sub);
    }
    getCreateButtonType() {
        return CreateButtonType.BUTTON;
    }
    getCreateButtonLabel() {
        return { key: 'organization.manageUsers' };
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
CdcUserListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserListService, deps: [{ token: i1.TableService }, { token: i2.B2BUserService }, { token: i3.GlobalMessageService }, { token: i3.WindowRef }, { token: i4.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcUserListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.B2BUserService }, { type: i3.GlobalMessageService }, { type: i3.WindowRef }, { type: i4.CdcJsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVzZXItbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NkYy11c2VyLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixpQkFBaUIsRUFFakIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixlQUFlLEdBQ2hCLE1BQU0sbURBQW1ELENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBS3JDLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxlQUFlO0lBQ3JELFlBQ1ksWUFBMEIsRUFDMUIsV0FBMkIsRUFDM0Isb0JBQTBDLEVBQzFDLE1BQWlCLEVBQ2pCLFlBQTBCO1FBRXBDLEtBQUssQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFOdkIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUk1QixpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRDFELENBQUM7SUFHRCxtQkFBbUI7UUFDakIsa0RBQWtEO1FBQ2xELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZO2FBQzFCLHNCQUFzQixFQUFFO2FBQ3hCLElBQUksQ0FDSCxHQUFHLENBQUM7WUFDRixJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO29CQUNsQiwyREFBMkQ7b0JBQzNELElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMzRDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQjt3QkFDRSxHQUFHLEVBQUUsMkJBQTJCO3FCQUNqQyxFQUNELGlCQUFpQixDQUFDLGNBQWMsQ0FDakMsQ0FBQztpQkFDSDtZQUNILENBQUM7WUFDRCxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQ1YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0I7Z0JBQ0UsR0FBRyxFQUFFLDJCQUEyQjthQUNqQyxFQUNELGlCQUFpQixDQUFDLGNBQWMsQ0FDakM7U0FDSixDQUFDLENBQ0g7YUFDQSxTQUFTLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxtQkFBbUI7UUFDakIsT0FBTyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7SUFDakMsQ0FBQztJQUNELG9CQUFvQjtRQUNsQixPQUFPLEVBQUUsR0FBRyxFQUFFLDBCQUEwQixFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7OytHQW5EVSxrQkFBa0I7bUhBQWxCLGtCQUFrQixjQUZqQixNQUFNOzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENkY0pzU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY2RjL3Jvb3QnO1xuaW1wb3J0IHtcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBUcmFuc2xhdGFibGUsXG4gIFdpbmRvd1JlZixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIENyZWF0ZUJ1dHRvblR5cGUsXG4gIFVzZXJMaXN0U2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBCMkJVc2VyU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgVGFibGVTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2RjVXNlckxpc3RTZXJ2aWNlIGV4dGVuZHMgVXNlckxpc3RTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VyU2VydmljZTogQjJCVXNlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWYsXG4gICAgcHJvdGVjdGVkIGNkY0pzU2VydmljZTogQ2RjSnNTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHRhYmxlU2VydmljZSwgdXNlclNlcnZpY2UpO1xuICB9XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBvbkNyZWF0ZUJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgIC8vIGdldCBjdXJyZW50IG9yZ2FuaXphdGlvbiBJRCB1c2luZyBDREMgR2lneWEgU0RLXG4gICAgY29uc3Qgc3ViID0gdGhpcy5jZGNKc1NlcnZpY2VcbiAgICAgIC5nZXRPcmdhbml6YXRpb25Db250ZXh0KClcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoe1xuICAgICAgICAgIG5leHQ6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9yZ0lkKSB7XG4gICAgICAgICAgICAgIC8vIG9wZW4gbmV3IHNjcmVlbiB0byBjcmVhdGUvZWRpdCB1c2VycyB1c2luZyBDREMgR2lneWEgU0RLXG4gICAgICAgICAgICAgIHRoaXMuY2RjSnNTZXJ2aWNlLm9wZW5EZWxlZ2F0ZWRBZG1pbkxvZ2luKHJlc3BvbnNlLm9yZ0lkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGtleTogJ2dlbmVyYWxFcnJvcnMucGFnZUZhaWx1cmUnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiAoKSA9PlxuICAgICAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdnZW5lcmFsRXJyb3JzLnBhZ2VGYWlsdXJlJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgICAgICksXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHN1Yik7XG4gIH1cbiAgZ2V0Q3JlYXRlQnV0dG9uVHlwZSgpOiBDcmVhdGVCdXR0b25UeXBlIHtcbiAgICByZXR1cm4gQ3JlYXRlQnV0dG9uVHlwZS5CVVRUT047XG4gIH1cbiAgZ2V0Q3JlYXRlQnV0dG9uTGFiZWwoKTogVHJhbnNsYXRhYmxlIHtcbiAgICByZXR1cm4geyBrZXk6ICdvcmdhbml6YXRpb24ubWFuYWdlVXNlcnMnIH07XG4gIH1cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==