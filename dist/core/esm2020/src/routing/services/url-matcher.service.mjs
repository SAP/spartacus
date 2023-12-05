/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../util/glob.service";
export class UrlMatcherService {
    constructor(globService) {
        this.globService = globService;
    }
    /**
     * Returns a matcher that is always fails
     */
    getFalsy() {
        return function falsyUrlMatcher() {
            return null;
        };
    }
    /**
     * Returns a matcher for given list of paths
     */
    getFromPaths(paths) {
        const matchers = paths.map((path) => this.getFromPath(path));
        const matcher = this.getCombined(matchers);
        if (isDevMode()) {
            matcher['_paths'] = paths; // property added for easier debugging of routes
        }
        return matcher;
    }
    /**
     * Returns a matcher that combines the given matchers
     * */
    getCombined(matchers) {
        const matcher = function combinedUrlMatchers(segments, segmentGroup, route) {
            for (let i = 0; i < matchers.length; i++) {
                const result = matchers[i](segments, segmentGroup, route);
                if (result) {
                    return result;
                }
            }
            return null;
        };
        if (isDevMode()) {
            matcher['_matchers'] = matchers; // property added for easier debugging of routes
        }
        return matcher;
    }
    /**
     * Similar to Angular's defaultUrlMatcher. Differences:
     * - the `path` comes from function's argument, not from `route.path`
     * - the empty path `''` is handled here, but in Angular is handled one level higher in the match() function
     */
    getFromPath(path = '') {
        const matcher = function pathUrlMatcher(segments, segmentGroup, route) {
            /**
             * @license
             * The MIT License
             * Copyright (c) 2010-2019 Google LLC. http://angular.io/license
             *
             * See:
             * - https://github.com/angular/angular/blob/6f5f481fdae03f1d8db36284b64c7b82d9519d85/packages/router/src/shared.ts#L121
             */
            // use function's argument, not the `route.path`
            if (path === '') {
                return useFunctionArgument(segments, segmentGroup, route);
            }
            const parts = path.split('/'); // use function's argument, not the `route.path`
            if (or(
            // The actual URL is shorter than the config, no match
            parts.length > segments.length, 
            // The config is longer than the actual URL but we are looking for a full match, return null
            and(route.pathMatch === 'full', or(segmentGroup.hasChildren(), parts.length < segments.length)))) {
                return null;
            }
            const posParams = {};
            // Check each config part against the actual URL
            for (let index = 0; index < parts.length; index++) {
                const part = parts[index];
                const segment = segments[index];
                const isParameter = part.startsWith(':');
                if (isParameter) {
                    posParams[part.substring(1)] = segment;
                }
                else if (part !== segment.path) {
                    // The actual URL part does not match the config, no match
                    return null;
                }
            }
            return { consumed: segments.slice(0, parts.length), posParams };
        };
        if (isDevMode()) {
            matcher['_path'] = path; // property added for easier debugging of routes
        }
        return matcher;
        function useFunctionArgument(segments, segmentGroup, route) {
            if (and(route.pathMatch === 'full', or(segmentGroup.hasChildren(), segments.length > 0))) {
                return null;
            }
            return { consumed: [], posParams: {} };
        }
        /**
         * Logical function to reduce sonar complexity score as matcher scope is limited to inner function.
         */
        function or(a, b) {
            return a || b;
        }
        /**
         * Logical function to reduce sonar complexity score as matcher scope is limited to inner function.
         */
        function and(a, b) {
            return a && b;
        }
    }
    /**
     * Returns URL matcher that accepts almost everything (like `**` route), but not paths accepted by the given matcher
     */
    getOpposite(originalMatcher) {
        const matcher = function oppositeUrlMatcher(segments, group, route) {
            return originalMatcher(segments, group, route)
                ? null
                : { consumed: segments, posParams: {} };
        };
        if (isDevMode()) {
            matcher['_originalMatcher'] = originalMatcher; // property added for easier debugging of routes
        }
        return matcher;
    }
    /**
     * Returns URL matcher for the given list of glob-like patterns. Each pattern must start with `/` or `!/`.
     */
    getFromGlob(globPatterns) {
        const globValidator = this.globService.getValidator(globPatterns);
        const matcher = function globUrlMatcher(segments) {
            const fullPath = `/${segments.map((s) => s.path).join('/')}`;
            return globValidator(fullPath)
                ? { consumed: segments, posParams: {} }
                : null;
        };
        if (isDevMode()) {
            matcher['_globPatterns'] = globPatterns; // property added for easier debugging of routes
        }
        return matcher;
    }
}
UrlMatcherService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UrlMatcherService, deps: [{ token: i1.GlobService }], target: i0.ɵɵFactoryTarget.Injectable });
UrlMatcherService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UrlMatcherService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UrlMatcherService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.GlobService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLW1hdGNoZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3JvdXRpbmcvc2VydmljZXMvdXJsLW1hdGNoZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVd0RCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQXNCLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUcsQ0FBQztJQUVsRDs7T0FFRztJQUNILFFBQVE7UUFDTixPQUFPLFNBQVMsZUFBZTtZQUM3QixPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVksQ0FBQyxLQUFlO1FBQzFCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDVCxPQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsZ0RBQWdEO1NBQ25GO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVEOztTQUVLO0lBQ0wsV0FBVyxDQUFDLFFBQXNCO1FBQ2hDLE1BQU0sT0FBTyxHQUFHLFNBQVMsbUJBQW1CLENBQzFDLFFBQXNCLEVBQ3RCLFlBQTZCLEVBQzdCLEtBQVk7WUFFWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMs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SUFBSSxDQUFDO1FBQ1gsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxnREFBZ0Q7U0FDMUY7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs4R0FuTFUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FESixNQUFNOzJGQUNuQixpQkFBaUI7a0JBRDdCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBSb3V0ZSxcbiAgVXJsTWF0Y2hlcixcbiAgVXJsTWF0Y2hSZXN1bHQsXG4gIFVybFNlZ21lbnQsXG4gIFVybFNlZ21lbnRHcm91cCxcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEdsb2JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbC9nbG9iLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFVybE1hdGNoZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGdsb2JTZXJ2aWNlOiBHbG9iU2VydmljZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyBhIG1hdGNoZXIgdGhhdCBpcyBhbHdheXMgZmFpbHNcbiAgICovXG4gIGdldEZhbHN5KCk6IFVybE1hdGNoZXIge1xuICAgIHJldHVybiBmdW5jdGlvbiBmYWxzeVVybE1hdGNoZXIoKTogbnVsbCB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBtYXRjaGVyIGZvciBnaXZlbiBsaXN0IG9mIHBhdGhzXG4gICAqL1xuICBnZXRGcm9tUGF0aHMocGF0aHM6IHN0cmluZ1tdKTogVXJsTWF0Y2hlciB7XG4gICAgY29uc3QgbWF0Y2hlcnMgPSBwYXRocy5tYXAoKHBhdGgpID0+IHRoaXMuZ2V0RnJvbVBhdGgocGF0aCkpO1xuICAgIGNvbnN0IG1hdGNoZXIgPSB0aGlzLmdldENvbWJpbmVkKG1hdGNoZXJzKTtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICg8YW55Pm1hdGNoZXIpWydfcGF0aHMnXSA9IHBhdGhzOyAvLyBwcm9wZXJ0eSBhZGRlZCBmb3IgZWFzaWVyIGRlYnVnZ2luZyBvZiByb3V0ZXNcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXI7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG1hdGNoZXIgdGhhdCBjb21iaW5lcyB0aGUgZ2l2ZW4gbWF0Y2hlcnNcbiAgICogKi9cbiAgZ2V0Q29tYmluZWQobWF0Y2hlcnM6IFVybE1hdGNoZXJbXSk6IFVybE1hdGNoZXIge1xuICAgIGNvbnN0IG1hdGNoZXIgPSBmdW5jdGlvbiBjb21iaW5lZFVybE1hdGNoZXJzKFxuICAgICAgc2VnbWVudHM6IFVybFNlZ21lbnRbXSxcbiAgICAgIHNlZ21lbnRHcm91cDogVXJsU2VnbWVudEdyb3VwLFxuICAgICAgcm91dGU6IFJvdXRlXG4gICAgKTogVXJsTWF0Y2hSZXN1bHQgfCBudWxsIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0Y2hlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbWF0Y2hlcnNbaV0oc2VnbWVudHMsIHNlZ21lbnRHcm91cCwgcm91dGUpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIG1hdGNoZXJbJ19tYXRjaGVycyddID0gbWF0Y2hlcnM7IC8vIHByb3BlcnR5IGFkZGVkIGZvciBlYXNpZXIgZGVidWdnaW5nIG9mIHJvdXRlc1xuICAgIH1cbiAgICByZXR1cm4gbWF0Y2hlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaW1pbGFyIHRvIEFuZ3VsYXIncyBkZWZhdWx0VXJsTWF0Y2hlci4gRGlmZmVyZW5jZXM6XG4gICAqIC0gdGhlIGBwYXRoYCBjb21lcyBmcm9tIGZ1bmN0aW9uJ3MgYXJndW1lbnQsIG5vdCBmcm9tIGByb3V0ZS5wYXRoYFxuICAgKiAtIHRoZSBlbXB0eSBwYXRoIGAnJ2AgaXMgaGFuZGxlZCBoZXJlLCBidXQgaW4gQW5ndWxhciBpcyBoYW5kbGVkIG9uZSBsZXZlbCBoaWdoZXIgaW4gdGhlIG1hdGNoKCkgZnVuY3Rpb25cbiAgICovXG4gIHByb3RlY3RlZCBnZXRGcm9tUGF0aChwYXRoOiBzdHJpbmcgPSAnJyk6IFVybE1hdGNoZXIge1xuICAgIGNvbnN0IG1hdGNoZXIgPSBmdW5jdGlvbiBwYXRoVXJsTWF0Y2hlcihcbiAgICAgIHNlZ21lbnRzOiBVcmxTZWdtZW50W10sXG4gICAgICBzZWdtZW50R3JvdXA6IFVybFNlZ21lbnRHcm91cCxcbiAgICAgIHJvdXRlOiBSb3V0ZVxuICAgICk6IFVybE1hdGNoUmVzdWx0IHwgbnVsbCB7XG4gICAgICAvKipcbiAgICAgICAqIEBsaWNlbnNlXG4gICAgICAgKiBUaGUgTUlUIExpY2Vuc2VcbiAgICAgICAqIENvcHlyaWdodCAoYykgMjAxMC0yMDE5IEdvb2dsZSBMTEMuIGh0dHA6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAgICAgICAqXG4gICAgICAgKiBTZWU6XG4gICAgICAgKiAtIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi82ZjVmNDgxZmRhZTAzZjFkOGRiMzYyODRiNjRjN2I4MmQ5NTE5ZDg1L3BhY2thZ2VzL3JvdXRlci9zcmMvc2hhcmVkLnRzI0wxMjFcbiAgICAgICAqL1xuXG4gICAgICAvLyB1c2UgZnVuY3Rpb24ncyBhcmd1bWVudCwgbm90IHRoZSBgcm91dGUucGF0aGBcbiAgICAgIGlmIChwYXRoID09PSAnJykge1xuICAgICAgICByZXR1cm4gdXNlRnVuY3Rpb25Bcmd1bWVudChzZWdtZW50cywgc2VnbWVudEdyb3VwLCByb3V0ZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcnRzID0gcGF0aC5zcGxpdCgnLycpOyAvLyB1c2UgZnVuY3Rpb24ncyBhcmd1bWVudCwgbm90IHRoZSBgcm91dGUucGF0aGBcblxuICAgICAgaWYgKFxuICAgICAgICBvcihcbiAgICAgICAgICAvLyBUaGUgYWN0dWFsIFVSTCBpcyBzaG9ydGVyIHRoYW4gdGhlIGNvbmZpZywgbm8gbWF0Y2hcbiAgICAgICAgICBwYXJ0cy5sZW5ndGggPiBzZWdtZW50cy5sZW5ndGgsXG4gICAgICAgICAgLy8gVGhlIGNvbmZpZyBpcyBsb25nZXIgdGhhbiB0aGUgYWN0dWFsIFVSTCBidXQgd2UgYXJlIGxvb2tpbmcgZm9yIGEgZnVsbCBtYXRjaCwgcmV0dXJuIG51bGxcbiAgICAgICAgICBhbmQoXG4gICAgICAgICAgICByb3V0ZS5wYXRoTWF0Y2ggPT09ICdmdWxsJyxcbiAgICAgICAgICAgIG9yKHNlZ21lbnRHcm91cC5oYXNDaGlsZHJlbigpLCBwYXJ0cy5sZW5ndGggPCBzZWdtZW50cy5sZW5ndGgpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBvc1BhcmFtczogeyBba2V5OiBzdHJpbmddOiBVcmxTZWdtZW50IH0gPSB7fTtcblxuICAgICAgLy8gQ2hlY2sgZWFjaCBjb25maWcgcGFydCBhZ2FpbnN0IHRoZSBhY3R1YWwgVVJMXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcGFydHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IHBhcnQgPSBwYXJ0c1tpbmRleF07XG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSBzZWdtZW50c1tpbmRleF07XG4gICAgICAgIGNvbnN0IGlzUGFyYW1ldGVyID0gcGFydC5zdGFydHNXaXRoKCc6Jyk7XG4gICAgICAgIGlmIChpc1BhcmFtZXRlcikge1xuICAgICAgICAgIHBvc1BhcmFtc1twYXJ0LnN1YnN0cmluZygxKV0gPSBzZWdtZW50O1xuICAgICAgICB9IGVsc2UgaWYgKHBhcnQgIT09IHNlZ21lbnQucGF0aCkge1xuICAgICAgICAgIC8vIFRoZSBhY3R1YWwgVVJMIHBhcnQgZG9lcyBub3QgbWF0Y2ggdGhlIGNvbmZpZywgbm8gbWF0Y2hcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBjb25zdW1lZDogc2VnbWVudHMuc2xpY2UoMCwgcGFydHMubGVuZ3RoKSwgcG9zUGFyYW1zIH07XG4gICAgfTtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIG1hdGNoZXJbJ19wYXRoJ10gPSBwYXRoOyAvLyBwcm9wZXJ0eSBhZGRlZCBmb3IgZWFzaWVyIGRlYnVnZ2luZyBvZiByb3V0ZXNcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXI7XG5cbiAgICBmdW5jdGlvbiB1c2VGdW5jdGlvbkFyZ3VtZW50KFxuICAgICAgc2VnbWVudHM6IFVybFNlZ21lbnRbXSxcbiAgICAgIHNlZ21lbnRHcm91cDogVXJsU2VnbWVudEdyb3VwLFxuICAgICAgcm91dGU6IFJvdXRlXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGFuZChcbiAgICAgICAgICByb3V0ZS5wYXRoTWF0Y2ggPT09ICdmdWxsJyxcbiAgICAgICAgICBvcihzZWdtZW50R3JvdXAuaGFzQ2hpbGRyZW4oKSwgc2VnbWVudHMubGVuZ3RoID4gMClcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgY29uc3VtZWQ6IFtdLCBwb3NQYXJhbXM6IHt9IH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9naWNhbCBmdW5jdGlvbiB0byByZWR1Y2Ugc29uYXIgY29tcGxleGl0eSBzY29yZSBhcyBtYXRjaGVyIHNjb3BlIGlzIGxpbWl0ZWQgdG8gaW5uZXIgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gb3IoYTogYm9vbGVhbiwgYjogYm9vbGVhbikge1xuICAgICAgcmV0dXJuIGEgfHwgYjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dpY2FsIGZ1bmN0aW9uIHRvIHJlZHVjZSBzb25hciBjb21wbGV4aXR5IHNjb3JlIGFzIG1hdGNoZXIgc2NvcGUgaXMgbGltaXRlZCB0byBpbm5lciBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhbmQoYTogYm9vbGVhbiwgYjogYm9vbGVhbikge1xuICAgICAgcmV0dXJuIGEgJiYgYjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBVUkwgbWF0Y2hlciB0aGF0IGFjY2VwdHMgYWxtb3N0IGV2ZXJ5dGhpbmcgKGxpa2UgYCoqYCByb3V0ZSksIGJ1dCBub3QgcGF0aHMgYWNjZXB0ZWQgYnkgdGhlIGdpdmVuIG1hdGNoZXJcbiAgICovXG4gIGdldE9wcG9zaXRlKG9yaWdpbmFsTWF0Y2hlcjogVXJsTWF0Y2hlcik6IFVybE1hdGNoZXIge1xuICAgIGNvbnN0IG1hdGNoZXIgPSBmdW5jdGlvbiBvcHBvc2l0ZVVybE1hdGNoZXIoXG4gICAgICBzZWdtZW50czogVXJsU2VnbWVudFtdLFxuICAgICAgZ3JvdXA6IFVybFNlZ21lbnRHcm91cCxcbiAgICAgIHJvdXRlOiBSb3V0ZVxuICAgICkge1xuICAgICAgcmV0dXJuIG9yaWdpbmFsTWF0Y2hlcihzZWdtZW50cywgZ3JvdXAsIHJvdXRlKVxuICAgICAgICA/IG51bGxcbiAgICAgICAgOiB7IGNvbnN1bWVkOiBzZWdtZW50cywgcG9zUGFyYW1zOiB7fSB9O1xuICAgIH07XG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICBtYXRjaGVyWydfb3JpZ2luYWxNYXRjaGVyJ10gPSBvcmlnaW5hbE1hdGNoZXI7IC8vIHByb3BlcnR5IGFkZGVkIGZvciBlYXNpZXIgZGVidWdnaW5nIG9mIHJvdXRlc1xuICAgIH1cbiAgICByZXR1cm4gbWF0Y2hlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIFVSTCBtYXRjaGVyIGZvciB0aGUgZ2l2ZW4gbGlzdCBvZiBnbG9iLWxpa2UgcGF0dGVybnMuIEVhY2ggcGF0dGVybiBtdXN0IHN0YXJ0IHdpdGggYC9gIG9yIGAhL2AuXG4gICAqL1xuICBnZXRGcm9tR2xvYihnbG9iUGF0dGVybnM6IHN0cmluZ1tdKTogVXJsTWF0Y2hlciB7XG4gICAgY29uc3QgZ2xvYlZhbGlkYXRvciA9IHRoaXMuZ2xvYlNlcnZpY2UuZ2V0VmFsaWRhdG9yKGdsb2JQYXR0ZXJucyk7XG5cbiAgICBjb25zdCBtYXRjaGVyID0gZnVuY3Rpb24gZ2xvYlVybE1hdGNoZXIoXG4gICAgICBzZWdtZW50czogVXJsU2VnbWVudFtdXG4gICAgKTogVXJsTWF0Y2hSZXN1bHQgfCBudWxsIHtcbiAgICAgIGNvbnN0IGZ1bGxQYXRoID0gYC8ke3NlZ21lbnRzLm1hcCgocykgPT4gcy5wYXRoKS5qb2luKCcvJyl9YDtcblxuICAgICAgcmV0dXJuIGdsb2JWYWxpZGF0b3IoZnVsbFBhdGgpXG4gICAgICAgID8geyBjb25zdW1lZDogc2VnbWVudHMsIHBvc1BhcmFtczoge30gfVxuICAgICAgICA6IG51bGw7XG4gICAgfTtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIG1hdGNoZXJbJ19nbG9iUGF0dGVybnMnXSA9IGdsb2JQYXR0ZXJuczsgLy8gcHJvcGVydHkgYWRkZWQgZm9yIGVhc2llciBkZWJ1Z2dpbmcgb2Ygcm91dGVzXG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVyO1xuICB9XG59XG4iXX0=