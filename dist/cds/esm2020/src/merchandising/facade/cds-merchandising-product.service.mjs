/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../connectors";
import * as i2 from "./cds-merchandising-user-context.service";
import * as i3 from "./cds-merchandising-site-context.service";
export class CdsMerchandisingProductService {
    constructor(strategyConnector, merchandisingUserContextService, merchandisingSiteContextService) {
        this.strategyConnector = strategyConnector;
        this.merchandisingUserContextService = merchandisingUserContextService;
        this.merchandisingSiteContextService = merchandisingSiteContextService;
    }
    loadProductsForStrategy(strategyId, numberToDisplay) {
        return combineLatest([
            this.merchandisingSiteContextService.getSiteContext(),
            this.merchandisingUserContextService.getUserContext(),
        ]).pipe(debounceTime(0), map(([siteContext, userContext]) => {
            return {
                queryParams: {
                    ...siteContext,
                    products: userContext.products,
                    category: userContext.category,
                    facets: userContext.facets,
                    searchPhrase: userContext.searchPhrase,
                    pageSize: numberToDisplay,
                },
                headers: {
                    consentReference: userContext.consentReference,
                },
            };
        }), mergeMap((request) => this.strategyConnector
            .loadProductsForStrategy(strategyId, request)
            .pipe(map((products) => ({ request, products })))));
    }
}
CdsMerchandisingProductService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingProductService, deps: [{ token: i1.MerchandisingStrategyConnector }, { token: i2.CdsMerchandisingUserContextService }, { token: i3.CdsMerchandisingSiteContextService }], target: i0.ɵɵFactoryTarget.Injectable });
CdsMerchandisingProductService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingProductService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingProductService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.MerchandisingStrategyConnector }, { type: i2.CdsMerchandisingUserContextService }, { type: i3.CdsMerchandisingSiteContextService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RzLW1lcmNoYW5kaXNpbmctcHJvZHVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZHMvc3JjL21lcmNoYW5kaXNpbmcvZmFjYWRlL2Nkcy1tZXJjaGFuZGlzaW5nLXByb2R1Y3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQWE3RCxNQUFNLE9BQU8sOEJBQThCO0lBQ3pDLFlBQ1ksaUJBQWlELEVBQ2pELCtCQUFtRSxFQUNuRSwrQkFBbUU7UUFGbkUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFnQztRQUNqRCxvQ0FBK0IsR0FBL0IsK0JBQStCLENBQW9DO1FBQ25FLG9DQUErQixHQUEvQiwrQkFBK0IsQ0FBb0M7SUFDNUUsQ0FBQztJQUVKLHVCQUF1QixDQUNyQixVQUFrQixFQUNsQixlQUF3QjtRQUV4QixPQUFPLGFBQWEsQ0FBQztZQUNuQixJQUFJLENBQUMsK0JBQStCLENBQUMsY0FBYyxFQUFFO1lBQ3JELElBQUksQ0FBQywrQkFBK0IsQ0FBQyxjQUFjLEVBQUU7U0FDdEQsQ0FBQyxDQUFDLElBQUksQ0FDTCxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQ2YsR0FBRyxDQUNELENBQUMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUd6QixFQUFFLEVBQUU7WUFDSCxPQUFPO2dCQUNMLFdBQVcsRUFBRTtvQkFDWCxHQUFHLFdBQVc7b0JBRWQsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRO29CQUM5QixRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVE7b0JBQzlCLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTTtvQkFDMUIsWUFBWSxFQUFFLFdBQVcsQ0FBQyxZQUFZO29CQUV0QyxRQUFRLEVBQUUsZUFBZTtpQkFDMUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxnQkFBZ0I7aUJBQy9DO2FBQ0YsQ0FBQztRQUNKLENBQUMsQ0FDRixFQUNELFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ25CLElBQUksQ0FBQyxpQkFBaUI7YUFDbkIsdUJBQXVCLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQzthQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUNwRCxDQUNGLENBQUM7SUFDSixDQUFDOzsySEE1Q1UsOEJBQThCOytIQUE5Qiw4QkFBOEIsY0FGN0IsTUFBTTsyRkFFUCw4QkFBOEI7a0JBSDFDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgTWVyY2hhbmRpc2luZ1VzZXJDb250ZXh0LFxuICBNZXJjaGFuZGlzaW5nU2l0ZUNvbnRleHQsXG4gIFN0cmF0ZWd5UmVzcG9uc2UsXG59IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7IE1lcmNoYW5kaXNpbmdTdHJhdGVneUNvbm5lY3RvciB9IGZyb20gJy4uL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQ2RzTWVyY2hhbmRpc2luZ1NpdGVDb250ZXh0U2VydmljZSB9IGZyb20gJy4vY2RzLW1lcmNoYW5kaXNpbmctc2l0ZS1jb250ZXh0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2RzTWVyY2hhbmRpc2luZ1VzZXJDb250ZXh0U2VydmljZSB9IGZyb20gJy4vY2RzLW1lcmNoYW5kaXNpbmctdXNlci1jb250ZXh0LnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2RzTWVyY2hhbmRpc2luZ1Byb2R1Y3RTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHN0cmF0ZWd5Q29ubmVjdG9yOiBNZXJjaGFuZGlzaW5nU3RyYXRlZ3lDb25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIG1lcmNoYW5kaXNpbmdVc2VyQ29udGV4dFNlcnZpY2U6IENkc01lcmNoYW5kaXNpbmdVc2VyQ29udGV4dFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG1lcmNoYW5kaXNpbmdTaXRlQ29udGV4dFNlcnZpY2U6IENkc01lcmNoYW5kaXNpbmdTaXRlQ29udGV4dFNlcnZpY2VcbiAgKSB7fVxuXG4gIGxvYWRQcm9kdWN0c0ZvclN0cmF0ZWd5KFxuICAgIHN0cmF0ZWd5SWQ6IHN0cmluZyxcbiAgICBudW1iZXJUb0Rpc3BsYXk/OiBudW1iZXJcbiAgKTogT2JzZXJ2YWJsZTxTdHJhdGVneVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5tZXJjaGFuZGlzaW5nU2l0ZUNvbnRleHRTZXJ2aWNlLmdldFNpdGVDb250ZXh0KCksXG4gICAgICB0aGlzLm1lcmNoYW5kaXNpbmdVc2VyQ29udGV4dFNlcnZpY2UuZ2V0VXNlckNvbnRleHQoKSxcbiAgICBdKS5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDApLFxuICAgICAgbWFwKFxuICAgICAgICAoW3NpdGVDb250ZXh0LCB1c2VyQ29udGV4dF06IFtcbiAgICAgICAgICBNZXJjaGFuZGlzaW5nU2l0ZUNvbnRleHQsXG4gICAgICAgICAgTWVyY2hhbmRpc2luZ1VzZXJDb250ZXh0XG4gICAgICAgIF0pID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgLi4uc2l0ZUNvbnRleHQsXG5cbiAgICAgICAgICAgICAgcHJvZHVjdHM6IHVzZXJDb250ZXh0LnByb2R1Y3RzLFxuICAgICAgICAgICAgICBjYXRlZ29yeTogdXNlckNvbnRleHQuY2F0ZWdvcnksXG4gICAgICAgICAgICAgIGZhY2V0czogdXNlckNvbnRleHQuZmFjZXRzLFxuICAgICAgICAgICAgICBzZWFyY2hQaHJhc2U6IHVzZXJDb250ZXh0LnNlYXJjaFBocmFzZSxcblxuICAgICAgICAgICAgICBwYWdlU2l6ZTogbnVtYmVyVG9EaXNwbGF5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgY29uc2VudFJlZmVyZW5jZTogdXNlckNvbnRleHQuY29uc2VudFJlZmVyZW5jZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIG1lcmdlTWFwKChyZXF1ZXN0KSA9PlxuICAgICAgICB0aGlzLnN0cmF0ZWd5Q29ubmVjdG9yXG4gICAgICAgICAgLmxvYWRQcm9kdWN0c0ZvclN0cmF0ZWd5KHN0cmF0ZWd5SWQsIHJlcXVlc3QpXG4gICAgICAgICAgLnBpcGUobWFwKChwcm9kdWN0cykgPT4gKHsgcmVxdWVzdCwgcHJvZHVjdHMgfSkpKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==