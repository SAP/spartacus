import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/organization/administration/core';
import { B2BUserService, OrgUnitService } from '@spartacus/organization/administration/core';
import * as i3 from '@spartacus/core';
import { GlobalMessageType, provideDefaultConfig } from '@spartacus/core';
import { UserListService, CreateButtonType, userCmsConfig, unitsCmsConfig } from '@spartacus/organization/administration/components';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i1 from '@spartacus/storefront';
import * as i4 from '@spartacus/cdc/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcB2BUserService extends B2BUserService {
    isUpdatingUserAllowed() {
        return false;
    }
}
CdcB2BUserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcB2BUserService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
CdcB2BUserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcB2BUserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcB2BUserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcUserListService extends UserListService {
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
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcOrgUnitService extends OrgUnitService {
    isUpdatingUnitAllowed() {
        return false;
    }
}
CdcOrgUnitService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcOrgUnitService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
CdcOrgUnitService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcOrgUnitService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcOrgUnitService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

var _a, _b, _c, _d, _e, _f, _g, _h;
class CdcAdministrationModule {
}
CdcAdministrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcAdministrationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcAdministrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdcAdministrationModule });
CdcAdministrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcAdministrationModule, providers: [
        //to override UserListService in ListComponent
        provideDefaultConfig({
            cmsComponents: {
                ManageUsersListComponent: {
                    providers: [
                        {
                            provide: UserListService,
                            useExisting: CdcUserListService,
                        },
                        ((_b = (_a = userCmsConfig.cmsComponents) === null || _a === void 0 ? void 0 : _a.ManageUsersListComponent) === null || _b === void 0 ? void 0 : _b.providers) ||
                            [],
                    ],
                },
            },
        }),
        //to override B2BUserService in UserDetailsComponent, UnitUserListComponent
        { provide: B2BUserService, useClass: CdcB2BUserService },
        //to override B2BUserService in UnitUserRolesCellComponent
        provideDefaultConfig({
            cmsComponents: {
                ManageUnitsListComponent: {
                    providers: [
                        {
                            provide: B2BUserService,
                            useExisting: CdcB2BUserService,
                        },
                        ((_d = (_c = unitsCmsConfig.cmsComponents) === null || _c === void 0 ? void 0 : _c.ManageUnitsListComponent) === null || _d === void 0 ? void 0 : _d.providers) ||
                            [],
                    ],
                },
            },
        }),
        { provide: OrgUnitService, useClass: CdcOrgUnitService },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcAdministrationModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        //to override UserListService in ListComponent
                        provideDefaultConfig({
                            cmsComponents: {
                                ManageUsersListComponent: {
                                    providers: [
                                        {
                                            provide: UserListService,
                                            useExisting: CdcUserListService,
                                        },
                                        ((_f = (_e = userCmsConfig.cmsComponents) === null || _e === void 0 ? void 0 : _e.ManageUsersListComponent) === null || _f === void 0 ? void 0 : _f.providers) ||
                                            [],
                                    ],
                                },
                            },
                        }),
                        //to override B2BUserService in UserDetailsComponent, UnitUserListComponent
                        { provide: B2BUserService, useClass: CdcB2BUserService },
                        //to override B2BUserService in UnitUserRolesCellComponent
                        provideDefaultConfig({
                            cmsComponents: {
                                ManageUnitsListComponent: {
                                    providers: [
                                        {
                                            provide: B2BUserService,
                                            useExisting: CdcB2BUserService,
                                        },
                                        ((_h = (_g = unitsCmsConfig.cmsComponents) === null || _g === void 0 ? void 0 : _g.ManageUnitsListComponent) === null || _h === void 0 ? void 0 : _h.providers) ||
                                            [],
                                    ],
                                },
                            },
                        }),
                        { provide: OrgUnitService, useClass: CdcOrgUnitService },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CdcAdministrationModule, CdcB2BUserService, CdcOrgUnitService, CdcUserListService };
//# sourceMappingURL=spartacus-cdc-organization-administration.mjs.map
