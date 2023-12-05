/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../config/page-meta.config";
import * as i2 from "../../../window/window-ref";
/**
 * Service to add links to the page meta data, such canonical URLs.
 */
export class PageLinkService {
    constructor(pageMetaConfig, winRef) {
        this.pageMetaConfig = pageMetaConfig;
        this.winRef = winRef;
    }
    /**
     * Returns the canonical for the page.
     *
     * The canonical url is created by the help of the default `CanonicalUrlOptions` from
     * the pageMeta options. The options can be further adjusted by the options argument.
     */
    getCanonicalUrl(options, url) {
        const config = {
            ...this.pageMetaConfig?.pageMeta?.canonicalUrl,
            ...options,
        };
        return this.buildCanonicalUrl(url ?? this.winRef.location.href ?? '', config);
    }
    buildCanonicalUrl(url, options) {
        if (options.forceHttps) {
            url = url.replace(/^http(?!s):/i, 'https:');
        }
        if (options.forceWww) {
            // this will not allow for not adding wwww. in case of a subdomain
            url = url.replace(/^(https?:\/\/)(?!www\.)(.*)/i, '$1www.$2');
        }
        if (options.removeQueryParams) {
            url = this.removeQueryParams(url, options);
        }
        if (options.forceTrailingSlash) {
            url = url.replace(/^([^\?]+[^\/\?]$)$/i, '$1/');
        }
        return url;
    }
    removeQueryParams(url, config) {
        const queryPos = url.indexOf('?');
        if (queryPos > -1) {
            const urlBeforeQueryParam = url.substring(0, queryPos);
            const params = new URLSearchParams(url.substring(queryPos));
            url = urlBeforeQueryParam;
            if (Array.isArray(config.removeQueryParams)) {
                config.removeQueryParams.forEach((param) => {
                    params.delete(param);
                });
                if (params.toString().length > 0) {
                    url = `${urlBeforeQueryParam}?${params.toString()}`;
                }
            }
        }
        return url;
    }
}
PageLinkService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageLinkService, deps: [{ token: i1.PageMetaConfig }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
PageLinkService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageLinkService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageLinkService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.PageMetaConfig }, { type: i2.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1saW5rLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9jbXMvcGFnZS9yb3V0aW5nL3BhZ2UtbGluay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBTzNDOztHQUVHO0FBRUgsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFDWSxjQUE4QixFQUM5QixNQUFpQjtRQURqQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztJQUMxQixDQUFDO0lBRUo7Ozs7O09BS0c7SUFDSCxlQUFlLENBQUMsT0FBNkIsRUFBRSxHQUFZO1FBQ3pELE1BQU0sTUFBTSxHQUF3QjtZQUNsQyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLFlBQVk7WUFDOUMsR0FBRyxPQUFPO1NBQ1gsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUMzQixHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFDdEMsTUFBTSxDQUNQLENBQUM7SUFDSixDQUFDO0lBRVMsaUJBQWlCLENBQ3pCLEdBQVcsRUFDWCxPQUE0QjtRQUU1QixJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDdEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3BCLGtFQUFrRTtZQUNsRSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUMvRDtRQUVELElBQUksT0FBTyxDQUFDLGlCQUFpQixFQUFFO1lBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzVDO1FBRUQsSUFBSSxPQUFPLENBQUMsa0JBQWtCLEVBQUU7WUFDOUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFUyxpQkFBaUIsQ0FDekIsR0FBVyxFQUNYLE1BQTJCO1FBRTNCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDakIsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN2RCxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFNUQsR0FBRyxHQUFHLG1CQUFtQixDQUFDO1lBRTFCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDM0MsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNoQyxHQUFHLEdBQUcsR0FBRyxtQkFBbUIsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztpQkFDckQ7YUFDRjtTQUNGO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOzs0R0FwRVUsZUFBZTtnSEFBZixlQUFlLGNBREYsTUFBTTsyRkFDbkIsZUFBZTtrQkFEM0IsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi8uLi93aW5kb3cvd2luZG93LXJlZic7XG5pbXBvcnQge1xuICBDYW5vbmljYWxVcmxPcHRpb25zLFxuICBQYWdlTWV0YUNvbmZpZyxcbn0gZnJvbSAnLi4vY29uZmlnL3BhZ2UtbWV0YS5jb25maWcnO1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gYWRkIGxpbmtzIHRvIHRoZSBwYWdlIG1ldGEgZGF0YSwgc3VjaCBjYW5vbmljYWwgVVJMcy5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBQYWdlTGlua1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcGFnZU1ldGFDb25maWc6IFBhZ2VNZXRhQ29uZmlnLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZlxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNhbm9uaWNhbCBmb3IgdGhlIHBhZ2UuXG4gICAqXG4gICAqIFRoZSBjYW5vbmljYWwgdXJsIGlzIGNyZWF0ZWQgYnkgdGhlIGhlbHAgb2YgdGhlIGRlZmF1bHQgYENhbm9uaWNhbFVybE9wdGlvbnNgIGZyb21cbiAgICogdGhlIHBhZ2VNZXRhIG9wdGlvbnMuIFRoZSBvcHRpb25zIGNhbiBiZSBmdXJ0aGVyIGFkanVzdGVkIGJ5IHRoZSBvcHRpb25zIGFyZ3VtZW50LlxuICAgKi9cbiAgZ2V0Q2Fub25pY2FsVXJsKG9wdGlvbnM/OiBDYW5vbmljYWxVcmxPcHRpb25zLCB1cmw/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbmZpZzogQ2Fub25pY2FsVXJsT3B0aW9ucyA9IHtcbiAgICAgIC4uLnRoaXMucGFnZU1ldGFDb25maWc/LnBhZ2VNZXRhPy5jYW5vbmljYWxVcmwsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuYnVpbGRDYW5vbmljYWxVcmwoXG4gICAgICB1cmwgPz8gdGhpcy53aW5SZWYubG9jYXRpb24uaHJlZiA/PyAnJyxcbiAgICAgIGNvbmZpZ1xuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYnVpbGRDYW5vbmljYWxVcmwoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb3B0aW9uczogQ2Fub25pY2FsVXJsT3B0aW9uc1xuICApOiBzdHJpbmcge1xuICAgIGlmIChvcHRpb25zLmZvcmNlSHR0cHMpIHtcbiAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9eaHR0cCg/IXMpOi9pLCAnaHR0cHM6Jyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZm9yY2VXd3cpIHtcbiAgICAgIC8vIHRoaXMgd2lsbCBub3QgYWxsb3cgZm9yIG5vdCBhZGRpbmcgd3d3dy4gaW4gY2FzZSBvZiBhIHN1YmRvbWFpblxuICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL14oaHR0cHM/OlxcL1xcLykoPyF3d3dcXC4pKC4qKS9pLCAnJDF3d3cuJDInKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5yZW1vdmVRdWVyeVBhcmFtcykge1xuICAgICAgdXJsID0gdGhpcy5yZW1vdmVRdWVyeVBhcmFtcyh1cmwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmZvcmNlVHJhaWxpbmdTbGFzaCkge1xuICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL14oW15cXD9dK1teXFwvXFw/XSQpJC9pLCAnJDEvJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmVRdWVyeVBhcmFtcyhcbiAgICB1cmw6IHN0cmluZyxcbiAgICBjb25maWc6IENhbm9uaWNhbFVybE9wdGlvbnNcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBxdWVyeVBvcyA9IHVybC5pbmRleE9mKCc/Jyk7XG4gICAgaWYgKHF1ZXJ5UG9zID4gLTEpIHtcbiAgICAgIGNvbnN0IHVybEJlZm9yZVF1ZXJ5UGFyYW0gPSB1cmwuc3Vic3RyaW5nKDAsIHF1ZXJ5UG9zKTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXModXJsLnN1YnN0cmluZyhxdWVyeVBvcykpO1xuXG4gICAgICB1cmwgPSB1cmxCZWZvcmVRdWVyeVBhcmFtO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcucmVtb3ZlUXVlcnlQYXJhbXMpKSB7XG4gICAgICAgIGNvbmZpZy5yZW1vdmVRdWVyeVBhcmFtcy5mb3JFYWNoKChwYXJhbSkgPT4ge1xuICAgICAgICAgIHBhcmFtcy5kZWxldGUocGFyYW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHBhcmFtcy50b1N0cmluZygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB1cmwgPSBgJHt1cmxCZWZvcmVRdWVyeVBhcmFtfT8ke3BhcmFtcy50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbiAgfVxufVxuIl19