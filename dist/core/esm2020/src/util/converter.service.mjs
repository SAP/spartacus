/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { getLastValueSync } from './rxjs/get-last-value-sync';
import * as i0 from "@angular/core";
import * as i1 from "../lazy-loading/unified-injector";
export class ConverterService {
    constructor(unifiedInjector) {
        this.unifiedInjector = unifiedInjector;
        this.subscriptions = new Subscription();
        this.converters = new Map();
        // Clear cached converters when new injectors appear
        const cacheResetLogic = this.unifiedInjector.injectors$.pipe(tap(() => this.converters.clear()));
        this.subscriptions.add(cacheResetLogic.subscribe());
    }
    getConverters(injectionToken) {
        if (!this.converters.has(injectionToken)) {
            const converters = getLastValueSync(this.unifiedInjector.getMulti(injectionToken));
            if (converters) {
                this.converters.set(injectionToken, converters);
            }
        }
        return this.converters.get(injectionToken);
    }
    /**
     * Will return true if converters for specified token were provided
     */
    hasConverters(injectionToken) {
        const converters = this.getConverters(injectionToken);
        return Array.isArray(converters) && converters.length > 0;
    }
    /**
     * Pipeable operator to apply converter logic in a observable stream
     */
    pipeable(injectionToken) {
        if (this.hasConverters(injectionToken)) {
            return map((model) => this.convertSource(model, injectionToken));
        }
        else {
            return (observable) => observable;
        }
    }
    /**
     * Pipeable operator to apply converter logic in a observable stream to collection of items
     */
    pipeableMany(injectionToken) {
        if (this.hasConverters(injectionToken)) {
            return map((model) => this.convertMany(model, injectionToken));
        }
        else {
            return (observable) => observable;
        }
    }
    /**
     * Apply converter logic specified by injection token to source data
     */
    convert(source, injectionToken) {
        if (this.hasConverters(injectionToken)) {
            return this.convertSource(source, injectionToken);
        }
        else {
            return source;
        }
    }
    /**
     * Apply converter logic specified by injection token to a collection
     */
    convertMany(sources, injectionToken) {
        if (this.hasConverters(injectionToken) && Array.isArray(sources)) {
            return sources.map((source) => this.convertSource(source, injectionToken));
        }
        else {
            return sources;
        }
    }
    convertSource(source, injectionToken) {
        return this.getConverters(injectionToken)?.reduce((target, converter) => {
            return converter.convert(source, target);
        }, undefined);
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
ConverterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConverterService, deps: [{ token: i1.UnifiedInjector }], target: i0.ɵɵFactoryTarget.Injectable });
ConverterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConverterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConverterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.UnifiedInjector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy91dGlsL2NvbnZlcnRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUE2QixNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQWdDLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7QUF3QjlELE1BQU0sT0FBTyxnQkFBZ0I7SUFHM0IsWUFBc0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRjVDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVdyQyxlQUFVLEdBR2QsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQVhaLG9EQUFvRDtRQUNwRCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQzFELEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQ25DLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBT08sYUFBYSxDQUNuQixjQUErQztRQUUvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDeEMsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUM5QyxDQUFDO1lBQ0YsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ2pEO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWEsQ0FDWCxjQUErQztRQUUvQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRLENBQ04sY0FBK0M7UUFFL0MsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO2FBQU07WUFDTCxPQUFPLENBQUMsVUFBMkIsRUFBRSxFQUFFLENBQUMsVUFBMkIsQ0FBQztTQUNyRTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVksQ0FDVixjQUErQztRQUUvQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDdEMsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7U0FDckU7YUFBTTtZQUNMLE9BQU8sQ0FBQyxVQUE2QixFQUFFLEVBQUUsQ0FBQyxVQUE2QixDQUFDO1NBQ3pFO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTyxDQUFPLE1BQVMsRUFBRSxjQUErQztRQUN0RSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztTQUNuRDthQUFNO1lBQ0wsT0FBTyxNQUFhLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQ1QsT0FBWSxFQUNaLGNBQStDO1FBRS9DLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUMzQyxDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8sT0FBZ0IsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFTyxhQUFhLENBQ25CLE1BQVMsRUFDVCxjQUErQztRQUUvQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFO1lBQ3RFLE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQUFFLFNBQWdCLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7NkdBMUdVLGdCQUFnQjtpSEFBaEIsZ0JBQWdCLGNBRmYsTUFBTTsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT3BlcmF0b3JGdW5jdGlvbiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFVuaWZpZWRJbmplY3RvciB9IGZyb20gJy4uL2xhenktbG9hZGluZy91bmlmaWVkLWluamVjdG9yJztcbmltcG9ydCB7IGdldExhc3RWYWx1ZVN5bmMgfSBmcm9tICcuL3J4anMvZ2V0LWxhc3QtdmFsdWUtc3luYyc7XG5cbi8qKlxuICogQ29udmVydGVyIGlzIHVzZWQgdG8gY29udmVydCBzb3VyY2UgZGF0YSBtb2RlbCB0byB0YXJnZXQgZGF0YSBtb2RlbC5cbiAqIEJ5IGNvbnZlbnRpb24sIHdlIGRpc3Rpbmd1aXNoIHR3byBmbG93czpcbiAqICAgLSAqTm9ybWFsaXplKiBpcyB0aGUgY29udmVyc2lvbiBmcm9tIGJhY2tlbmQgbW9kZWxzIHRvIFVJIG1vZGVsc1xuICogICAtICpTZXJpYWxpemUqIGlzIHRoZSBjb252ZXJzaW9uIG9mIFVJIG1vZGVscyB0byBiYWNrZW5kIG1vZGVscyAoaW4gY2FzZSBvZiBzdWJtaXR0aW5nIGRhdGEgdG8gdGhlIGJhY2tlbmQpLlxuICpcbiAqIENvbnZlcnRlcnMgY2FuIGJlIHN0YWNrZWQgdG9nZXRoZXIgdG8gdG8gYXBwbHkgZGVjb3VwbGVkIGN1c3RvbWl6YXRpb25zXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29udmVydGVyPFNPVVJDRSwgVEFSR0VUPiB7XG4gIC8qKlxuICAgKiBDb252ZXJ0IGNvbnZlcnRzIHNvdXJjZSBtb2RlbCB0byB0YXJnZXQgbW9kZWwuIENhbiB1c2Ugb3B0aW9uYWwgdGFyZ2V0IHBhcmFtZXRlcixcbiAgICogdXNlZCBpbiBjYXNlIG9mIHN0YWNraW5nIG11bHRpcGxlIGNvbnZlcnRlcnMgKGZvciBleGFtcGxlLCB0byBpbXBsZW1lbnQgcG9wdWxhdG9yIHBhdHRlcm4pLlxuICAgKlxuICAgKiBAcGFyYW0gc291cmNlIFNvdXJjZSBkYXRhIG1vZGVsXG4gICAqIEBwYXJhbSB0YXJnZXQgT3B0aW9uYWwsIHBhcnRpYWxseSBjb252ZXJ0ZWQgdGFyZ2V0IG1vZGVsXG4gICAqL1xuICBjb252ZXJ0KHNvdXJjZTogU09VUkNFLCB0YXJnZXQ/OiBUQVJHRVQpOiBUQVJHRVQ7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb252ZXJ0ZXJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHVuaWZpZWRJbmplY3RvcjogVW5pZmllZEluamVjdG9yKSB7XG4gICAgLy8gQ2xlYXIgY2FjaGVkIGNvbnZlcnRlcnMgd2hlbiBuZXcgaW5qZWN0b3JzIGFwcGVhclxuICAgIGNvbnN0IGNhY2hlUmVzZXRMb2dpYyA9IHRoaXMudW5pZmllZEluamVjdG9yLmluamVjdG9ycyQucGlwZShcbiAgICAgIHRhcCgoKSA9PiB0aGlzLmNvbnZlcnRlcnMuY2xlYXIoKSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChjYWNoZVJlc2V0TG9naWMuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0ZXJzOiBNYXA8XG4gICAgSW5qZWN0aW9uVG9rZW48Q29udmVydGVyPGFueSwgYW55Pj4sXG4gICAgQ29udmVydGVyPGFueSwgYW55PltdXG4gID4gPSBuZXcgTWFwKCk7XG5cbiAgcHJpdmF0ZSBnZXRDb252ZXJ0ZXJzPFMsIFQ+KFxuICAgIGluamVjdGlvblRva2VuOiBJbmplY3Rpb25Ub2tlbjxDb252ZXJ0ZXI8UywgVD4+XG4gICk6IENvbnZlcnRlcjxTLCBUPltdIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXRoaXMuY29udmVydGVycy5oYXMoaW5qZWN0aW9uVG9rZW4pKSB7XG4gICAgICBjb25zdCBjb252ZXJ0ZXJzID0gZ2V0TGFzdFZhbHVlU3luYyhcbiAgICAgICAgdGhpcy51bmlmaWVkSW5qZWN0b3IuZ2V0TXVsdGkoaW5qZWN0aW9uVG9rZW4pXG4gICAgICApO1xuICAgICAgaWYgKGNvbnZlcnRlcnMpIHtcbiAgICAgICAgdGhpcy5jb252ZXJ0ZXJzLnNldChpbmplY3Rpb25Ub2tlbiwgY29udmVydGVycyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udmVydGVycy5nZXQoaW5qZWN0aW9uVG9rZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFdpbGwgcmV0dXJuIHRydWUgaWYgY29udmVydGVycyBmb3Igc3BlY2lmaWVkIHRva2VuIHdlcmUgcHJvdmlkZWRcbiAgICovXG4gIGhhc0NvbnZlcnRlcnM8UywgVD4oXG4gICAgaW5qZWN0aW9uVG9rZW46IEluamVjdGlvblRva2VuPENvbnZlcnRlcjxTLCBUPj5cbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY29udmVydGVycyA9IHRoaXMuZ2V0Q29udmVydGVycyhpbmplY3Rpb25Ub2tlbik7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoY29udmVydGVycykgJiYgY29udmVydGVycy5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVhYmxlIG9wZXJhdG9yIHRvIGFwcGx5IGNvbnZlcnRlciBsb2dpYyBpbiBhIG9ic2VydmFibGUgc3RyZWFtXG4gICAqL1xuICBwaXBlYWJsZTxTLCBUPihcbiAgICBpbmplY3Rpb25Ub2tlbjogSW5qZWN0aW9uVG9rZW48Q29udmVydGVyPFMsIFQ+PlxuICApOiBPcGVyYXRvckZ1bmN0aW9uPFMsIFQ+IHtcbiAgICBpZiAodGhpcy5oYXNDb252ZXJ0ZXJzKGluamVjdGlvblRva2VuKSkge1xuICAgICAgcmV0dXJuIG1hcCgobW9kZWw6IFMpID0+IHRoaXMuY29udmVydFNvdXJjZShtb2RlbCwgaW5qZWN0aW9uVG9rZW4pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4pID0+IG9ic2VydmFibGUgYXMgT2JzZXJ2YWJsZTxUPjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZWFibGUgb3BlcmF0b3IgdG8gYXBwbHkgY29udmVydGVyIGxvZ2ljIGluIGEgb2JzZXJ2YWJsZSBzdHJlYW0gdG8gY29sbGVjdGlvbiBvZiBpdGVtc1xuICAgKi9cbiAgcGlwZWFibGVNYW55PFMsIFQ+KFxuICAgIGluamVjdGlvblRva2VuOiBJbmplY3Rpb25Ub2tlbjxDb252ZXJ0ZXI8UywgVD4+XG4gICk6IE9wZXJhdG9yRnVuY3Rpb248U1tdLCBUW10+IHtcbiAgICBpZiAodGhpcy5oYXNDb252ZXJ0ZXJzKGluamVjdGlvblRva2VuKSkge1xuICAgICAgcmV0dXJuIG1hcCgobW9kZWw6IFNbXSkgPT4gdGhpcy5jb252ZXJ0TWFueShtb2RlbCwgaW5qZWN0aW9uVG9rZW4pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueVtdPikgPT4gb2JzZXJ2YWJsZSBhcyBPYnNlcnZhYmxlPFRbXT47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IGNvbnZlcnRlciBsb2dpYyBzcGVjaWZpZWQgYnkgaW5qZWN0aW9uIHRva2VuIHRvIHNvdXJjZSBkYXRhXG4gICAqL1xuICBjb252ZXJ0PFMsIFQ+KHNvdXJjZTogUywgaW5qZWN0aW9uVG9rZW46IEluamVjdGlvblRva2VuPENvbnZlcnRlcjxTLCBUPj4pOiBUIHtcbiAgICBpZiAodGhpcy5oYXNDb252ZXJ0ZXJzKGluamVjdGlvblRva2VuKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29udmVydFNvdXJjZShzb3VyY2UsIGluamVjdGlvblRva2VuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNvdXJjZSBhcyBhbnk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IGNvbnZlcnRlciBsb2dpYyBzcGVjaWZpZWQgYnkgaW5qZWN0aW9uIHRva2VuIHRvIGEgY29sbGVjdGlvblxuICAgKi9cbiAgY29udmVydE1hbnk8UywgVD4oXG4gICAgc291cmNlczogU1tdLFxuICAgIGluamVjdGlvblRva2VuOiBJbmplY3Rpb25Ub2tlbjxDb252ZXJ0ZXI8UywgVD4+XG4gICk6IFRbXSB7XG4gICAgaWYgKHRoaXMuaGFzQ29udmVydGVycyhpbmplY3Rpb25Ub2tlbikgJiYgQXJyYXkuaXNBcnJheShzb3VyY2VzKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZXMubWFwKChzb3VyY2UpID0+XG4gICAgICAgIHRoaXMuY29udmVydFNvdXJjZShzb3VyY2UsIGluamVjdGlvblRva2VuKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNvdXJjZXMgYXMgYW55W107XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0U291cmNlPFMsIFQ+KFxuICAgIHNvdXJjZTogUyxcbiAgICBpbmplY3Rpb25Ub2tlbjogSW5qZWN0aW9uVG9rZW48Q29udmVydGVyPFMsIFQ+PlxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb252ZXJ0ZXJzKGluamVjdGlvblRva2VuKT8ucmVkdWNlKCh0YXJnZXQsIGNvbnZlcnRlcikgPT4ge1xuICAgICAgcmV0dXJuIGNvbnZlcnRlci5jb252ZXJ0KHNvdXJjZSwgdGFyZ2V0KTtcbiAgICB9LCB1bmRlZmluZWQgYXMgYW55KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=