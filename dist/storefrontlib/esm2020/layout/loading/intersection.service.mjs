/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, first, map, mergeMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../config/layout-config";
/**
 * The IntersectionService uses the native IntersectionObserver (v2), which
 * can be used to implement pre-loading and deferred loading of DOM content.
 *
 */
export class IntersectionService {
    constructor(config) {
        this.config = config;
    }
    /**
     * Returns an Observable that emits only once a boolean value whenever
     * the given element has shown in the view port.
     *
     * The returned observable will only emit the first value. The
     * observable must be cleaned up either way, since the value might never emit; it
     * depends on whether the element appears in the view port.
     *
     * @param element - HTML element
     * @param options - Allows to specify an optional root margin, in order to fire before the element shows up in the viewport
     * @param intersectingCondition - Allows to specify an intersecting condition.
     * If this parameter is not set, then the transition state of the element will be verified whenever the element intersects the view port.
     * @returns Element intersects?
     */
    isIntersected(element, options, intersectingCondition) {
        return this.intersects(element, options, intersectingCondition).pipe(first((v) => v === true));
    }
    /**
     * Returns an observable that emits for every change of intersection of a given element.
     *
     * @param element - HTML element
     * @param options - Allows to specify an optional root margin, in order to fire before the element shows up in the viewport
     * @param intersectingCondition - Allows to specify an intersecting condition.
     * If this parameter is not set, then the transition state of the element will be verified whenever the element intersects the view port.
     * @returns Element intersects?
     */
    isIntersecting(element, options, intersectingCondition) {
        return this.intersects(element, options, intersectingCondition);
    }
    /**
     * Indicates whenever the element intersects the view port. An optional margin
     * is used to intersects before the element shows up in the viewport.
     * A value is emitted each time the element intersects.
     */
    intersects(element, options = {}, intersectingCondition) {
        return this.createIntersectionObservable(element, options).pipe(mergeMap((entries) => entries), map((entry) => intersectingCondition
            ? intersectingCondition(entry)
            : entry.isIntersecting), distinctUntilChanged());
    }
    createIntersectionObservable(element, options) {
        return new Observable((observer) => {
            const rootMargin = this.getRootMargin(options);
            const intersectOptions = { rootMargin, threshold: options.threshold };
            const intersectionObserver = new IntersectionObserver((entries) => {
                observer.next(entries);
            }, intersectOptions);
            intersectionObserver.observe(element);
            return () => {
                intersectionObserver.disconnect();
            };
        });
    }
    getRootMargin(options = {}) {
        if (options.rootMargin) {
            return options.rootMargin;
        }
        const layoutConfig = this.config;
        if (layoutConfig.deferredLoading &&
            layoutConfig.deferredLoading.intersectionMargin) {
            return layoutConfig.deferredLoading.intersectionMargin;
        }
    }
}
IntersectionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IntersectionService, deps: [{ token: i1.LayoutConfig }], target: i0.ɵɵFactoryTarget.Injectable });
IntersectionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IntersectionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IntersectionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.LayoutConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJzZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9sb2FkaW5nL2ludGVyc2VjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQVE1RTs7OztHQUlHO0FBSUgsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFzQixNQUFvQjtRQUFwQixXQUFNLEdBQU4sTUFBTSxDQUFjO0lBQUcsQ0FBQztJQUU5Qzs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsYUFBYSxDQUNYLE9BQW9CLEVBQ3BCLE9BQTZCLEVBQzdCLHFCQUE2QztRQUU3QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FDbEUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQ3pCLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxjQUFjLENBQ1osT0FBb0IsRUFDcEIsT0FBNkIsRUFDN0IscUJBQTZDO1FBRTdDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxVQUFVLENBQ2hCLE9BQW9CLEVBQ3BCLFVBQStCLEVBQUUsRUFDakMscUJBQTZDO1FBRTdDLE9BQU8sSUFBSSxDQUFDLDRCQUE0QixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQzdELFFBQVEsQ0FBQyxDQUFDLE9BQW9DLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUMzRCxHQUFHLENBQUMsQ0FBQyxLQUFnQyxFQUFFLEVBQUUsQ0FDdkMscUJBQXFCO1lBQ25CLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUM7WUFDOUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQ3pCLEVBQ0Qsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFTyw0QkFBNEIsQ0FDbEMsT0FBb0IsRUFDcEIsT0FBNEI7UUFFNUIsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLFFBQStDLEVBQUUsRUFBRTtZQUN4RSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN0RSxNQUFNLG9CQUFvQixHQUFHLElBQUksb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDaEUsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUNyQixvQkFBb0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1Ysb0JBQW9CLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sYUFBYSxDQUFDLFVBQStCLEVBQUU7UUFDckQsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3RCLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQztTQUMzQjtRQUNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFzQixDQUFDO1FBQ2pELElBQ0UsWUFBWSxDQUFDLGVBQWU7WUFDNUIsWUFBWSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFDL0M7WUFDQSxPQUFPLFlBQVksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUM7U0FDeEQ7SUFDSCxDQUFDOztnSEE3RlUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaXJzdCwgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExheW91dENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9sYXlvdXQtY29uZmlnJztcbmltcG9ydCB7IEludGVyc2VjdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyc2VjdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCB0eXBlIEludGVyc2VjdGluZ0NvbmRpdGlvbiA9IChcbiAgZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlcbikgPT4gYm9vbGVhbjtcblxuLyoqXG4gKiBUaGUgSW50ZXJzZWN0aW9uU2VydmljZSB1c2VzIHRoZSBuYXRpdmUgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKHYyKSwgd2hpY2hcbiAqIGNhbiBiZSB1c2VkIHRvIGltcGxlbWVudCBwcmUtbG9hZGluZyBhbmQgZGVmZXJyZWQgbG9hZGluZyBvZiBET00gY29udGVudC5cbiAqXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBJbnRlcnNlY3Rpb25TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbmZpZzogTGF5b3V0Q29uZmlnKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBvbmx5IG9uY2UgYSBib29sZWFuIHZhbHVlIHdoZW5ldmVyXG4gICAqIHRoZSBnaXZlbiBlbGVtZW50IGhhcyBzaG93biBpbiB0aGUgdmlldyBwb3J0LlxuICAgKlxuICAgKiBUaGUgcmV0dXJuZWQgb2JzZXJ2YWJsZSB3aWxsIG9ubHkgZW1pdCB0aGUgZmlyc3QgdmFsdWUuIFRoZVxuICAgKiBvYnNlcnZhYmxlIG11c3QgYmUgY2xlYW5lZCB1cCBlaXRoZXIgd2F5LCBzaW5jZSB0aGUgdmFsdWUgbWlnaHQgbmV2ZXIgZW1pdDsgaXRcbiAgICogZGVwZW5kcyBvbiB3aGV0aGVyIHRoZSBlbGVtZW50IGFwcGVhcnMgaW4gdGhlIHZpZXcgcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnQgLSBIVE1MIGVsZW1lbnRcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbGxvd3MgdG8gc3BlY2lmeSBhbiBvcHRpb25hbCByb290IG1hcmdpbiwgaW4gb3JkZXIgdG8gZmlyZSBiZWZvcmUgdGhlIGVsZW1lbnQgc2hvd3MgdXAgaW4gdGhlIHZpZXdwb3J0XG4gICAqIEBwYXJhbSBpbnRlcnNlY3RpbmdDb25kaXRpb24gLSBBbGxvd3MgdG8gc3BlY2lmeSBhbiBpbnRlcnNlY3RpbmcgY29uZGl0aW9uLlxuICAgKiBJZiB0aGlzIHBhcmFtZXRlciBpcyBub3Qgc2V0LCB0aGVuIHRoZSB0cmFuc2l0aW9uIHN0YXRlIG9mIHRoZSBlbGVtZW50IHdpbGwgYmUgdmVyaWZpZWQgd2hlbmV2ZXIgdGhlIGVsZW1lbnQgaW50ZXJzZWN0cyB0aGUgdmlldyBwb3J0LlxuICAgKiBAcmV0dXJucyBFbGVtZW50IGludGVyc2VjdHM/XG4gICAqL1xuICBpc0ludGVyc2VjdGVkKFxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIG9wdGlvbnM/OiBJbnRlcnNlY3Rpb25PcHRpb25zLFxuICAgIGludGVyc2VjdGluZ0NvbmRpdGlvbj86IEludGVyc2VjdGluZ0NvbmRpdGlvblxuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcnNlY3RzKGVsZW1lbnQsIG9wdGlvbnMsIGludGVyc2VjdGluZ0NvbmRpdGlvbikucGlwZShcbiAgICAgIGZpcnN0KCh2KSA9PiB2ID09PSB0cnVlKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgZm9yIGV2ZXJ5IGNoYW5nZSBvZiBpbnRlcnNlY3Rpb24gb2YgYSBnaXZlbiBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudCAtIEhUTUwgZWxlbWVudFxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFsbG93cyB0byBzcGVjaWZ5IGFuIG9wdGlvbmFsIHJvb3QgbWFyZ2luLCBpbiBvcmRlciB0byBmaXJlIGJlZm9yZSB0aGUgZWxlbWVudCBzaG93cyB1cCBpbiB0aGUgdmlld3BvcnRcbiAgICogQHBhcmFtIGludGVyc2VjdGluZ0NvbmRpdGlvbiAtIEFsbG93cyB0byBzcGVjaWZ5IGFuIGludGVyc2VjdGluZyBjb25kaXRpb24uXG4gICAqIElmIHRoaXMgcGFyYW1ldGVyIGlzIG5vdCBzZXQsIHRoZW4gdGhlIHRyYW5zaXRpb24gc3RhdGUgb2YgdGhlIGVsZW1lbnQgd2lsbCBiZSB2ZXJpZmllZCB3aGVuZXZlciB0aGUgZWxlbWVudCBpbnRlcnNlY3RzIHRoZSB2aWV3IHBvcnQuXG4gICAqIEByZXR1cm5zIEVsZW1lbnQgaW50ZXJzZWN0cz9cbiAgICovXG4gIGlzSW50ZXJzZWN0aW5nKFxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIG9wdGlvbnM/OiBJbnRlcnNlY3Rpb25PcHRpb25zLFxuICAgIGludGVyc2VjdGluZ0NvbmRpdGlvbj86IEludGVyc2VjdGluZ0NvbmRpdGlvblxuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcnNlY3RzKGVsZW1lbnQsIG9wdGlvbnMsIGludGVyc2VjdGluZ0NvbmRpdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZW5ldmVyIHRoZSBlbGVtZW50IGludGVyc2VjdHMgdGhlIHZpZXcgcG9ydC4gQW4gb3B0aW9uYWwgbWFyZ2luXG4gICAqIGlzIHVzZWQgdG8gaW50ZXJzZWN0cyBiZWZvcmUgdGhlIGVsZW1lbnQgc2hvd3MgdXAgaW4gdGhlIHZpZXdwb3J0LlxuICAgKiBBIHZhbHVlIGlzIGVtaXR0ZWQgZWFjaCB0aW1lIHRoZSBlbGVtZW50IGludGVyc2VjdHMuXG4gICAqL1xuICBwcml2YXRlIGludGVyc2VjdHMoXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgb3B0aW9uczogSW50ZXJzZWN0aW9uT3B0aW9ucyA9IHt9LFxuICAgIGludGVyc2VjdGluZ0NvbmRpdGlvbj86IEludGVyc2VjdGluZ0NvbmRpdGlvblxuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJbnRlcnNlY3Rpb25PYnNlcnZhYmxlKGVsZW1lbnQsIG9wdGlvbnMpLnBpcGUoXG4gICAgICBtZXJnZU1hcCgoZW50cmllczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdKSA9PiBlbnRyaWVzKSxcbiAgICAgIG1hcCgoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpID0+XG4gICAgICAgIGludGVyc2VjdGluZ0NvbmRpdGlvblxuICAgICAgICAgID8gaW50ZXJzZWN0aW5nQ29uZGl0aW9uKGVudHJ5KVxuICAgICAgICAgIDogZW50cnkuaXNJbnRlcnNlY3RpbmdcbiAgICAgICksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW50ZXJzZWN0aW9uT2JzZXJ2YWJsZShcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBvcHRpb25zOiBJbnRlcnNlY3Rpb25PcHRpb25zXG4gICk6IE9ic2VydmFibGU8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdPikgPT4ge1xuICAgICAgY29uc3Qgcm9vdE1hcmdpbiA9IHRoaXMuZ2V0Um9vdE1hcmdpbihvcHRpb25zKTtcbiAgICAgIGNvbnN0IGludGVyc2VjdE9wdGlvbnMgPSB7IHJvb3RNYXJnaW4sIHRocmVzaG9sZDogb3B0aW9ucy50aHJlc2hvbGQgfTtcbiAgICAgIGNvbnN0IGludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgIG9ic2VydmVyLm5leHQoZW50cmllcyk7XG4gICAgICB9LCBpbnRlcnNlY3RPcHRpb25zKTtcbiAgICAgIGludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUoZWxlbWVudCk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpbnRlcnNlY3Rpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSb290TWFyZ2luKG9wdGlvbnM6IEludGVyc2VjdGlvbk9wdGlvbnMgPSB7fSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKG9wdGlvbnMucm9vdE1hcmdpbikge1xuICAgICAgcmV0dXJuIG9wdGlvbnMucm9vdE1hcmdpbjtcbiAgICB9XG4gICAgY29uc3QgbGF5b3V0Q29uZmlnID0gdGhpcy5jb25maWcgYXMgTGF5b3V0Q29uZmlnO1xuICAgIGlmIChcbiAgICAgIGxheW91dENvbmZpZy5kZWZlcnJlZExvYWRpbmcgJiZcbiAgICAgIGxheW91dENvbmZpZy5kZWZlcnJlZExvYWRpbmcuaW50ZXJzZWN0aW9uTWFyZ2luXG4gICAgKSB7XG4gICAgICByZXR1cm4gbGF5b3V0Q29uZmlnLmRlZmVycmVkTG9hZGluZy5pbnRlcnNlY3Rpb25NYXJnaW47XG4gICAgfVxuICB9XG59XG4iXX0=