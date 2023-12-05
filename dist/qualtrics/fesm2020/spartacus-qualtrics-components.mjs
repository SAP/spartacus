import { isPlatformBrowser, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, inject, isDevMode, PLATFORM_ID, Injectable, Inject, NgModule } from '@angular/core';
import * as i1 from '@spartacus/core';
import { LoggerService, Config, provideDefaultConfig } from '@spartacus/core';
import { Subscription, fromEvent, EMPTY, of } from 'rxjs';
import { switchMap, map, filter, tap } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class QualtricsEmbeddedFeedbackComponent {
}
QualtricsEmbeddedFeedbackComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsEmbeddedFeedbackComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
QualtricsEmbeddedFeedbackComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: QualtricsEmbeddedFeedbackComponent, selector: "cx-qualtrics-embedded-feedback", ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsEmbeddedFeedbackComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-qualtrics-embedded-feedback',
                    template: '',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultQualtricsConfig = {
    qualtrics: {},
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const QUALTRICS_EVENT_NAME = 'qsi_js_loaded';
/**
 * Service to integration Qualtrics.
 *
 * The integration observes the Qualtrics API, and when available, it runs the QSI API
 * to let Qualtrics evaluate the application.
 *
 * The service supports an additional _hook_ (`isDataLoaded()`) that can be used to load application
 * data before pulling the QSI API. This is beneficial in a single page application when additional
 * data is required before the Qualtrics _creatives_ run.
 *
 * This service also supports the creation of the Qualtrics deployment script. This is optional, as
 * the script can be added in alternatives ways.
 */
class QualtricsLoaderService {
    get window() {
        return this.winRef.nativeWindow;
    }
    constructor(winRef, platformId, scriptLoader) {
        this.winRef = winRef;
        this.platformId = platformId;
        this.scriptLoader = scriptLoader;
        this.subscription = new Subscription();
        this.logger = inject(LoggerService);
        /**
         * QSI load event that happens when the QSI JS file is loaded.
         */
        this.qsiLoaded$ = isPlatformBrowser(this.platformId) && this.window
            ? fromEvent(this.window, QUALTRICS_EVENT_NAME)
            : EMPTY;
        /**
         * Emits the Qualtrics Site Intercept (QSI) JavaScript API whenever available.
         *
         * The API is emitted when the JavaScript resource holding this API is fully loaded.
         * The API is also stored locally in the service, in case it's required later on.
         */
        this.qsi$ = this.qsiLoaded$.pipe(switchMap(() => this.isDataLoaded()), map((dataLoaded) => (dataLoaded ? this.window?.QSI : EMPTY)), filter((qsi) => Boolean(qsi)), tap((qsi) => (this.qsiApi = qsi)));
        this.initialize();
    }
    /**
     * Adds the deployment script to the DOM.
     *
     * The script will not be added twice if it was loaded before. In that case, we use
     * the Qualtrics API directly to _unload_ and _run_ the project.
     */
    addScript(scriptSource) {
        if (this.hasScript(scriptSource)) {
            this.run(true);
        }
        else {
            this.scriptLoader.embedScript({
                src: scriptSource,
            });
        }
    }
    /**
     * Indicates if the script is already added to the DOM.
     */
    hasScript(source) {
        return !!this.winRef.document.querySelector(`script[src="${source}"]`);
    }
    /**
     * Starts observing the Qualtrics integration. The integration is based on a
     * Qualtrics specific event (`qsi_js_loaded`). As soon as this events happens,
     * we run the API.
     */
    initialize() {
        this.subscription.add(this.qsi$.subscribe(() => this.run()));
    }
    /**
     * Evaluates the Qualtrics project code for the application.
     *
     * In order to reload the evaluation in Qualtrics, the API requires to unload the API before
     * running it again. We don't do this by default, but offer a flag to conditionally unload the API.
     */
    run(reload = false) {
        if (!this.qsiApi?.API) {
            if (isDevMode()) {
                this.logger.log('The QSI api is not available');
            }
            return;
        }
        if (reload) {
            // Removes any currently displaying creatives
            this.qsiApi.API.unload();
        }
        // Starts the intercept code evaluation right after loading the Site Intercept
        // code for any defined intercepts or creatives
        this.qsiApi.API.load().done(this.qsiApi.API.run());
    }
    /**
     * This logic exist in order to let the client(s) add their own logic to wait for any kind of page data.
     * You can observe any data in this method.
     *
     * Defaults to true.
     */
    isDataLoaded() {
        return of(true);
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
QualtricsLoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsLoaderService, deps: [{ token: i1.WindowRef }, { token: PLATFORM_ID }, { token: i1.ScriptLoader }], target: i0.ɵɵFactoryTarget.Injectable });
QualtricsLoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsLoaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i1.ScriptLoader }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Configuration options for the Qualtrics integration, which allows you to
 * specify the qualtrics project and deployment script.
 */
class QualtricsConfig {
}
QualtricsConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
QualtricsConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsConfig, decorators: [{
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
 * Adds the Qualtrics deployment script whenever the component is loaded. The
 * deployment script is loaded from the global configuration (`qualtrics.scriptSource`).
 */
class QualtricsComponent {
    constructor(qualtricsLoader, config) {
        this.qualtricsLoader = qualtricsLoader;
        this.config = config;
        this.logger = inject(LoggerService);
        if (this.config.qualtrics?.scriptSource) {
            this.qualtricsLoader.addScript(this.config.qualtrics.scriptSource);
        }
        else if (isDevMode()) {
            this.logger.warn(`We're unable to add the Qualtrics deployment code as there is no script source defined in config.qualtrics.scriptSource.`);
        }
    }
}
QualtricsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsComponent, deps: [{ token: QualtricsLoaderService }, { token: QualtricsConfig }], target: i0.ɵɵFactoryTarget.Component });
QualtricsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: QualtricsComponent, selector: "cx-qualtrics", ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-qualtrics',
                    template: '',
                }]
        }], ctorParameters: function () { return [{ type: QualtricsLoaderService }, { type: QualtricsConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class QualtricsComponentsModule {
}
QualtricsComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QualtricsComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QualtricsComponentsModule, declarations: [QualtricsComponent, QualtricsEmbeddedFeedbackComponent], imports: [CommonModule], exports: [QualtricsComponent, QualtricsEmbeddedFeedbackComponent] });
QualtricsComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsComponentsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                QualtricsEmbeddedFeedbackComponent: {
                    component: QualtricsEmbeddedFeedbackComponent,
                },
                QualtricsComponent: {
                    component: QualtricsComponent,
                },
            },
        }),
        provideDefaultConfig(defaultQualtricsConfig),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                QualtricsEmbeddedFeedbackComponent: {
                                    component: QualtricsEmbeddedFeedbackComponent,
                                },
                                QualtricsComponent: {
                                    component: QualtricsComponent,
                                },
                            },
                        }),
                        provideDefaultConfig(defaultQualtricsConfig),
                    ],
                    declarations: [QualtricsComponent, QualtricsEmbeddedFeedbackComponent],
                    exports: [QualtricsComponent, QualtricsEmbeddedFeedbackComponent],
                }]
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

/**
 * Generated bundle index. Do not edit.
 */

export { QUALTRICS_EVENT_NAME, QualtricsComponent, QualtricsComponentsModule, QualtricsConfig, QualtricsEmbeddedFeedbackComponent, QualtricsLoaderService };
//# sourceMappingURL=spartacus-qualtrics-components.mjs.map
