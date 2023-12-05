/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { LoadStatus, } from '@spartacus/organization/administration/core';
import { filter, first, switchMap, take } from 'rxjs/operators';
import { ListService } from '../../shared/list/list.service';
import { UserGroupUserListService } from './user-group-user-list.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/current-user-group.service";
import * as i2 from "./user-group-user-list.service";
import * as i3 from "@angular/router";
import * as i4 from "../../shared/sub-list/sub-list.component";
import * as i5 from "@spartacus/core";
export class UserGroupUserListComponent {
    constructor(currentUserGroupService, userGroupUserListService) {
        this.currentUserGroupService = currentUserGroupService;
        this.userGroupUserListService = userGroupUserListService;
    }
    unassignAll() {
        this.currentUserGroupService.key$
            .pipe(first(), switchMap((key) => this.userGroupUserListService.unassignAllMembers(key).pipe(take(1), filter((data) => data.status === LoadStatus.SUCCESS))))
            .subscribe((data) => {
            this.notify(data.item);
        });
    }
    notify(item) {
        this.subList.messageService.add({
            message: {
                key: `orgUserGroupUsers.unassignAllConfirmation`,
                params: {
                    item,
                },
            },
        });
    }
}
UserGroupUserListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserListComponent, deps: [{ token: i1.CurrentUserGroupService }, { token: i2.UserGroupUserListService }], target: i0.ɵɵFactoryTarget.Component });
UserGroupUserListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserGroupUserListComponent, selector: "cx-org-user-group-user-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserGroupUserListService,
        },
    ], viewQueries: [{ propertyName: "subList", first: true, predicate: ["subList"], descendants: true }], ngImport: i0, template: "<cx-org-sub-list [previous]=\"false\" #subList>\n  <button actions (click)=\"unassignAll()\" class=\"link\">\n    {{ 'orgUserGroupUsers.unassignAll' | cxTranslate }}\n  </button>\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i4.SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i5.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-group-user-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserGroupUserListService,
                        },
                    ], template: "<cx-org-sub-list [previous]=\"false\" #subList>\n  <button actions (click)=\"unassignAll()\" class=\"link\">\n    {{ 'orgUserGroupUsers.unassignAll' | cxTranslate }}\n  </button>\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUserGroupService }, { type: i2.UserGroupUserListService }]; }, propDecorators: { subList: [{
                type: ViewChild,
                args: ['subList']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC11c2VyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXItZ3JvdXAvdXNlcnMvdXNlci1ncm91cC11c2VyLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXItZ3JvdXAvdXNlcnMvdXNlci1ncm91cC11c2VyLWxpc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFDTCxVQUFVLEdBRVgsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRzdELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7O0FBYzFFLE1BQU0sT0FBTywwQkFBMEI7SUFDckMsWUFDWSx1QkFBZ0QsRUFDaEQsd0JBQWtEO1FBRGxELDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDaEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtJQUMzRCxDQUFDO0lBS0osV0FBVztRQUNULElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJO2FBQzlCLElBQUksQ0FDSCxLQUFLLEVBQUUsRUFDUCxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNoQixJQUFJLENBQUMsd0JBQXdCLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUN4RCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FDckQsQ0FDRixDQUNGO2FBQ0EsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsTUFBTSxDQUFDLElBQTJCO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztZQUM5QixPQUFPLEVBQUU7Z0JBQ1AsR0FBRyxFQUFFLDJDQUEyQztnQkFDaEQsTUFBTSxFQUFFO29CQUNOLElBQUk7aUJBQ0w7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7O3VIQWxDVSwwQkFBMEI7MkdBQTFCLDBCQUEwQixtR0FQMUI7UUFDVDtZQUNFLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLFdBQVcsRUFBRSx3QkFBd0I7U0FDdEM7S0FDRiw4SEMzQkgsZ1RBUUE7MkZEcUJhLDBCQUEwQjtrQkFadEMsU0FBUzsrQkFDRSw2QkFBNkIsbUJBRXRCLHVCQUF1QixDQUFDLE1BQU0sUUFDekMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsYUFDdkI7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLFdBQVcsRUFBRSx3QkFBd0I7eUJBQ3RDO3FCQUNGO3FKQVNELE9BQU87c0JBRE4sU0FBUzt1QkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBMb2FkU3RhdHVzLFxuICBVc2VyR3JvdXAsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyLCBmaXJzdCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvbGlzdC9saXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViTGlzdENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdWItbGlzdC9zdWItbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJHcm91cFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jdXJyZW50LXVzZXItZ3JvdXAuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyR3JvdXBVc2VyTGlzdFNlcnZpY2UgfSBmcm9tICcuL3VzZXItZ3JvdXAtdXNlci1saXN0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctdXNlci1ncm91cC11c2VyLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vdXNlci1ncm91cC11c2VyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDogeyBjbGFzczogJ2NvbnRlbnQtd3JhcHBlcicgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTGlzdFNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogVXNlckdyb3VwVXNlckxpc3RTZXJ2aWNlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJHcm91cFVzZXJMaXN0Q29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRVc2VyR3JvdXBTZXJ2aWNlOiBDdXJyZW50VXNlckdyb3VwU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlckdyb3VwVXNlckxpc3RTZXJ2aWNlOiBVc2VyR3JvdXBVc2VyTGlzdFNlcnZpY2VcbiAgKSB7fVxuXG4gIEBWaWV3Q2hpbGQoJ3N1Ykxpc3QnKVxuICBzdWJMaXN0OiBTdWJMaXN0Q29tcG9uZW50O1xuXG4gIHVuYXNzaWduQWxsKCkge1xuICAgIHRoaXMuY3VycmVudFVzZXJHcm91cFNlcnZpY2Uua2V5JFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpcnN0KCksXG4gICAgICAgIHN3aXRjaE1hcCgoa2V5KSA9PlxuICAgICAgICAgIHRoaXMudXNlckdyb3VwVXNlckxpc3RTZXJ2aWNlLnVuYXNzaWduQWxsTWVtYmVycyhrZXkpLnBpcGUoXG4gICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgZmlsdGVyKChkYXRhKSA9PiBkYXRhLnN0YXR1cyA9PT0gTG9hZFN0YXR1cy5TVUNDRVNTKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmeShkYXRhLml0ZW0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbm90aWZ5KGl0ZW06IFVzZXJHcm91cCB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuc3ViTGlzdC5tZXNzYWdlU2VydmljZS5hZGQoe1xuICAgICAgbWVzc2FnZToge1xuICAgICAgICBrZXk6IGBvcmdVc2VyR3JvdXBVc2Vycy51bmFzc2lnbkFsbENvbmZpcm1hdGlvbmAsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGl0ZW0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iLCI8Y3gtb3JnLXN1Yi1saXN0IFtwcmV2aW91c109XCJmYWxzZVwiICNzdWJMaXN0PlxuICA8YnV0dG9uIGFjdGlvbnMgKGNsaWNrKT1cInVuYXNzaWduQWxsKClcIiBjbGFzcz1cImxpbmtcIj5cbiAgICB7eyAnb3JnVXNlckdyb3VwVXNlcnMudW5hc3NpZ25BbGwnIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9idXR0b24+XG4gIDxhIGFjdGlvbnMgY2xhc3M9XCJsaW5rXCIgcm91dGVyTGluaz1cIi4uL1wiPlxuICAgIHt7ICdvcmdhbml6YXRpb24uZG9uZScgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L2E+XG48L2N4LW9yZy1zdWItbGlzdD5cbiJdfQ==