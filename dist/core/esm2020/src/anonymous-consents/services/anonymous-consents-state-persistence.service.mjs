/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadAnonymousConsentTemplatesSuccess } from '../store/actions/anonymous-consents-group';
import { getAnonymousConsentState } from '../store/selectors/feature.selector';
import * as i0 from "@angular/core";
import * as i1 from "../../state/index";
import * as i2 from "@ngrx/store";
import * as i3 from "../facade/index";
/**
 * Responsible for saving the anonymous consents data in browser storage.
 */
export class AnonymousConsentsStatePersistenceService {
    constructor(statePersistenceService, store, anonymousConsentsService) {
        this.statePersistenceService = statePersistenceService;
        this.store = store;
        this.anonymousConsentsService = anonymousConsentsService;
        this.subscription = new Subscription();
        /**
         * Identifier used for storage key.
         */
        this.key = 'anonymous-consents';
    }
    /**
     * Initializes the synchronization between state and browser storage.
     */
    initSync() {
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: this.key,
            state$: this.getAuthState(),
            onRead: (state) => this.onRead(state),
        }));
    }
    /**
     * Gets and transforms state from different sources into the form that should
     * be saved in storage.
     */
    getAuthState() {
        return this.store.select(getAnonymousConsentState);
    }
    /**
     * Function called on each browser storage read.
     * Used to update state from browser -> state.
     */
    onRead(state) {
        const templates = state?.templates;
        const consents = state?.consents;
        const ui = state?.ui;
        // templates
        if (templates?.success) {
            this.store.dispatch(new LoadAnonymousConsentTemplatesSuccess(templates.value ?? []));
        }
        // consents
        if (consents) {
            this.anonymousConsentsService.setConsents(consents);
        }
        // ui
        if (ui) {
            this.anonymousConsentsService.toggleBannerDismissed(ui?.bannerDismissed);
            this.anonymousConsentsService.toggleTemplatesUpdated(ui?.updated);
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AnonymousConsentsStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentsStatePersistenceService, deps: [{ token: i1.StatePersistenceService }, { token: i2.Store }, { token: i3.AnonymousConsentsService }], target: i0.ɵɵFactoryTarget.Injectable });
AnonymousConsentsStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentsStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentsStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StatePersistenceService }, { type: i2.Store }, { type: i3.AnonymousConsentsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5vbnltb3VzLWNvbnNlbnRzLXN0YXRlLXBlcnNpc3RlbmNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9hbm9ueW1vdXMtY29uc2VudHMvc2VydmljZXMvYW5vbnltb3VzLWNvbnNlbnRzLXN0YXRlLXBlcnNpc3RlbmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdoRCxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUtqRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7QUFPL0U7O0dBRUc7QUFJSCxNQUFNLE9BQU8sd0NBQXdDO0lBR25ELFlBQ1ksdUJBQWdELEVBQ2hELEtBQXdDLEVBQ3hDLHdCQUFrRDtRQUZsRCw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELFVBQUssR0FBTCxLQUFLLENBQW1DO1FBQ3hDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFMcEQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBUTVDOztXQUVHO1FBQ08sUUFBRyxHQUFHLG9CQUFvQixDQUFDO0lBTGxDLENBQUM7SUFPSjs7T0FFRztJQUNJLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQztZQUMzQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUMzQixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ3RDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNPLFlBQVk7UUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7O09BR0c7SUFDTyxNQUFNLENBQUMsS0FBK0M7UUFDOUQsTUFBTSxTQUFTLEdBQUcsS0FBSyxFQUFFLFNBQVMsQ0FBQztRQUNuQyxNQUFNLFFBQVEsR0FBRyxLQUFLLEVBQUUsUUFBUSxDQUFDO1FBQ2pDLE1BQU0sRUFBRSxHQUFHLEtBQUssRUFBRSxFQUFFLENBQUM7UUFFckIsWUFBWTtRQUNaLElBQUksU0FBUyxFQUFFLE9BQU8sRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDakIsSUFBSSxvQ0FBb0MsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUNoRSxDQUFDO1NBQ0g7UUFFRCxXQUFXO1FBQ1gsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsS0FBSztRQUNMLElBQUksRUFBRSxFQUFFO1lBQ04sSUFBSSxDQUFDLHdCQUF3QixDQUFDLHFCQUFxQixDQUFDLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsd0JBQXdCLENBQUMsc0JBQXNCLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ25FO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7O3FJQWpFVSx3Q0FBd0M7eUlBQXhDLHdDQUF3QyxjQUZ2QyxNQUFNOzJGQUVQLHdDQUF3QztrQkFIcEQsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSB9IGZyb20gJy4uLy4uL3N0YXRlL2luZGV4JztcbmltcG9ydCB7IEFub255bW91c0NvbnNlbnRzU2VydmljZSB9IGZyb20gJy4uL2ZhY2FkZS9pbmRleCc7XG5pbXBvcnQgeyBMb2FkQW5vbnltb3VzQ29uc2VudFRlbXBsYXRlc1N1Y2Nlc3MgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2Fub255bW91cy1jb25zZW50cy1ncm91cCc7XG5pbXBvcnQge1xuICBBbm9ueW1vdXNDb25zZW50c1N0YXRlLFxuICBTdGF0ZVdpdGhBbm9ueW1vdXNDb25zZW50cyxcbn0gZnJvbSAnLi4vc3RvcmUvaW5kZXgnO1xuaW1wb3J0IHsgZ2V0QW5vbnltb3VzQ29uc2VudFN0YXRlIH0gZnJvbSAnLi4vc3RvcmUvc2VsZWN0b3JzL2ZlYXR1cmUuc2VsZWN0b3InO1xuXG4vKipcbiAqIEFub255bW91cyBjb25zZW50cyBzdGF0ZSBzeW5jZWQgdG8gYnJvd3NlciBzdG9yYWdlLlxuICovXG5leHBvcnQgdHlwZSBTeW5jZWRBbm9ueW1vdXNDb25zZW50c1N0YXRlID0gUGFydGlhbDxBbm9ueW1vdXNDb25zZW50c1N0YXRlPjtcblxuLyoqXG4gKiBSZXNwb25zaWJsZSBmb3Igc2F2aW5nIHRoZSBhbm9ueW1vdXMgY29uc2VudHMgZGF0YSBpbiBicm93c2VyIHN0b3JhZ2UuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBbm9ueW1vdXNDb25zZW50c1N0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2U6IFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzdG9yZTogU3RvcmU8U3RhdGVXaXRoQW5vbnltb3VzQ29uc2VudHM+LFxuICAgIHByb3RlY3RlZCBhbm9ueW1vdXNDb25zZW50c1NlcnZpY2U6IEFub255bW91c0NvbnNlbnRzU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIElkZW50aWZpZXIgdXNlZCBmb3Igc3RvcmFnZSBrZXkuXG4gICAqL1xuICBwcm90ZWN0ZWQga2V5ID0gJ2Fub255bW91cy1jb25zZW50cyc7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBzeW5jaHJvbml6YXRpb24gYmV0d2VlbiBzdGF0ZSBhbmQgYnJvd3NlciBzdG9yYWdlLlxuICAgKi9cbiAgcHVibGljIGluaXRTeW5jKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuc3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2Uuc3luY1dpdGhTdG9yYWdlKHtcbiAgICAgICAga2V5OiB0aGlzLmtleSxcbiAgICAgICAgc3RhdGUkOiB0aGlzLmdldEF1dGhTdGF0ZSgpLFxuICAgICAgICBvblJlYWQ6IChzdGF0ZSkgPT4gdGhpcy5vblJlYWQoc3RhdGUpLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW5kIHRyYW5zZm9ybXMgc3RhdGUgZnJvbSBkaWZmZXJlbnQgc291cmNlcyBpbnRvIHRoZSBmb3JtIHRoYXQgc2hvdWxkXG4gICAqIGJlIHNhdmVkIGluIHN0b3JhZ2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0QXV0aFN0YXRlKCk6IE9ic2VydmFibGU8U3luY2VkQW5vbnltb3VzQ29uc2VudHNTdGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChnZXRBbm9ueW1vdXNDb25zZW50U3RhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGNhbGxlZCBvbiBlYWNoIGJyb3dzZXIgc3RvcmFnZSByZWFkLlxuICAgKiBVc2VkIHRvIHVwZGF0ZSBzdGF0ZSBmcm9tIGJyb3dzZXIgLT4gc3RhdGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgb25SZWFkKHN0YXRlOiBTeW5jZWRBbm9ueW1vdXNDb25zZW50c1N0YXRlIHwgdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgdGVtcGxhdGVzID0gc3RhdGU/LnRlbXBsYXRlcztcbiAgICBjb25zdCBjb25zZW50cyA9IHN0YXRlPy5jb25zZW50cztcbiAgICBjb25zdCB1aSA9IHN0YXRlPy51aTtcblxuICAgIC8vIHRlbXBsYXRlc1xuICAgIGlmICh0ZW1wbGF0ZXM/LnN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgIG5ldyBMb2FkQW5vbnltb3VzQ29uc2VudFRlbXBsYXRlc1N1Y2Nlc3ModGVtcGxhdGVzLnZhbHVlID8/IFtdKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjb25zZW50c1xuICAgIGlmIChjb25zZW50cykge1xuICAgICAgdGhpcy5hbm9ueW1vdXNDb25zZW50c1NlcnZpY2Uuc2V0Q29uc2VudHMoY29uc2VudHMpO1xuICAgIH1cblxuICAgIC8vIHVpXG4gICAgaWYgKHVpKSB7XG4gICAgICB0aGlzLmFub255bW91c0NvbnNlbnRzU2VydmljZS50b2dnbGVCYW5uZXJEaXNtaXNzZWQodWk/LmJhbm5lckRpc21pc3NlZCk7XG4gICAgICB0aGlzLmFub255bW91c0NvbnNlbnRzU2VydmljZS50b2dnbGVUZW1wbGF0ZXNVcGRhdGVkKHVpPy51cGRhdGVkKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=