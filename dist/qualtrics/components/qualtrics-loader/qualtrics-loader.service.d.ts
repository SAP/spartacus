import { OnDestroy } from '@angular/core';
import { LoggerService, ScriptLoader, WindowRef } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare const QUALTRICS_EVENT_NAME = "qsi_js_loaded";
interface QualtricsWindow extends Window {
    QSI?: any;
}
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
export declare class QualtricsLoaderService implements OnDestroy {
    protected winRef: WindowRef;
    protected platformId: any;
    protected scriptLoader: ScriptLoader;
    protected subscription: Subscription;
    protected logger: LoggerService;
    /**
     * Reference to the QSI API.
     */
    protected qsiApi: any;
    /**
     * QSI load event that happens when the QSI JS file is loaded.
     */
    private qsiLoaded$;
    /**
     * Emits the Qualtrics Site Intercept (QSI) JavaScript API whenever available.
     *
     * The API is emitted when the JavaScript resource holding this API is fully loaded.
     * The API is also stored locally in the service, in case it's required later on.
     */
    protected qsi$: Observable<any>;
    get window(): QualtricsWindow | undefined;
    constructor(winRef: WindowRef, platformId: any, scriptLoader: ScriptLoader);
    /**
     * Adds the deployment script to the DOM.
     *
     * The script will not be added twice if it was loaded before. In that case, we use
     * the Qualtrics API directly to _unload_ and _run_ the project.
     */
    addScript(scriptSource: string): void;
    /**
     * Indicates if the script is already added to the DOM.
     */
    hasScript(source?: string): boolean;
    /**
     * Starts observing the Qualtrics integration. The integration is based on a
     * Qualtrics specific event (`qsi_js_loaded`). As soon as this events happens,
     * we run the API.
     */
    protected initialize(): void;
    /**
     * Evaluates the Qualtrics project code for the application.
     *
     * In order to reload the evaluation in Qualtrics, the API requires to unload the API before
     * running it again. We don't do this by default, but offer a flag to conditionally unload the API.
     */
    protected run(reload?: boolean): void;
    /**
     * This logic exist in order to let the client(s) add their own logic to wait for any kind of page data.
     * You can observe any data in this method.
     *
     * Defaults to true.
     */
    protected isDataLoaded(): Observable<boolean>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QualtricsLoaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QualtricsLoaderService>;
}
export {};
