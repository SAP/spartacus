/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DeferLoadingStrategy } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/cms-components.service";
export class PageSlotService {
    constructor(cmsComponentsService, platformId, document) {
        this.cmsComponentsService = cmsComponentsService;
        this.platformId = platformId;
        this.document = document;
        this.resolvePrerenderedSlots();
    }
    /**
     * Finds all slots visible in the SSR pre-rendered DOM
     */
    resolvePrerenderedSlots() {
        if (isPlatformBrowser(this.platformId)) {
            this.prerenderedSlots = Array.from(this.document.querySelectorAll('cx-page-slot'))
                .filter((el) => el.getBoundingClientRect().top <
                this.document.documentElement.clientHeight)
                .map((el) => el.getAttribute('position'));
        }
    }
    /**
     * Indicates if certain slot should be rendered instantly.
     *
     * It's especially useful when transitioning from SSR to CSR application,
     * where we don't want to apply deferring logic to slots that are visible
     * to avoid unnecessary flickering.
     */
    shouldNotDefer(slot) {
        if (this.prerenderedSlots?.includes(slot)) {
            this.prerenderedSlots.splice(this.prerenderedSlots.indexOf(slot), 1);
            return true;
        }
        return false;
    }
    /**
     * Returns the defer options for the given component. If the wrapping
     * page slot is prerendered, we would ignore the defer options altogether.
     */
    getComponentDeferOptions(slot, componentType) {
        if (slot && this.shouldNotDefer(slot)) {
            return { deferLoading: DeferLoadingStrategy.INSTANT };
        }
        const deferLoading = this.cmsComponentsService.getDeferLoadingStrategy(componentType);
        return { deferLoading };
    }
}
PageSlotService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageSlotService, deps: [{ token: i1.CmsComponentsService }, { token: PLATFORM_ID }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
PageSlotService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageSlotService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageSlotService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentsService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbG90LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9zbG90L3BhZ2Utc2xvdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFPdkQsTUFBTSxPQUFPLGVBQWU7SUFHMUIsWUFDWSxvQkFBMEMsRUFDckIsVUFBZSxFQUNsQixRQUFrQjtRQUZwQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQ3JCLGVBQVUsR0FBVixVQUFVLENBQUs7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUU5QyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDTyx1QkFBdUI7UUFDL0IsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQy9DO2lCQUNFLE1BQU0sQ0FDTCxDQUFDLEVBQVcsRUFBRSxFQUFFLENBQ2QsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRztnQkFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUM3QztpQkFDQSxHQUFHLENBQUMsQ0FBQyxFQUFXLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUN0RDtJQUNILENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxjQUFjLENBQUMsSUFBWTtRQUN6QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSCx3QkFBd0IsQ0FDdEIsSUFBd0IsRUFDeEIsYUFBcUI7UUFFckIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQyxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZEO1FBQ0QsTUFBTSxZQUFZLEdBQ2hCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRSxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7NEdBekRVLGVBQWUsc0RBS2hCLFdBQVcsYUFDWCxRQUFRO2dIQU5QLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFNSSxNQUFNOzJCQUFDLFdBQVc7OzBCQUNsQixNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVmZXJMb2FkaW5nU3RyYXRlZ3kgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSW50ZXJzZWN0aW9uT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2xheW91dC9sb2FkaW5nL2ludGVyc2VjdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Ntcy1jb21wb25lbnRzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGFnZVNsb3RTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHByZXJlbmRlcmVkU2xvdHM6IChzdHJpbmcgfCBudWxsKVtdIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjbXNDb21wb25lbnRzU2VydmljZTogQ21zQ29tcG9uZW50c1NlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJvdGVjdGVkIHBsYXRmb3JtSWQ6IGFueSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgZG9jdW1lbnQ6IERvY3VtZW50XG4gICkge1xuICAgIHRoaXMucmVzb2x2ZVByZXJlbmRlcmVkU2xvdHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbGwgc2xvdHMgdmlzaWJsZSBpbiB0aGUgU1NSIHByZS1yZW5kZXJlZCBET01cbiAgICovXG4gIHByb3RlY3RlZCByZXNvbHZlUHJlcmVuZGVyZWRTbG90cygpOiB2b2lkIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5wcmVyZW5kZXJlZFNsb3RzID0gQXJyYXkuZnJvbShcbiAgICAgICAgdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdjeC1wYWdlLXNsb3QnKVxuICAgICAgKVxuICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgIChlbDogRWxlbWVudCkgPT5cbiAgICAgICAgICAgIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgICAgKVxuICAgICAgICAubWFwKChlbDogRWxlbWVudCkgPT4gZWwuZ2V0QXR0cmlidXRlKCdwb3NpdGlvbicpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIGNlcnRhaW4gc2xvdCBzaG91bGQgYmUgcmVuZGVyZWQgaW5zdGFudGx5LlxuICAgKlxuICAgKiBJdCdzIGVzcGVjaWFsbHkgdXNlZnVsIHdoZW4gdHJhbnNpdGlvbmluZyBmcm9tIFNTUiB0byBDU1IgYXBwbGljYXRpb24sXG4gICAqIHdoZXJlIHdlIGRvbid0IHdhbnQgdG8gYXBwbHkgZGVmZXJyaW5nIGxvZ2ljIHRvIHNsb3RzIHRoYXQgYXJlIHZpc2libGVcbiAgICogdG8gYXZvaWQgdW5uZWNlc3NhcnkgZmxpY2tlcmluZy5cbiAgICovXG4gIHNob3VsZE5vdERlZmVyKHNsb3Q6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnByZXJlbmRlcmVkU2xvdHM/LmluY2x1ZGVzKHNsb3QpKSB7XG4gICAgICB0aGlzLnByZXJlbmRlcmVkU2xvdHMuc3BsaWNlKHRoaXMucHJlcmVuZGVyZWRTbG90cy5pbmRleE9mKHNsb3QpLCAxKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmZXIgb3B0aW9ucyBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudC4gSWYgdGhlIHdyYXBwaW5nXG4gICAqIHBhZ2Ugc2xvdCBpcyBwcmVyZW5kZXJlZCwgd2Ugd291bGQgaWdub3JlIHRoZSBkZWZlciBvcHRpb25zIGFsdG9nZXRoZXIuXG4gICAqL1xuICBnZXRDb21wb25lbnREZWZlck9wdGlvbnMoXG4gICAgc2xvdDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGNvbXBvbmVudFR5cGU6IHN0cmluZ1xuICApOiBJbnRlcnNlY3Rpb25PcHRpb25zIHtcbiAgICBpZiAoc2xvdCAmJiB0aGlzLnNob3VsZE5vdERlZmVyKHNsb3QpKSB7XG4gICAgICByZXR1cm4geyBkZWZlckxvYWRpbmc6IERlZmVyTG9hZGluZ1N0cmF0ZWd5LklOU1RBTlQgfTtcbiAgICB9XG4gICAgY29uc3QgZGVmZXJMb2FkaW5nID1cbiAgICAgIHRoaXMuY21zQ29tcG9uZW50c1NlcnZpY2UuZ2V0RGVmZXJMb2FkaW5nU3RyYXRlZ3koY29tcG9uZW50VHlwZSk7XG4gICAgcmV0dXJuIHsgZGVmZXJMb2FkaW5nIH07XG4gIH1cbn1cbiJdfQ==