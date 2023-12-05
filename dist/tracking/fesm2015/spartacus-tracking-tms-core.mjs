import * as i0 from '@angular/core';
import { Injectable, inject, isDevMode, APP_INITIALIZER, NgModule } from '@angular/core';
import * as i1 from '@spartacus/core';
import { Config, LoggerService } from '@spartacus/core';
import { Subscription, merge } from 'rxjs';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * TMS configuration
 */
class TmsConfig {
}
TmsConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TmsConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TmsConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TmsConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TmsConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * This service interacts with the configured data layer object by pushing the Spartacus events to it.
 */
class TmsService {
    constructor(eventsService, windowRef, tmsConfig, injector) {
        this.eventsService = eventsService;
        this.windowRef = windowRef;
        this.tmsConfig = tmsConfig;
        this.injector = injector;
        /**
         * Stores subscriptions to events.
         */
        this.subscription = new Subscription();
        this.logger = inject(LoggerService);
    }
    /**
     * Called only once to start collecting and dispatching events
     */
    collect() {
        var _a, _b, _c;
        if (!this.windowRef.isBrowser()) {
            return;
        }
        for (const tmsCollectorConfig in this.tmsConfig.tagManager) {
            if (!((_a = this.tmsConfig.tagManager) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(tmsCollectorConfig))) {
                continue;
            }
            const collectorConfig = (_b = this.tmsConfig.tagManager[tmsCollectorConfig]) !== null && _b !== void 0 ? _b : {};
            if (!collectorConfig.collector) {
                if (isDevMode()) {
                    this.logger.warn(`Skipping the '${tmsCollectorConfig}', as the collector is not defined.`);
                }
                continue;
            }
            const events = ((_c = collectorConfig.events) === null || _c === void 0 ? void 0 : _c.map((event) => this.eventsService.get(event))) ||
                [];
            const collector = this.injector.get(collectorConfig.collector);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            collector.init(collectorConfig, this.windowRef.nativeWindow);
            this.subscription.add(this.mapEvents(events).subscribe((event) => {
                var _a, _b;
                if (collectorConfig.debug) {
                    this.logger.log(`🎤 Pushing the following event to ${tmsCollectorConfig}: `, event);
                }
                event = (_b = (_a = collector.map) === null || _a === void 0 ? void 0 : _a.call(collector, event)) !== null && _b !== void 0 ? _b : event;
                collector.pushEvent(collectorConfig, 
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.windowRef.nativeWindow, event);
            }));
        }
    }
    /**
     * Maps the given events to an appropriate type that fits the specified TMS' structure.
     *
     * @param events - the events to map
     * @param collector - a name of the collector for which the events should be mapped
     */
    mapEvents(events) {
        return merge(...events);
    }
    /**
     * Angular's callback
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
TmsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TmsService, deps: [{ token: i1.EventService }, { token: i1.WindowRef }, { token: TmsConfig }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
TmsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TmsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TmsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i1.WindowRef }, { type: TmsConfig }, { type: i0.Injector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The factory that conditionally (based on the configuration) starts collecting events
 */
function tmsFactory(service) {
    const result = () => service.collect();
    return result;
}
class BaseTmsModule {
    static forRoot() {
        return {
            ngModule: BaseTmsModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    useFactory: tmsFactory,
                    deps: [TmsService],
                    multi: true,
                },
            ],
        };
    }
}
BaseTmsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseTmsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BaseTmsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BaseTmsModule });
BaseTmsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseTmsModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseTmsModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** AUGMENTABLE_TYPES_END */

/**
 * Generated bundle index. Do not edit.
 */

export { BaseTmsModule, TmsConfig, TmsService, tmsFactory };
//# sourceMappingURL=spartacus-tracking-tms-core.mjs.map
