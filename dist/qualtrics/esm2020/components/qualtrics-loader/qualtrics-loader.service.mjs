/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, isDevMode, PLATFORM_ID, } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { EMPTY, fromEvent, of, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export const QUALTRICS_EVENT_NAME = 'qsi_js_loaded';
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
export class QualtricsLoaderService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVhbHRyaWNzLWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3F1YWx0cmljcy9jb21wb25lbnRzL3F1YWx0cmljcy1sb2FkZXIvcXVhbHRyaWNzLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsU0FBUyxFQUVULFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUEyQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFjLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFN0QsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDO0FBTXBEOzs7Ozs7Ozs7Ozs7R0FZRztBQUlILE1BQU0sT0FBTyxzQkFBc0I7SUErQmpDLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDbEMsQ0FBQztJQUVELFlBQ1ksTUFBaUIsRUFDSSxVQUFlLEVBQ3BDLFlBQTBCO1FBRjFCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDSSxlQUFVLEdBQVYsVUFBVSxDQUFLO1FBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBckM1QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEMsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQU96Qzs7V0FFRztRQUNLLGVBQVUsR0FD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Q29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBpbmplY3QsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgaXNEZXZNb2RlLFxuICBPbkRlc3Ryb3ksXG4gIFBMQVRGT1JNX0lELFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UsIFNjcmlwdExvYWRlciwgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEVNUFRZLCBmcm9tRXZlbnQsIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNvbnN0IFFVQUxUUklDU19FVkVOVF9OQU1FID0gJ3FzaV9qc19sb2FkZWQnO1xuXG5pbnRlcmZhY2UgUXVhbHRyaWNzV2luZG93IGV4dGVuZHMgV2luZG93IHtcbiAgUVNJPzogYW55O1xufVxuXG4vKipcbiAqIFNlcnZpY2UgdG8gaW50ZWdyYXRpb24gUXVhbHRyaWNzLlxuICpcbiAqIFRoZSBpbnRlZ3JhdGlvbiBvYnNlcnZlcyB0aGUgUXVhbHRyaWNzIEFQSSwgYW5kIHdoZW4gYXZhaWxhYmxlLCBpdCBydW5zIHRoZSBRU0kgQVBJXG4gKiB0byBsZXQgUXVhbHRyaWNzIGV2YWx1YXRlIHRoZSBhcHBsaWNhdGlvbi5cbiAqXG4gKiBUaGUgc2VydmljZSBzdXBwb3J0cyBhbiBhZGRpdGlvbmFsIF9ob29rXyAoYGlzRGF0YUxvYWRlZCgpYCkgdGhhdCBjYW4gYmUgdXNlZCB0byBsb2FkIGFwcGxpY2F0aW9uXG4gKiBkYXRhIGJlZm9yZSBwdWxsaW5nIHRoZSBRU0kgQVBJLiBUaGlzIGlzIGJlbmVmaWNpYWwgaW4gYSBzaW5nbGUgcGFnZSBhcHBsaWNhdGlvbiB3aGVuIGFkZGl0aW9uYWxcbiAqIGRhdGEgaXMgcmVxdWlyZWQgYmVmb3JlIHRoZSBRdWFsdHJpY3MgX2NyZWF0aXZlc18gcnVuLlxuICpcbiAqIFRoaXMgc2VydmljZSBhbHNvIHN1cHBvcnRzIHRoZSBjcmVhdGlvbiBvZiB0aGUgUXVhbHRyaWNzIGRlcGxveW1lbnQgc2NyaXB0LiBUaGlzIGlzIG9wdGlvbmFsLCBhc1xuICogdGhlIHNjcmlwdCBjYW4gYmUgYWRkZWQgaW4gYWx0ZXJuYXRpdmVzIHdheXMuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBRdWFsdHJpY3NMb2FkZXJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIFFTSSBBUEkuXG4gICAqL1xuICBwcm90ZWN0ZWQgcXNpQXBpOiBhbnk7XG5cbiAgLyoqXG4gICAqIFFTSSBsb2FkIGV2ZW50IHRoYXQgaGFwcGVucyB3aGVuIHRoZSBRU0kgSlMgZmlsZSBpcyBsb2FkZWQuXG4gICAqL1xuICBwcml2YXRlIHFzaUxvYWRlZCQ6IE9ic2VydmFibGU8YW55PiA9XG4gICAgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLndpbmRvd1xuICAgICAgPyBmcm9tRXZlbnQodGhpcy53aW5kb3csIFFVQUxUUklDU19FVkVOVF9OQU1FKVxuICAgICAgOiBFTVBUWTtcblxuICAvKipcbiAgICogRW1pdHMgdGhlIFF1YWx0cmljcyBTaXRlIEludGVyY2VwdCAoUVNJKSBKYXZhU2NyaXB0IEFQSSB3aGVuZXZlciBhdmFpbGFibGUuXG4gICAqXG4gICAqIFRoZSBBUEkgaXMgZW1pdHRlZCB3aGVuIHRoZSBKYXZhU2NyaXB0IHJlc291cmNlIGhvbGRpbmcgdGhpcyBBUEkgaXMgZnVsbHkgbG9hZGVkLlxuICAgKiBUaGUgQVBJIGlzIGFsc28gc3RvcmVkIGxvY2FsbHkgaW4gdGhlIHNlcnZpY2UsIGluIGNhc2UgaXQncyByZXF1aXJlZCBsYXRlciBvbi5cbiAgICovXG4gIHByb3RlY3RlZCBxc2kkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnFzaUxvYWRlZCQucGlwZShcbiAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5pc0RhdGFMb2FkZWQoKSksXG4gICAgbWFwKChkYXRhTG9hZGVkOiBib29sZWFuKSA9PiAoZGF0YUxvYWRlZCA/IHRoaXMud2luZG93Py5RU0kgOiBFTVBUWSkpLFxuICAgIGZpbHRlcigocXNpOiBhbnkpID0+IEJvb2xlYW4ocXNpKSksXG4gICAgdGFwKChxc2k6IGFueSkgPT4gKHRoaXMucXNpQXBpID0gcXNpKSlcbiAgKTtcblxuICBnZXQgd2luZG93KCk6IFF1YWx0cmljc1dpbmRvdyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcm90ZWN0ZWQgcGxhdGZvcm1JZDogYW55LFxuICAgIHByb3RlY3RlZCBzY3JpcHRMb2FkZXI6IFNjcmlwdExvYWRlclxuICApIHtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBkZXBsb3ltZW50IHNjcmlwdCB0byB0aGUgRE9NLlxuICAgKlxuICAgKiBUaGUgc2NyaXB0IHdpbGwgbm90IGJlIGFkZGVkIHR3aWNlIGlmIGl0IHdhcyBsb2FkZWQgYmVmb3JlLiBJbiB0aGF0IGNhc2UsIHdlIHVzZVxuICAgKiB0aGUgUXVhbHRyaWNzIEFQSSBkaXJlY3RseSB0byBfdW5sb2FkXyBhbmQgX3J1bl8gdGhlIHByb2plY3QuXG4gICAqL1xuICBhZGRTY3JpcHQoc2NyaXB0U291cmNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5oYXNTY3JpcHQoc2NyaXB0U291cmNlKSkge1xuICAgICAgdGhpcy5ydW4odHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2NyaXB0TG9hZGVyLmVtYmVkU2NyaXB0KHtcbiAgICAgICAgc3JjOiBzY3JpcHRTb3VyY2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBzY3JpcHQgaXMgYWxyZWFkeSBhZGRlZCB0byB0aGUgRE9NLlxuICAgKi9cbiAgaGFzU2NyaXB0KHNvdXJjZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMud2luUmVmLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNjcmlwdFtzcmM9XCIke3NvdXJjZX1cIl1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgb2JzZXJ2aW5nIHRoZSBRdWFsdHJpY3MgaW50ZWdyYXRpb24uIFRoZSBpbnRlZ3JhdGlvbiBpcyBiYXNlZCBvbiBhXG4gICAqIFF1YWx0cmljcyBzcGVjaWZpYyBldmVudCAoYHFzaV9qc19sb2FkZWRgKS4gQXMgc29vbiBhcyB0aGlzIGV2ZW50cyBoYXBwZW5zLFxuICAgKiB3ZSBydW4gdGhlIEFQSS5cbiAgICovXG4gIHByb3RlY3RlZCBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnFzaSQuc3Vic2NyaWJlKCgpID0+IHRoaXMucnVuKCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZXMgdGhlIFF1YWx0cmljcyBwcm9qZWN0IGNvZGUgZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAgICpcbiAgICogSW4gb3JkZXIgdG8gcmVsb2FkIHRoZSBldmFsdWF0aW9uIGluIFF1YWx0cmljcywgdGhlIEFQSSByZXF1aXJlcyB0byB1bmxvYWQgdGhlIEFQSSBiZWZvcmVcbiAgICogcnVubmluZyBpdCBhZ2Fpbi4gV2UgZG9uJ3QgZG8gdGhpcyBieSBkZWZhdWx0LCBidXQgb2ZmZXIgYSBmbGFnIHRvIGNvbmRpdGlvbmFsbHkgdW5sb2FkIHRoZSBBUEkuXG4gICAqL1xuICBwcm90ZWN0ZWQgcnVuKHJlbG9hZCA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnFzaUFwaT8uQVBJKSB7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKCdUaGUgUVNJIGFwaSBpcyBub3QgYXZhaWxhYmxlJyk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHJlbG9hZCkge1xuICAgICAgLy8gUmVtb3ZlcyBhbnkgY3VycmVudGx5IGRpc3BsYXlpbmcgY3JlYXRpdmVzXG4gICAgICB0aGlzLnFzaUFwaS5BUEkudW5sb2FkKCk7XG4gICAgfVxuXG4gICAgLy8gU3RhcnRzIHRoZSBpbnRlcmNlcHQgY29kZSBldmFsdWF0aW9uIHJpZ2h0IGFmdGVyIGxvYWRpbmcgdGhlIFNpdGUgSW50ZXJjZXB0XG4gICAgLy8gY29kZSBmb3IgYW55IGRlZmluZWQgaW50ZXJjZXB0cyBvciBjcmVhdGl2ZXNcbiAgICB0aGlzLnFzaUFwaS5BUEkubG9hZCgpLmRvbmUodGhpcy5xc2lBcGkuQVBJLnJ1bigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGxvZ2ljIGV4aXN0IGluIG9yZGVyIHRvIGxldCB0aGUgY2xpZW50KHMpIGFkZCB0aGVpciBvd24gbG9naWMgdG8gd2FpdCBmb3IgYW55IGtpbmQgb2YgcGFnZSBkYXRhLlxuICAgKiBZb3UgY2FuIG9ic2VydmUgYW55IGRhdGEgaW4gdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNEYXRhTG9hZGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBvZih0cnVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=