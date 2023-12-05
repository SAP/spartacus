import * as i0 from '@angular/core';
import { NgModule, inject, isDevMode, Injectable } from '@angular/core';
import * as i2 from '@spartacus/core';
import { LoggerService } from '@spartacus/core';
import { EMPTY } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as i1 from '@spartacus/tracking/personalization/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PersonalizationCoreModule {
}
PersonalizationCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PersonalizationCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationCoreModule });
PersonalizationCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationCoreModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationCoreModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PersonalizationContextService {
    constructor(config, cmsService) {
        this.config = config;
        this.cmsService = cmsService;
        this.logger = inject(LoggerService);
    }
    getPersonalizationContext() {
        var _a;
        if (!((_a = this.config.personalization) === null || _a === void 0 ? void 0 : _a.context)) {
            if (isDevMode()) {
                this.logger.warn(`There is no context configured in Personalization.`);
            }
            return EMPTY;
        }
        else {
            const context = this.config.personalization.context;
            return this.cmsService.getCurrentPage().pipe(filter(Boolean), map((page) => { var _a; return (_a = page.slots) === null || _a === void 0 ? void 0 : _a[context.slotPosition]; }), filter(Boolean), map((slot) => {
                var _a, _b, _c;
                const scriptComponent = (_a = slot.components) === null || _a === void 0 ? void 0 : _a.find((i) => i.uid === context.componentId);
                return this.buildPersonalizationContext((_c = (_b = scriptComponent === null || scriptComponent === void 0 ? void 0 : scriptComponent.properties) === null || _b === void 0 ? void 0 : _b.script) === null || _c === void 0 ? void 0 : _c.data);
            }));
        }
    }
    buildPersonalizationContext(data) {
        if (data) {
            const context = JSON.parse(atob(data));
            context.actions.forEach((action) => {
                Object.keys(action).forEach((key) => {
                    action[key] = atob(action[key]);
                });
            });
            for (let i = 0; i < context.segments.length; i++) {
                context.segments[i] = atob(context.segments[i]);
            }
            return context;
        }
    }
}
PersonalizationContextService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationContextService, deps: [{ token: i1.PersonalizationConfig }, { token: i2.CmsService }], target: i0.ɵɵFactoryTarget.Injectable });
PersonalizationContextService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationContextService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationContextService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.PersonalizationConfig }, { type: i2.CmsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { PersonalizationContextService, PersonalizationCoreModule };
//# sourceMappingURL=spartacus-tracking-personalization-core.mjs.map
