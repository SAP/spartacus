/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isDevMode } from '@angular/core';
/**
 * Matches the pattern '[ ** / ] marker / :paramName'
 *
 * @param marker phrase that indicates the start of the match
 * @param paramName name of the parameter present after the marker
 * @param precedingParamName name of the parameter for every preceding url segment
 *        i.e. `param` will result in `param0`, `param1`, ...
 */
export function getSuffixUrlMatcher({ marker, paramName, precedingParamName, }) {
    precedingParamName = precedingParamName || 'param';
    const matcher = function suffixUrlMatcher(segments) {
        const markerIndex = findLastIndex(segments, ({ path }) => path === marker);
        const isMarkerLastSegment = markerIndex === segments.length - 1;
        if (markerIndex === -1 || isMarkerLastSegment) {
            return null;
        }
        const paramIndex = markerIndex + 1;
        const posParams = {
            [paramName]: segments[paramIndex],
        };
        for (let i = 0; i < markerIndex; i++) {
            posParams[`${precedingParamName}${i}`] = segments[i];
        }
        return { consumed: segments.slice(0, paramIndex + 1), posParams };
    };
    if (isDevMode()) {
        matcher['_suffixRouteConfig'] = { marker, paramName, precedingParamName }; // property added for easier debugging of routes
    }
    return matcher;
}
function findLastIndex(elements, predicate) {
    for (let index = elements.length - 1; index >= 0; index--) {
        if (predicate(elements[index])) {
            return index;
        }
    }
    return -1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VmZml4LXVybC1tYXRjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtc3RydWN0dXJlL3JvdXRpbmcvc3VmZml4LXJvdXRlcy9zdWZmaXgtdXJsLW1hdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUM7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxFQUNsQyxNQUFNLEVBQ04sU0FBUyxFQUNULGtCQUFrQixHQUtuQjtJQUNDLGtCQUFrQixHQUFHLGtCQUFrQixJQUFJLE9BQU8sQ0FBQztJQUNuRCxNQUFNLE9BQU8sR0FBRyxTQUFTLGdCQUFnQixDQUN2QyxRQUFzQjtRQUV0QixNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLE1BQU0sbUJBQW1CLEdBQUcsV0FBVyxLQUFLLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRWhFLElBQUksV0FBVyxLQUFLLENBQUMsQ0FBQyxJQUFJLG1CQUFtQixFQUFFO1lBQzdDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLFVBQVUsR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sU0FBUyxHQUFtQztZQUNoRCxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUM7U0FDbEMsQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsU0FBUyxDQUFDLEdBQUcsa0JBQWtCLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEQ7UUFFRCxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUNwRSxDQUFDLENBQUM7SUFFRixJQUFJLFNBQVMsRUFBRSxFQUFFO1FBQ2YsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxnREFBZ0Q7S0FDNUg7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUksUUFBYSxFQUFFLFNBQTZCO0lBQ3BFLEtBQUssSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUN6RCxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM5QixPQUFPLEtBQUssQ0FBQztTQUNkO0tBQ0Y7SUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXJsTWF0Y2hSZXN1bHQsIFVybFNlZ21lbnQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG4vKipcbiAqIE1hdGNoZXMgdGhlIHBhdHRlcm4gJ1sgKiogLyBdIG1hcmtlciAvIDpwYXJhbU5hbWUnXG4gKlxuICogQHBhcmFtIG1hcmtlciBwaHJhc2UgdGhhdCBpbmRpY2F0ZXMgdGhlIHN0YXJ0IG9mIHRoZSBtYXRjaFxuICogQHBhcmFtIHBhcmFtTmFtZSBuYW1lIG9mIHRoZSBwYXJhbWV0ZXIgcHJlc2VudCBhZnRlciB0aGUgbWFya2VyXG4gKiBAcGFyYW0gcHJlY2VkaW5nUGFyYW1OYW1lIG5hbWUgb2YgdGhlIHBhcmFtZXRlciBmb3IgZXZlcnkgcHJlY2VkaW5nIHVybCBzZWdtZW50XG4gKiAgICAgICAgaS5lLiBgcGFyYW1gIHdpbGwgcmVzdWx0IGluIGBwYXJhbTBgLCBgcGFyYW0xYCwgLi4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdWZmaXhVcmxNYXRjaGVyKHtcbiAgbWFya2VyLFxuICBwYXJhbU5hbWUsXG4gIHByZWNlZGluZ1BhcmFtTmFtZSxcbn06IHtcbiAgbWFya2VyOiBzdHJpbmc7XG4gIHBhcmFtTmFtZTogc3RyaW5nO1xuICBwcmVjZWRpbmdQYXJhbU5hbWU/OiBzdHJpbmc7XG59KSB7XG4gIHByZWNlZGluZ1BhcmFtTmFtZSA9IHByZWNlZGluZ1BhcmFtTmFtZSB8fCAncGFyYW0nO1xuICBjb25zdCBtYXRjaGVyID0gZnVuY3Rpb24gc3VmZml4VXJsTWF0Y2hlcihcbiAgICBzZWdtZW50czogVXJsU2VnbWVudFtdXG4gICk6IFVybE1hdGNoUmVzdWx0IHwgbnVsbCB7XG4gICAgY29uc3QgbWFya2VySW5kZXggPSBmaW5kTGFzdEluZGV4KHNlZ21lbnRzLCAoeyBwYXRoIH0pID0+IHBhdGggPT09IG1hcmtlcik7XG4gICAgY29uc3QgaXNNYXJrZXJMYXN0U2VnbWVudCA9IG1hcmtlckluZGV4ID09PSBzZWdtZW50cy5sZW5ndGggLSAxO1xuXG4gICAgaWYgKG1hcmtlckluZGV4ID09PSAtMSB8fCBpc01hcmtlckxhc3RTZWdtZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJhbUluZGV4ID0gbWFya2VySW5kZXggKyAxO1xuICAgIGNvbnN0IHBvc1BhcmFtczogeyBbbmFtZTogc3RyaW5nXTogVXJsU2VnbWVudCB9ID0ge1xuICAgICAgW3BhcmFtTmFtZV06IHNlZ21lbnRzW3BhcmFtSW5kZXhdLFxuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcmtlckluZGV4OyBpKyspIHtcbiAgICAgIHBvc1BhcmFtc1tgJHtwcmVjZWRpbmdQYXJhbU5hbWV9JHtpfWBdID0gc2VnbWVudHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgY29uc3VtZWQ6IHNlZ21lbnRzLnNsaWNlKDAsIHBhcmFtSW5kZXggKyAxKSwgcG9zUGFyYW1zIH07XG4gIH07XG5cbiAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgbWF0Y2hlclsnX3N1ZmZpeFJvdXRlQ29uZmlnJ10gPSB7IG1hcmtlciwgcGFyYW1OYW1lLCBwcmVjZWRpbmdQYXJhbU5hbWUgfTsgLy8gcHJvcGVydHkgYWRkZWQgZm9yIGVhc2llciBkZWJ1Z2dpbmcgb2Ygcm91dGVzXG4gIH1cblxuICByZXR1cm4gbWF0Y2hlcjtcbn1cblxuZnVuY3Rpb24gZmluZExhc3RJbmRleDxUPihlbGVtZW50czogVFtdLCBwcmVkaWNhdGU6IChlbDogVCkgPT4gYm9vbGVhbikge1xuICBmb3IgKGxldCBpbmRleCA9IGVsZW1lbnRzLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICBpZiAocHJlZGljYXRlKGVsZW1lbnRzW2luZGV4XSkpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuIl19