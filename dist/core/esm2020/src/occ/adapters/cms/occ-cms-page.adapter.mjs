/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CMS_PAGE_NORMALIZER } from '../../../cms/connectors/page/converters';
import { PageType, USER_CMS_ENDPOINTS } from '../../../model/cms.model';
import { HOME_PAGE_CONTEXT, SMART_EDIT_CONTEXT, } from '../../../routing/models/page-context.model';
import { UserIdService } from '../../../auth';
import { switchMap } from 'rxjs/operators';
import { FeatureConfigService } from '../../../features-config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../services/occ-endpoints.service";
import * as i3 from "../../../util/converter.service";
export class OccCmsPageAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.userIdService = inject(UserIdService);
        this.featureConfigService = inject(FeatureConfigService);
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }
    /**
     * @override returns the OCC CMS page data for the given context and converts
     * the data by any configured `CMS_PAGE_NORMALIZER`.
     */
    load(pageContext) {
        const params = this.getPagesRequestParams(pageContext);
        // TODO: (CXSPA-4886) Remove flag in the major
        if (this.featureConfigService.isEnabled(USER_CMS_ENDPOINTS)) {
            return this.userIdService.getUserId().pipe(switchMap((userId) => {
                const endpoint = !pageContext.type
                    ? this.occEndpoints.buildUrl('page', {
                        urlParams: { id: pageContext.id, userId },
                    })
                    : this.occEndpoints.buildUrl('pages', {
                        urlParams: { userId },
                        queryParams: params,
                    });
                return this.http.get(endpoint, { headers: this.headers });
            }), this.converter.pipeable(CMS_PAGE_NORMALIZER));
        }
        const endpoint = !pageContext.type
            ? this.occEndpoints.buildUrl('page', {
                urlParams: { id: pageContext.id },
            })
            : this.occEndpoints.buildUrl('pages', {
                queryParams: params,
            });
        return this.http
            .get(endpoint, { headers: this.headers })
            .pipe(this.converter.pipeable(CMS_PAGE_NORMALIZER));
    }
    /**
     * The OCC CMS API allows to query pages by a combination of pageType, label and code.
     *
     * When a `ContentPage` is requested, we use the `pageLabelOrId`:
     *
     * ```
     * "/pages?pageLabelOrId=/my-page&pageType=ContentPage"
     * ```
     *
     * Other pages are queried by code:
     *
     * ```
     * "/pages?code=1234&pageType=ProductPage"
     * ```
     *
     * The page context is ignored for a home page request or in case of a
     * `smartedit-preview` request.
     */
    getPagesRequestParams(context) {
        if (context.id === HOME_PAGE_CONTEXT || context.id === SMART_EDIT_CONTEXT) {
            return {};
        }
        const httpParams = {};
        if (context.type) {
            httpParams.pageType = context.type;
        }
        if (context.type === PageType.CONTENT_PAGE) {
            httpParams.pageLabelOrId = context.id;
        }
        else {
            httpParams.code = context.id;
        }
        return httpParams;
    }
}
OccCmsPageAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCmsPageAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCmsPageAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCmsPageAdapter, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCmsPageAdapter, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i3.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNtcy1wYWdlLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvY21zL29jYy1jbXMtcGFnZS5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHbkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFOUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hFLE9BQU8sRUFDTCxpQkFBaUIsRUFFakIsa0JBQWtCLEdBQ25CLE1BQU0sNENBQTRDLENBQUM7QUFHcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0FBWWhFLE1BQU0sT0FBTyxpQkFBaUI7SUFLNUIsWUFDWSxJQUFnQixFQUNoQixZQUFpQyxFQUNqQyxTQUEyQjtRQUYzQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVBwQixrQkFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0Qyx5QkFBb0IsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3RCxZQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFNM0UsQ0FBQztJQUVKOzs7T0FHRztJQUNILElBQUksQ0FBQyxXQUF3QjtRQUMzQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkQsOENBQThDO1FBQzlDLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQzNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQ3hDLFNBQVMsQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFO2dCQUMzQixNQUFNLFFBQVEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJO29CQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO3dCQUNqQyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUU7cUJBQzFDLENBQUM7b0JBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTt3QkFDbEMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFO3dCQUNyQixXQUFXLEVBQUUsTUFBTTtxQkFDcEIsQ0FBQyxDQUFDO2dCQUVQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQzdDLENBQUM7U0FDSDtRQUNELE1BQU0sUUFBUSxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUk7WUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDakMsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUU7YUFDbEMsQ0FBQztZQUNKLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xDLFdBQVcsRUFBRSxNQUFNO2FBQ3BCLENBQUMsQ0FBQztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDTyxxQkFBcUIsQ0FBQyxPQUFvQjtRQUNsRCxJQUFJLE9BQU8sQ0FBQyxFQUFFLEtBQUssaUJBQWlCLElBQUksT0FBTyxDQUFDLEVBQUUsS0FBSyxrQkFBa0IsRUFBRTtZQUN6RSxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsTUFBTSxVQUFVLEdBQXNCLEVBQUUsQ0FBQztRQUN6QyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDaEIsVUFBVSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDMUMsVUFBVSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxVQUFVLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDOUI7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs4R0FqRlUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBpbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENtc1BhZ2VBZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vY21zL2Nvbm5lY3RvcnMvcGFnZS9jbXMtcGFnZS5hZGFwdGVyJztcbmltcG9ydCB7IENNU19QQUdFX05PUk1BTElaRVIgfSBmcm9tICcuLi8uLi8uLi9jbXMvY29ubmVjdG9ycy9wYWdlL2NvbnZlcnRlcnMnO1xuaW1wb3J0IHsgQ21zU3RydWN0dXJlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9jbXMvbW9kZWwvcGFnZS5tb2RlbCc7XG5pbXBvcnQgeyBQYWdlVHlwZSwgVVNFUl9DTVNfRU5EUE9JTlRTIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWwvY21zLm1vZGVsJztcbmltcG9ydCB7XG4gIEhPTUVfUEFHRV9DT05URVhULFxuICBQYWdlQ29udGV4dCxcbiAgU01BUlRfRURJVF9DT05URVhULFxufSBmcm9tICcuLi8uLi8uLi9yb3V0aW5nL21vZGVscy9wYWdlLWNvbnRleHQubW9kZWwnO1xuaW1wb3J0IHsgQ29udmVydGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWwvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29jYy1lbmRwb2ludHMuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VySWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vYXV0aCc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBGZWF0dXJlQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2ZlYXR1cmVzLWNvbmZpZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT2NjQ21zUGFnZVJlcXVlc3Qge1xuICBwYWdlTGFiZWxPcklkPzogc3RyaW5nO1xuICBwYWdlVHlwZT86IFBhZ2VUeXBlO1xuICBjb2RlPzogc3RyaW5nO1xuICBmaWVsZHM/OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPY2NDbXNQYWdlQWRhcHRlciBpbXBsZW1lbnRzIENtc1BhZ2VBZGFwdGVyIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHVzZXJJZFNlcnZpY2UgPSBpbmplY3QoVXNlcklkU2VydmljZSk7XG4gIHByb3RlY3RlZCByZWFkb25seSBmZWF0dXJlQ29uZmlnU2VydmljZSA9IGluamVjdChGZWF0dXJlQ29uZmlnU2VydmljZSk7XG4gIHByb3RlY3RlZCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCkuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZSByZXR1cm5zIHRoZSBPQ0MgQ01TIHBhZ2UgZGF0YSBmb3IgdGhlIGdpdmVuIGNvbnRleHQgYW5kIGNvbnZlcnRzXG4gICAqIHRoZSBkYXRhIGJ5IGFueSBjb25maWd1cmVkIGBDTVNfUEFHRV9OT1JNQUxJWkVSYC5cbiAgICovXG4gIGxvYWQocGFnZUNvbnRleHQ6IFBhZ2VDb250ZXh0KTogT2JzZXJ2YWJsZTxDbXNTdHJ1Y3R1cmVNb2RlbD4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuZ2V0UGFnZXNSZXF1ZXN0UGFyYW1zKHBhZ2VDb250ZXh0KTtcbiAgICAvLyBUT0RPOiAoQ1hTUEEtNDg4NikgUmVtb3ZlIGZsYWcgaW4gdGhlIG1ham9yXG4gICAgaWYgKHRoaXMuZmVhdHVyZUNvbmZpZ1NlcnZpY2UuaXNFbmFibGVkKFVTRVJfQ01TX0VORFBPSU5UUykpIHtcbiAgICAgIHJldHVybiB0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCh1c2VySWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IGVuZHBvaW50ID0gIXBhZ2VDb250ZXh0LnR5cGVcbiAgICAgICAgICAgID8gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ3BhZ2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsUGFyYW1zOiB7IGlkOiBwYWdlQ29udGV4dC5pZCwgdXNlcklkIH0sXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdwYWdlcycsIHtcbiAgICAgICAgICAgICAgICB1cmxQYXJhbXM6IHsgdXNlcklkIH0sXG4gICAgICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChlbmRwb2ludCwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgIH0pLFxuICAgICAgICB0aGlzLmNvbnZlcnRlci5waXBlYWJsZShDTVNfUEFHRV9OT1JNQUxJWkVSKVxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgZW5kcG9pbnQgPSAhcGFnZUNvbnRleHQudHlwZVxuICAgICAgPyB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgncGFnZScsIHtcbiAgICAgICAgICB1cmxQYXJhbXM6IHsgaWQ6IHBhZ2VDb250ZXh0LmlkIH0sXG4gICAgICAgIH0pXG4gICAgICA6IHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdwYWdlcycsIHtcbiAgICAgICAgICBxdWVyeVBhcmFtczogcGFyYW1zLFxuICAgICAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0KGVuZHBvaW50LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KVxuICAgICAgLnBpcGUodGhpcy5jb252ZXJ0ZXIucGlwZWFibGUoQ01TX1BBR0VfTk9STUFMSVpFUikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBPQ0MgQ01TIEFQSSBhbGxvd3MgdG8gcXVlcnkgcGFnZXMgYnkgYSBjb21iaW5hdGlvbiBvZiBwYWdlVHlwZSwgbGFiZWwgYW5kIGNvZGUuXG4gICAqXG4gICAqIFdoZW4gYSBgQ29udGVudFBhZ2VgIGlzIHJlcXVlc3RlZCwgd2UgdXNlIHRoZSBgcGFnZUxhYmVsT3JJZGA6XG4gICAqXG4gICAqIGBgYFxuICAgKiBcIi9wYWdlcz9wYWdlTGFiZWxPcklkPS9teS1wYWdlJnBhZ2VUeXBlPUNvbnRlbnRQYWdlXCJcbiAgICogYGBgXG4gICAqXG4gICAqIE90aGVyIHBhZ2VzIGFyZSBxdWVyaWVkIGJ5IGNvZGU6XG4gICAqXG4gICAqIGBgYFxuICAgKiBcIi9wYWdlcz9jb2RlPTEyMzQmcGFnZVR5cGU9UHJvZHVjdFBhZ2VcIlxuICAgKiBgYGBcbiAgICpcbiAgICogVGhlIHBhZ2UgY29udGV4dCBpcyBpZ25vcmVkIGZvciBhIGhvbWUgcGFnZSByZXF1ZXN0IG9yIGluIGNhc2Ugb2YgYVxuICAgKiBgc21hcnRlZGl0LXByZXZpZXdgIHJlcXVlc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UGFnZXNSZXF1ZXN0UGFyYW1zKGNvbnRleHQ6IFBhZ2VDb250ZXh0KTogT2NjQ21zUGFnZVJlcXVlc3Qge1xuICAgIGlmIChjb250ZXh0LmlkID09PSBIT01FX1BBR0VfQ09OVEVYVCB8fCBjb250ZXh0LmlkID09PSBTTUFSVF9FRElUX0NPTlRFWFQpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBodHRwUGFyYW1zOiBPY2NDbXNQYWdlUmVxdWVzdCA9IHt9O1xuICAgIGlmIChjb250ZXh0LnR5cGUpIHtcbiAgICAgIGh0dHBQYXJhbXMucGFnZVR5cGUgPSBjb250ZXh0LnR5cGU7XG4gICAgfVxuICAgIGlmIChjb250ZXh0LnR5cGUgPT09IFBhZ2VUeXBlLkNPTlRFTlRfUEFHRSkge1xuICAgICAgaHR0cFBhcmFtcy5wYWdlTGFiZWxPcklkID0gY29udGV4dC5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaHR0cFBhcmFtcy5jb2RlID0gY29udGV4dC5pZDtcbiAgICB9XG5cbiAgICByZXR1cm4gaHR0cFBhcmFtcztcbiAgfVxufVxuIl19