/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { filter, map, take } from 'rxjs/operators';
import { BASE_SITE_CONTEXT_ID, CURRENCY_CONTEXT_ID, LANGUAGE_CONTEXT_ID, THEME_CONTEXT_ID, } from '../../providers/context-ids';
import * as i0 from "@angular/core";
import * as i1 from "../../facade/base-site.service";
import * as i2 from "../../../util/java-reg-exp-converter/java-reg-exp-converter";
import * as i3 from "../../../window/window-ref";
export class SiteContextConfigInitializer {
    constructor(baseSiteService, javaRegExpConverter, winRef) {
        this.baseSiteService = baseSiteService;
        this.javaRegExpConverter = javaRegExpConverter;
        this.winRef = winRef;
        this.scopes = ['context'];
        this.configFactory = () => this.resolveConfig().toPromise();
    }
    get currentUrl() {
        return this.winRef.location.href;
    }
    /**
     * Emits the site context config basing on the current base site data.
     *
     * Completes after emitting the value.
     */
    resolveConfig() {
        return this.baseSiteService.getAll().pipe(map((baseSites) => baseSites?.find((site) => this.isCurrentBaseSite(site))), filter((baseSite) => {
            if (!baseSite) {
                throw new Error(`Error: Cannot get base site config! Current url (${this.currentUrl}) doesn't match any of url patterns of any base sites.`);
            }
            return Boolean(baseSite);
        }), map((baseSite) => this.getConfig(baseSite)), take(1));
    }
    getConfig(source) {
        const result = {
            context: {
                urlParameters: this.getUrlParams(source.urlEncodingAttributes),
                [BASE_SITE_CONTEXT_ID]: [source.uid],
                [LANGUAGE_CONTEXT_ID]: this.getIsoCodes(source.baseStore?.languages, source.defaultLanguage || source.baseStore?.defaultLanguage),
                [CURRENCY_CONTEXT_ID]: this.getIsoCodes(source.baseStore?.currencies, source.baseStore?.defaultCurrency),
                [THEME_CONTEXT_ID]: [source.theme],
            },
        };
        return result;
    }
    isCurrentBaseSite(site) {
        const index = (site.urlPatterns || []).findIndex((javaRegexp) => {
            const jsRegexp = this.javaRegExpConverter.toJsRegExp(javaRegexp);
            if (jsRegexp) {
                const result = jsRegexp.test(this.currentUrl);
                return result;
            }
        });
        return index !== -1;
    }
    /**
     * Returns an array of url encoded site context parameters.
     *
     * It maps the string "storefront" (used in OCC) to the "baseSite" (used in Spartacus)
     */
    getUrlParams(params) {
        const STOREFRONT_PARAM = 'storefront';
        return (params || []).map((param) => param === STOREFRONT_PARAM ? BASE_SITE_CONTEXT_ID : param);
    }
    /**
     * Returns iso codes in a array, where the first element is the default iso code.
     */
    getIsoCodes(elements, defaultElement) {
        if (elements && defaultElement) {
            const result = this.moveToFirst(elements, (el) => el.isocode === defaultElement.isocode).map((el) => el.isocode);
            return result;
        }
    }
    /**
     * Moves to the start of the array the first element that satisfies the given predicate.
     *
     * @param array array to modify
     * @param predicate function called on elements
     */
    moveToFirst(array, predicate) {
        array = [...array];
        const index = array.findIndex(predicate);
        if (index !== -1) {
            const [el] = array.splice(index, 1);
            array.unshift(el);
        }
        return array;
    }
}
SiteContextConfigInitializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextConfigInitializer, deps: [{ token: i1.BaseSiteService }, { token: i2.JavaRegExpConverter }, { token: i3.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
SiteContextConfigInitializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextConfigInitializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextConfigInitializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.BaseSiteService }, { type: i2.JavaRegExpConverter }, { type: i3.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1jb250ZXh0LWNvbmZpZy1pbml0aWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3NpdGUtY29udGV4dC9jb25maWcvY29uZmlnLWxvYWRlci9zaXRlLWNvbnRleHQtY29uZmlnLWluaXRpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTW5ELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQixnQkFBZ0IsR0FDakIsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7QUFJckMsTUFBTSxPQUFPLDRCQUE0QjtJQUl2QyxZQUNZLGVBQWdDLEVBQ2hDLG1CQUF3QyxFQUN4QyxNQUFpQjtRQUZqQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBTnBCLFdBQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JCLGtCQUFhLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBTTdELENBQUM7SUFFSixJQUFZLFVBQVU7UUFDcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFjLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxhQUFhO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQ3ZDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQ2hCLFNBQVMsRUFBRSxJQUFJ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QyxLQUFZLEVBQUUsU0FBK0I7UUFDL0QsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNuQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzt5SEFoSFUsNEJBQTRCOzZIQUE1Qiw0QkFBNEIsY0FEZixNQUFNOzJGQUNuQiw0QkFBNEI7a0JBRHhDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWdJbml0aWFsaXplciB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZy9jb25maWctaW5pdGlhbGl6ZXIvY29uZmlnLWluaXRpYWxpemVyJztcbmltcG9ydCB7IEJhc2VTaXRlIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWwvbWlzYy5tb2RlbCc7XG5pbXBvcnQgeyBKYXZhUmVnRXhwQ29udmVydGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9qYXZhLXJlZy1leHAtY29udmVydGVyL2phdmEtcmVnLWV4cC1jb252ZXJ0ZXInO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnLi4vLi4vLi4vd2luZG93L3dpbmRvdy1yZWYnO1xuaW1wb3J0IHsgQmFzZVNpdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZmFjYWRlL2Jhc2Utc2l0ZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIEJBU0VfU0lURV9DT05URVhUX0lELFxuICBDVVJSRU5DWV9DT05URVhUX0lELFxuICBMQU5HVUFHRV9DT05URVhUX0lELFxuICBUSEVNRV9DT05URVhUX0lELFxufSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY29udGV4dC1pZHMnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRDb25maWcgfSBmcm9tICcuLi9zaXRlLWNvbnRleHQtY29uZmlnJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBTaXRlQ29udGV4dENvbmZpZ0luaXRpYWxpemVyIGltcGxlbWVudHMgQ29uZmlnSW5pdGlhbGl6ZXIge1xuICByZWFkb25seSBzY29wZXMgPSBbJ2NvbnRleHQnXTtcbiAgcmVhZG9ubHkgY29uZmlnRmFjdG9yeSA9ICgpID0+IHRoaXMucmVzb2x2ZUNvbmZpZygpLnRvUHJvbWlzZSgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBiYXNlU2l0ZVNlcnZpY2U6IEJhc2VTaXRlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgamF2YVJlZ0V4cENvbnZlcnRlcjogSmF2YVJlZ0V4cENvbnZlcnRlcixcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWZcbiAgKSB7fVxuXG4gIHByaXZhdGUgZ2V0IGN1cnJlbnRVcmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy53aW5SZWYubG9jYXRpb24uaHJlZiBhcyBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgdGhlIHNpdGUgY29udGV4dCBjb25maWcgYmFzaW5nIG9uIHRoZSBjdXJyZW50IGJhc2Ugc2l0ZSBkYXRhLlxuICAgKlxuICAgKiBDb21wbGV0ZXMgYWZ0ZXIgZW1pdHRpbmcgdGhlIHZhbHVlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlc29sdmVDb25maWcoKTogT2JzZXJ2YWJsZTxTaXRlQ29udGV4dENvbmZpZz4ge1xuICAgIHJldHVybiB0aGlzLmJhc2VTaXRlU2VydmljZS5nZXRBbGwoKS5waXBlKFxuICAgICAgbWFwKChiYXNlU2l0ZXMpID0+XG4gICAgICAgIGJhc2VTaXRlcz8uZmluZCgoc2l0ZSkgPT4gdGhpcy5pc0N1cnJlbnRCYXNlU2l0ZShzaXRlKSlcbiAgICAgICksXG4gICAgICBmaWx0ZXIoKGJhc2VTaXRlOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFiYXNlU2l0ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBFcnJvcjogQ2Fubm90IGdldCBiYXNlIHNpdGUgY29uZmlnISBDdXJyZW50IHVybCAoJHt0aGlzLmN1cnJlbnRVcmx9KSBkb2Vzbid0IG1hdGNoIGFueSBvZiB1cmwgcGF0dGVybnMgb2YgYW55IGJhc2Ugc2l0ZXMuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oYmFzZVNpdGUpO1xuICAgICAgfSksXG4gICAgICBtYXAoKGJhc2VTaXRlKSA9PiB0aGlzLmdldENvbmZpZyhiYXNlU2l0ZSkpLFxuICAgICAgdGFrZSgxKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q29uZmlnKHNvdXJjZTogQmFzZVNpdGUpOiBTaXRlQ29udGV4dENvbmZpZyB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgY29udGV4dDoge1xuICAgICAgICB1cmxQYXJhbWV0ZXJzOiB0aGlzLmdldFVybFBhcmFtcyhzb3VyY2UudXJsRW5jb2RpbmdBdHRyaWJ1dGVzKSxcbiAgICAgICAgW0JBU0VfU0lURV9DT05URVhUX0lEXTogW3NvdXJjZS51aWRdLFxuICAgICAgICBbTEFOR1VBR0VfQ09OVEVYVF9JRF06IHRoaXMuZ2V0SXNvQ29kZXMoXG4gICAgICAgICAgc291cmNlLmJhc2VTdG9yZT8ubGFuZ3VhZ2VzLFxuICAgICAgICAgIHNvdXJjZS5kZWZhdWx0TGFuZ3VhZ2UgfHwgc291cmNlLmJhc2VTdG9yZT8uZGVmYXVsdExhbmd1YWdlXG4gICAgICAgICksXG4gICAgICAgIFtDVVJSRU5DWV9DT05URVhUX0lEXTogdGhpcy5nZXRJc29Db2RlcyhcbiAgICAgICAgICBzb3VyY2UuYmFzZVN0b3JlPy5jdXJyZW5jaWVzLFxuICAgICAgICAgIHNvdXJjZS5iYXNlU3RvcmU/LmRlZmF1bHRDdXJyZW5jeVxuICAgICAgICApLFxuICAgICAgICBbVEhFTUVfQ09OVEVYVF9JRF06IFtzb3VyY2UudGhlbWVdLFxuICAgICAgfSxcbiAgICB9IGFzIFNpdGVDb250ZXh0Q29uZmlnO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgaXNDdXJyZW50QmFzZVNpdGUoc2l0ZTogQmFzZVNpdGUpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbmRleCA9IChzaXRlLnVybFBhdHRlcm5zIHx8IFtdKS5maW5kSW5kZXgoKGphdmFSZWdleHA6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QganNSZWdleHAgPSB0aGlzLmphdmFSZWdFeHBDb252ZXJ0ZXIudG9Kc1JlZ0V4cChqYXZhUmVnZXhwKTtcbiAgICAgIGlmIChqc1JlZ2V4cCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBqc1JlZ2V4cC50ZXN0KHRoaXMuY3VycmVudFVybCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5kZXggIT09IC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgdXJsIGVuY29kZWQgc2l0ZSBjb250ZXh0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEl0IG1hcHMgdGhlIHN0cmluZyBcInN0b3JlZnJvbnRcIiAodXNlZCBpbiBPQ0MpIHRvIHRoZSBcImJhc2VTaXRlXCIgKHVzZWQgaW4gU3BhcnRhY3VzKVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRVcmxQYXJhbXMocGFyYW1zOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBTVE9SRUZST05UX1BBUkFNID0gJ3N0b3JlZnJvbnQnO1xuXG4gICAgcmV0dXJuIChwYXJhbXMgfHwgW10pLm1hcCgocGFyYW0pID0+XG4gICAgICBwYXJhbSA9PT0gU1RPUkVGUk9OVF9QQVJBTSA/IEJBU0VfU0lURV9DT05URVhUX0lEIDogcGFyYW1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaXNvIGNvZGVzIGluIGEgYXJyYXksIHdoZXJlIHRoZSBmaXJzdCBlbGVtZW50IGlzIHRoZSBkZWZhdWx0IGlzbyBjb2RlLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJc29Db2RlcyhcbiAgICBlbGVtZW50czogeyBpc29jb2RlPzogc3RyaW5nIH1bXSB8IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0RWxlbWVudDogeyBpc29jb2RlPzogc3RyaW5nIH0gfCB1bmRlZmluZWRcbiAgKSB7XG4gICAgaWYgKGVsZW1lbnRzICYmIGRlZmF1bHRFbGVtZW50KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0aGlzLm1vdmVUb0ZpcnN0KFxuICAgICAgICBlbGVtZW50cyxcbiAgICAgICAgKGVsKSA9PiBlbC5pc29jb2RlID09PSBkZWZhdWx0RWxlbWVudC5pc29jb2RlXG4gICAgICApLm1hcCgoZWwpID0+IGVsLmlzb2NvZGUpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIHN0YXJ0IG9mIHRoZSBhcnJheSB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IHNhdGlzZmllcyB0aGUgZ2l2ZW4gcHJlZGljYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gYXJyYXkgYXJyYXkgdG8gbW9kaWZ5XG4gICAqIEBwYXJhbSBwcmVkaWNhdGUgZnVuY3Rpb24gY2FsbGVkIG9uIGVsZW1lbnRzXG4gICAqL1xuICBwcml2YXRlIG1vdmVUb0ZpcnN0KGFycmF5OiBhbnlbXSwgcHJlZGljYXRlOiAoZWw6IGFueSkgPT4gYm9vbGVhbik6IGFueVtdIHtcbiAgICBhcnJheSA9IFsuLi5hcnJheV07XG4gICAgY29uc3QgaW5kZXggPSBhcnJheS5maW5kSW5kZXgocHJlZGljYXRlKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBbZWxdID0gYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGFycmF5LnVuc2hpZnQoZWwpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cbn1cbiJdfQ==