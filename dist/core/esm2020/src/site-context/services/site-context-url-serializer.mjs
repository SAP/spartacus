/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { DefaultUrlSerializer } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "./site-context-params.service";
/**
 * Angular URL Serializer aware of Spartacus site context parameters
 * encoded in the URL.
 */
export class SiteContextUrlSerializer extends DefaultUrlSerializer {
    /**
     * Names of site context parameters encoded in the URL
     */
    get urlEncodingParameters() {
        return this.siteContextParams.getUrlEncodingParameters();
    }
    /**
     * Tells whether any site context parameters should be encoded in the URL
     */
    get hasContextInRoutes() {
        return this.urlEncodingParameters.length > 0;
    }
    constructor(siteContextParams) {
        super();
        this.siteContextParams = siteContextParams;
        /**
         * Splits the URL into 2 parts: path and the query/fragment part
         */
        this.URL_SPLIT = /(^[^#?]*)(.*)/;
    }
    /**
     * @override Recognizes the site context parameters encoded in the prefix segments
     * of the given URL.
     *
     * It returns the UrlTree for the given URL shortened by the recognized params, but saves
     * the params' values in the custom property of UrlTree: `siteContext`.
     */
    parse(url) {
        if (this.hasContextInRoutes) {
            const urlWithParams = this.urlExtractContextParameters(url);
            const parsed = super.parse(urlWithParams.url);
            this.urlTreeIncludeContextParameters(parsed, urlWithParams.params);
            return parsed;
        }
        else {
            return super.parse(url);
        }
    }
    /**
     * Recognizes the site context parameters encoded in the prefix segments of the given URL.
     *
     * It returns the recognized site context params as well as the
     * URL shortened by the recognized params.
     */
    urlExtractContextParameters(url) {
        const [, urlPart, queryPart] = url.match(this.URL_SPLIT) ?? [, '', ''];
        const segments = urlPart?.split('/') ?? [];
        if (segments[0] === '') {
            segments.shift();
        }
        const params = {};
        let paramId = 0;
        let segmentId = 0;
        while (paramId < this.urlEncodingParameters.length &&
            segmentId < segments.length) {
            const paramName = this.urlEncodingParameters[paramId];
            const paramValues = this.siteContextParams.getParamValues(paramName);
            if (paramValues.includes(segments[segmentId])) {
                params[paramName] = segments[segmentId];
                segmentId++;
            }
            paramId++;
        }
        url = segments.slice(segmentId).join('/') + queryPart;
        return { url, params };
    }
    /**
     * Saves the given site context parameters in the custom property
     * of the given UrlTree: `siteContext`.
     */
    urlTreeIncludeContextParameters(urlTree, params) {
        urlTree.siteContext = params;
    }
    /**
     * @override Serializes the given UrlTree to a string and prepends
     *  to it the current values of the site context parameters.
     */
    serialize(tree) {
        const params = this.urlTreeExtractContextParameters(tree);
        const url = super.serialize(tree);
        const serialized = this.urlIncludeContextParameters(url, params);
        return serialized;
    }
    /**
     * Returns the site context parameters stored in the custom property
     * of the UrlTree: `siteContext`.
     */
    urlTreeExtractContextParameters(urlTree) {
        return urlTree.siteContext ? urlTree.siteContext : {};
    }
    /**
     * Prepends the current values of the site context parameters to the given URL.
     */
    urlIncludeContextParameters(url, params) {
        const contextRoutePart = this.urlEncodingParameters
            .map((param) => {
            return params[param]
                ? params[param]
                : this.siteContextParams.getValue(param);
        })
            .join('/');
        return contextRoutePart + url;
    }
}
SiteContextUrlSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextUrlSerializer, deps: [{ token: i1.SiteContextParamsService }], target: i0.ɵɵFactoryTarget.Injectable });
SiteContextUrlSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextUrlSerializer });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextUrlSerializer, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.SiteContextParamsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1jb250ZXh0LXVybC1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvc2l0ZS1jb250ZXh0L3NlcnZpY2VzL3NpdGUtY29udGV4dC11cmwtc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQVcsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBa0JoRTs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsb0JBQW9CO0lBTWhFOztPQUVHO0lBQ0gsSUFBYyxxQkFBcUI7UUFDakMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFjLGtCQUFrQjtRQUM5QixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxZQUFvQixpQkFBMkM7UUFDN0QsS0FBSyxFQUFFLENBQUM7UUFEVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTBCO1FBbkIvRDs7V0FFRztRQUNnQixjQUFTLEdBQVcsZUFBZSxDQUFDO0lBa0J2RCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLEdBQVc7UUFDZixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUEyQixDQUFDO1lBQ3hFLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFD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QUcsR0FBRyxDQUFDO0lBQ2hDLENBQUM7O3FIQWhJVSx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVmYXVsdFVybFNlcmlhbGl6ZXIsIFVybFRyZWUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRQYXJhbXNTZXJ2aWNlIH0gZnJvbSAnLi9zaXRlLWNvbnRleHQtcGFyYW1zLnNlcnZpY2UnO1xuXG4vKipcbiAqIFZhbHVlcyBvZiB0aGUgc2l0ZSBjb250ZXh0IHBhcmFtZXRlcnMgZW5jb2RlZCBpbiB0aGUgVVJMLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNpdGVDb250ZXh0VXJsUGFyYW1zIHtcbiAgW25hbWU6IHN0cmluZ106IHN0cmluZztcbn1cblxuLyoqXG4gKiBVcmxUcmVlIGRlY29yYXRlZCB3aXRoIGEgY3VzdG9tIHByb3BlcnR5IGBzaXRlQ29udGV4dGBcbiAqIGZvciBzdG9yaW5nIHRoZSB2YWx1ZXMgb2YgdGhlIHNpdGUgY29udGV4dCBwYXJhbWV0ZXJzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVybFRyZWVXaXRoU2l0ZUNvbnRleHQgZXh0ZW5kcyBVcmxUcmVlIHtcbiAgc2l0ZUNvbnRleHQ/OiBTaXRlQ29udGV4dFVybFBhcmFtcztcbn1cblxuLyoqXG4gKiBBbmd1bGFyIFVSTCBTZXJpYWxpemVyIGF3YXJlIG9mIFNwYXJ0YWN1cyBzaXRlIGNvbnRleHQgcGFyYW1ldGVyc1xuICogZW5jb2RlZCBpbiB0aGUgVVJMLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2l0ZUNvbnRleHRVcmxTZXJpYWxpemVyIGV4dGVuZHMgRGVmYXVsdFVybFNlcmlhbGl6ZXIge1xuICAvKipcbiAgICogU3BsaXRzIHRoZSBVUkwgaW50byAyIHBhcnRzOiBwYXRoIGFuZCB0aGUgcXVlcnkvZnJhZ21lbnQgcGFydFxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IFVSTF9TUExJVDogUmVnRXhwID0gLyheW14jP10qKSguKikvO1xuXG4gIC8qKlxuICAgKiBOYW1lcyBvZiBzaXRlIGNvbnRleHQgcGFyYW1ldGVycyBlbmNvZGVkIGluIHRoZSBVUkxcbiAgICovXG4gIHByb3RlY3RlZCBnZXQgdXJsRW5jb2RpbmdQYXJhbWV0ZXJzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5zaXRlQ29udGV4dFBhcmFtcy5nZXRVcmxFbmNvZGluZ1BhcmFtZXRlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZWxscyB3aGV0aGVyIGFueSBzaXRlIGNvbnRleHQgcGFyYW1ldGVycyBzaG91bGQgYmUgZW5jb2RlZCBpbiB0aGUgVVJMXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IGhhc0NvbnRleHRJblJvdXRlcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51cmxFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2l0ZUNvbnRleHRQYXJhbXM6IFNpdGVDb250ZXh0UGFyYW1zU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlIFJlY29nbml6ZXMgdGhlIHNpdGUgY29udGV4dCBwYXJhbWV0ZXJzIGVuY29kZWQgaW4gdGhlIHByZWZpeCBzZWdtZW50c1xuICAgKiBvZiB0aGUgZ2l2ZW4gVVJMLlxuICAgKlxuICAgKiBJdCByZXR1cm5zIHRoZSBVcmxUcmVlIGZvciB0aGUgZ2l2ZW4gVVJMIHNob3J0ZW5lZCBieSB0aGUgcmVjb2duaXplZCBwYXJhbXMsIGJ1dCBzYXZlc1xuICAgKiB0aGUgcGFyYW1zJyB2YWx1ZXMgaW4gdGhlIGN1c3RvbSBwcm9wZXJ0eSBvZiBVcmxUcmVlOiBgc2l0ZUNvbnRleHRgLlxuICAgKi9cbiAgcGFyc2UodXJsOiBzdHJpbmcpOiBVcmxUcmVlV2l0aFNpdGVDb250ZXh0IHtcbiAgICBpZiAodGhpcy5oYXNDb250ZXh0SW5Sb3V0ZXMpIHtcbiAgICAgIGNvbnN0IHVybFdpdGhQYXJhbXMgPSB0aGlzLnVybEV4dHJhY3RDb250ZXh0UGFyYW1ldGVycyh1cmwpO1xuICAgICAgY29uc3QgcGFyc2VkID0gc3VwZXIucGFyc2UodXJsV2l0aFBhcmFtcy51cmwpIGFzIFVybFRyZWVXaXRoU2l0ZUNvbnRleHQ7XG4gICAgICB0aGlzLnVybFRyZWVJbmNsdWRlQ29udGV4dFBhcmFtZXRlcnMocGFyc2VkLCB1cmxXaXRoUGFyYW1zLnBhcmFtcyk7XG4gICAgICByZXR1cm4gcGFyc2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3VwZXIucGFyc2UodXJsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVjb2duaXplcyB0aGUgc2l0ZSBjb250ZXh0IHBhcmFtZXRlcnMgZW5jb2RlZCBpbiB0aGUgcHJlZml4IHNlZ21lbnRzIG9mIHRoZSBnaXZlbiBVUkwuXG4gICAqXG4gICAqIEl0IHJldHVybnMgdGhlIHJlY29nbml6ZWQgc2l0ZSBjb250ZXh0IHBhcmFtcyBhcyB3ZWxsIGFzIHRoZVxuICAgKiBVUkwgc2hvcnRlbmVkIGJ5IHRoZSByZWNvZ25pemVkIHBhcmFtcy5cbiAgICovXG4gIHVybEV4dHJhY3RDb250ZXh0UGFyYW1ldGVycyh1cmw6IHN0cmluZyk6IHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBwYXJhbXM6IFNpdGVDb250ZXh0VXJsUGFyYW1zO1xuICB9IHtcbiAgICBjb25zdCBbLCB1cmxQYXJ0LCBxdWVyeVBhcnRdID0gdXJsLm1hdGNoKHRoaXMuVVJMX1NQTElUKSA/PyBbLCAnJywgJyddO1xuXG4gICAgY29uc3Qgc2VnbWVudHMgPSB1cmxQYXJ0Py5zcGxpdCgnLycpID8/IFtdO1xuICAgIGlmIChzZWdtZW50c1swXSA9PT0gJycpIHtcbiAgICAgIHNlZ21lbnRzLnNoaWZ0KCk7XG4gICAgfVxuICAgIGNvbnN0IHBhcmFtczogU2l0ZUNvbnRleHRVcmxQYXJhbXMgPSB7fTtcblxuICAgIGxldCBwYXJhbUlkID0gMDtcbiAgICBsZXQgc2VnbWVudElkID0gMDtcbiAgICB3aGlsZSAoXG4gICAgICBwYXJhbUlkIDwgdGhpcy51cmxFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoICYmXG4gICAgICBzZWdtZW50SWQgPCBzZWdtZW50cy5sZW5ndGhcbiAgICApIHtcbiAgICAgIGNvbnN0IHBhcmFtTmFtZSA9IHRoaXMudXJsRW5jb2RpbmdQYXJhbWV0ZXJzW3BhcmFtSWRdO1xuICAgICAgY29uc3QgcGFyYW1WYWx1ZXMgPSB0aGlzLnNpdGVDb250ZXh0UGFyYW1zLmdldFBhcmFtVmFsdWVzKHBhcmFtTmFtZSk7XG5cbiAgICAgIGlmIChwYXJhbVZhbHVlcy5pbmNsdWRlcyhzZWdtZW50c1tzZWdtZW50SWRdKSkge1xuICAgICAgICBwYXJhbXNbcGFyYW1OYW1lXSA9IHNlZ21lbnRzW3NlZ21lbnRJZF07XG4gICAgICAgIHNlZ21lbnRJZCsrO1xuICAgICAgfVxuICAgICAgcGFyYW1JZCsrO1xuICAgIH1cblxuICAgIHVybCA9IHNlZ21lbnRzLnNsaWNlKHNlZ21lbnRJZCkuam9pbignLycpICsgcXVlcnlQYXJ0O1xuICAgIHJldHVybiB7IHVybCwgcGFyYW1zIH07XG4gIH1cblxuICAvKipcbiAgICogU2F2ZXMgdGhlIGdpdmVuIHNpdGUgY29udGV4dCBwYXJhbWV0ZXJzIGluIHRoZSBjdXN0b20gcHJvcGVydHlcbiAgICogb2YgdGhlIGdpdmVuIFVybFRyZWU6IGBzaXRlQ29udGV4dGAuXG4gICAqL1xuICBwcm90ZWN0ZWQgdXJsVHJlZUluY2x1ZGVDb250ZXh0UGFyYW1ldGVycyhcbiAgICB1cmxUcmVlOiBVcmxUcmVlV2l0aFNpdGVDb250ZXh0LFxuICAgIHBhcmFtczogU2l0ZUNvbnRleHRVcmxQYXJhbXNcbiAgKTogdm9pZCB7XG4gICAgdXJsVHJlZS5zaXRlQ29udGV4dCA9IHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGUgU2VyaWFsaXplcyB0aGUgZ2l2ZW4gVXJsVHJlZSB0byBhIHN0cmluZyBhbmQgcHJlcGVuZHNcbiAgICogIHRvIGl0IHRoZSBjdXJyZW50IHZhbHVlcyBvZiB0aGUgc2l0ZSBjb250ZXh0IHBhcmFtZXRlcnMuXG4gICAqL1xuICBzZXJpYWxpemUodHJlZTogVXJsVHJlZVdpdGhTaXRlQ29udGV4dCk6IHN0cmluZyB7XG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy51cmxUcmVlRXh0cmFjdENvbnRleHRQYXJhbWV0ZXJzKHRyZWUpO1xuICAgIGNvbnN0IHVybCA9IHN1cGVyLnNlcmlhbGl6ZSh0cmVlKTtcbiAgICBjb25zdCBzZXJpYWxpemVkID0gdGhpcy51cmxJbmNsdWRlQ29udGV4dFBhcmFtZXRlcnModXJsLCBwYXJhbXMpO1xuICAgIHJldHVybiBzZXJpYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNpdGUgY29udGV4dCBwYXJhbWV0ZXJzIHN0b3JlZCBpbiB0aGUgY3VzdG9tIHByb3BlcnR5XG4gICAqIG9mIHRoZSBVcmxUcmVlOiBgc2l0ZUNvbnRleHRgLlxuICAgKi9cbiAgdXJsVHJlZUV4dHJhY3RDb250ZXh0UGFyYW1ldGVycyhcbiAgICB1cmxUcmVlOiBVcmxUcmVlV2l0aFNpdGVDb250ZXh0XG4gICk6IFNpdGVDb250ZXh0VXJsUGFyYW1zIHtcbiAgICByZXR1cm4gdXJsVHJlZS5zaXRlQ29udGV4dCA/IHVybFRyZWUuc2l0ZUNvbnRleHQgOiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwZW5kcyB0aGUgY3VycmVudCB2YWx1ZXMgb2YgdGhlIHNpdGUgY29udGV4dCBwYXJhbWV0ZXJzIHRvIHRoZSBnaXZlbiBVUkwuXG4gICAqL1xuICBwcm90ZWN0ZWQgdXJsSW5jbHVkZUNvbnRleHRQYXJhbWV0ZXJzKFxuICAgIHVybDogc3RyaW5nLFxuICAgIHBhcmFtczogU2l0ZUNvbnRleHRVcmxQYXJhbXNcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb250ZXh0Um91dGVQYXJ0ID0gdGhpcy51cmxFbmNvZGluZ1BhcmFtZXRlcnNcbiAgICAgIC5tYXAoKHBhcmFtKSA9PiB7XG4gICAgICAgIHJldHVybiBwYXJhbXNbcGFyYW1dXG4gICAgICAgICAgPyBwYXJhbXNbcGFyYW1dXG4gICAgICAgICAgOiB0aGlzLnNpdGVDb250ZXh0UGFyYW1zLmdldFZhbHVlKHBhcmFtKTtcbiAgICAgIH0pXG4gICAgICAuam9pbignLycpO1xuXG4gICAgcmV0dXJuIGNvbnRleHRSb3V0ZVBhcnQgKyB1cmw7XG4gIH1cbn1cbiJdfQ==