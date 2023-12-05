import { Injectable } from '@angular/core';
import { CURRENCY_CONTEXT_ID, LANGUAGE_CONTEXT_ID, getContextParameterDefault, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class SiteContextInterceptor {
    constructor(languageService, currencyService, occEndpoints, config) {
        this.languageService = languageService;
        this.currencyService = currencyService;
        this.occEndpoints = occEndpoints;
        this.config = config;
        this.activeLang = getContextParameterDefault(this.config, LANGUAGE_CONTEXT_ID);
        this.activeCurr = getContextParameterDefault(this.config, CURRENCY_CONTEXT_ID);
        this.languageService
            .getActive()
            .subscribe((data) => (this.activeLang = data));
        this.currencyService.getActive().subscribe((data) => {
            this.activeCurr = data;
        });
    }
    intercept(request, next) {
        if (request.url.includes(this.occEndpoints.getBaseUrl({ prefix: false, baseSite: false })) &&
            request.url.includes('/assistedservicewebservices/')) {
            request = request.clone({
                setParams: {
                    lang: this.activeLang ?? '',
                    curr: this.activeCurr ?? '',
                },
            });
        }
        return next.handle(request);
    }
}
SiteContextInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextInterceptor, deps: [{ token: i1.LanguageService }, { token: i1.CurrencyService }, { token: i1.OccEndpointsService }, { token: i1.SiteContextConfig }], target: i0.ɵɵFactoryTarget.Injectable });
SiteContextInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.LanguageService }, { type: i1.CurrencyService }, { type: i1.OccEndpointsService }, { type: i1.SiteContextConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1jb250ZXh0LmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jdXN0b21lci0zNjAvcm9vdC9pbnRlcmNlcHRvcnMvc2l0ZS1jb250ZXh0LmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVlBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLG1CQUFtQixFQUVuQixtQkFBbUIsRUFJbkIsMEJBQTBCLEdBQzNCLE1BQU0saUJBQWlCLENBQUM7OztBQUl6QixNQUFNLE9BQU8sc0JBQXNCO0lBSWpDLFlBQ1UsZUFBZ0MsRUFDaEMsZUFBZ0MsRUFDaEMsWUFBaUMsRUFDakMsTUFBeUI7UUFIekIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFFakMsSUFBSSxDQUFDLFVBQVUsR0FBRywwQkFBMEIsQ0FDMUMsSUFBSSxDQUFDLE1BQU0sRUFDWCxtQkFBbUIsQ0FDcEIsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsMEJBQTBCLENBQzFDLElBQUksQ0FBQyxNQUFNLEVBQ1gsbUJBQW1CLENBQ3BCLENBQUM7UUFFRixJQUFJLENBQUMsZUFBZTthQUNqQixTQUFTLEVBQUU7YUFDWCxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUNQLE9BQTZCLEVBQzdCLElBQWlCO1FBRWpCLElBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FDakU7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxFQUNwRDtZQUNBLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUN0QixTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRTtvQkFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRTtpQkFDNUI7YUFDRixDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDOzttSEE5Q1Usc0JBQXNCO3VIQUF0QixzQkFBc0IsY0FEVCxNQUFNOzJGQUNuQixzQkFBc0I7a0JBRGxDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwUmVxdWVzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ1VSUkVOQ1lfQ09OVEVYVF9JRCxcbiAgQ3VycmVuY3lTZXJ2aWNlLFxuICBMQU5HVUFHRV9DT05URVhUX0lELFxuICBMYW5ndWFnZVNlcnZpY2UsXG4gIE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gIFNpdGVDb250ZXh0Q29uZmlnLFxuICBnZXRDb250ZXh0UGFyYW1ldGVyRGVmYXVsdCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBTaXRlQ29udGV4dEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgYWN0aXZlTGFuZzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBhY3RpdmVDdXJyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcbiAgICBwcml2YXRlIGN1cnJlbmN5U2VydmljZTogQ3VycmVuY3lTZXJ2aWNlLFxuICAgIHByaXZhdGUgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29uZmlnOiBTaXRlQ29udGV4dENvbmZpZ1xuICApIHtcbiAgICB0aGlzLmFjdGl2ZUxhbmcgPSBnZXRDb250ZXh0UGFyYW1ldGVyRGVmYXVsdChcbiAgICAgIHRoaXMuY29uZmlnLFxuICAgICAgTEFOR1VBR0VfQ09OVEVYVF9JRFxuICAgICk7XG4gICAgdGhpcy5hY3RpdmVDdXJyID0gZ2V0Q29udGV4dFBhcmFtZXRlckRlZmF1bHQoXG4gICAgICB0aGlzLmNvbmZpZyxcbiAgICAgIENVUlJFTkNZX0NPTlRFWFRfSURcbiAgICApO1xuXG4gICAgdGhpcy5sYW5ndWFnZVNlcnZpY2VcbiAgICAgIC5nZXRBY3RpdmUoKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4gKHRoaXMuYWN0aXZlTGFuZyA9IGRhdGEpKTtcblxuICAgIHRoaXMuY3VycmVuY3lTZXJ2aWNlLmdldEFjdGl2ZSgpLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmVDdXJyID0gZGF0YTtcbiAgICB9KTtcbiAgfVxuXG4gIGludGVyY2VwdChcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDx1bmtub3duPixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDx1bmtub3duPj4ge1xuICAgIGlmIChcbiAgICAgIHJlcXVlc3QudXJsLmluY2x1ZGVzKFxuICAgICAgICB0aGlzLm9jY0VuZHBvaW50cy5nZXRCYXNlVXJsKHsgcHJlZml4OiBmYWxzZSwgYmFzZVNpdGU6IGZhbHNlIH0pXG4gICAgICApICYmXG4gICAgICByZXF1ZXN0LnVybC5pbmNsdWRlcygnL2Fzc2lzdGVkc2VydmljZXdlYnNlcnZpY2VzLycpXG4gICAgKSB7XG4gICAgICByZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSh7XG4gICAgICAgIHNldFBhcmFtczoge1xuICAgICAgICAgIGxhbmc6IHRoaXMuYWN0aXZlTGFuZyA/PyAnJyxcbiAgICAgICAgICBjdXJyOiB0aGlzLmFjdGl2ZUN1cnIgPz8gJycsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xuICB9XG59XG4iXX0=