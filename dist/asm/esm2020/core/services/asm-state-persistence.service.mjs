/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { combineLatest, of, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AsmActions, AsmSelectors } from '../store';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@ngrx/store";
import * as i3 from "@spartacus/asm/root";
/**
 * Responsible for storing ASM state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
export class AsmStatePersistenceService {
    constructor(statePersistenceService, store, authStorageService) {
        this.statePersistenceService = statePersistenceService;
        this.store = store;
        this.authStorageService = authStorageService;
        this.subscription = new Subscription();
        /**
         * Identifier used for storage key.
         */
        this.key = 'asm';
    }
    /**
     * Initializes the synchronization between state and browser storage.
     */
    initSync() {
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: this.key,
            state$: this.getAsmState(),
            onRead: (state) => this.onRead(state),
        }));
    }
    /**
     * Gets and transforms state from different sources into the form that should
     * be saved in storage.
     */
    getAsmState() {
        return combineLatest([
            this.store.pipe(
            // Since getAsmState() may be called while the module is lazy loded
            // The asm state slice may not exist yet in the first store emissions.
            filter((store) => !!store.asm), select(AsmSelectors.getAsmUi)),
            of(this.authStorageService.getEmulatedUserToken()),
            this.authStorageService.getTokenTarget(),
        ]).pipe(map(([ui, emulatedUserToken, tokenTarget]) => {
            let emulatedToken = emulatedUserToken;
            if (emulatedToken) {
                emulatedToken = { ...emulatedUserToken };
                // To minimize risk of user account hijacking we don't persist emulated user refresh_token
                delete emulatedToken.refresh_token;
            }
            return {
                ui,
                emulatedUserToken: emulatedToken,
                tokenTarget,
            };
        }));
    }
    /**
     * Function called on each browser storage read.
     * Used to update state from browser -> state.
     */
    onRead(state) {
        if (state) {
            if (state.ui) {
                this.store.dispatch(new AsmActions.AsmUiUpdate(state.ui));
            }
            if (state.emulatedUserToken) {
                this.authStorageService.setEmulatedUserToken(state.emulatedUserToken);
            }
            if (state.tokenTarget) {
                this.authStorageService.setTokenTarget(state.tokenTarget);
            }
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmStatePersistenceService, deps: [{ token: i1.StatePersistenceService }, { token: i2.Store }, { token: i3.AsmAuthStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StatePersistenceService }, { type: i2.Store }, { type: i3.AsmAuthStorageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLXN0YXRlLXBlcnNpc3RlbmNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2NvcmUvc2VydmljZXMvYXNtLXN0YXRlLXBlcnNpc3RlbmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQUc1QyxPQUFPLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBZ0IsTUFBTSxVQUFVLENBQUM7Ozs7O0FBV2xFOzs7R0FHRztBQUlILE1BQU0sT0FBTywwQkFBMEI7SUFHckMsWUFDWSx1QkFBZ0QsRUFDaEQsS0FBMEIsRUFDMUIsa0JBQXlDO1FBRnpDLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDaEQsVUFBSyxHQUFMLEtBQUssQ0FBcUI7UUFDMUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF1QjtRQUwzQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFRNUM7O1dBRUc7UUFDTyxRQUFHLEdBQUcsS0FBSyxDQUFDO0lBTG5CLENBQUM7SUFPSjs7T0FFRztJQUNJLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQztZQUMzQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMxQixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ3RDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNPLFdBQVc7UUFDbkIsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQ2IsbUVBQW1FO1lBQ25FLHNFQUFzRTtZQUN0RSxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzlCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQzlCO1lBQ0QsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUU7U0FDekMsQ0FBQyxDQUFDLElBQUksQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFO1lBQzNDLElBQUksYUFBYSxHQUFHLGlCQUFpQixDQUFDO1lBQ3RDLElBQUksYUFBYSxFQUFFO2dCQUNqQixhQUFhLEdBQUcsRUFBRSxHQUFHLGlCQUFpQixFQUFlLENBQUM7Z0JBQ3RELDBGQUEwRjtnQkFDMUYsT0FBTyxhQUFhLENBQUMsYUFBYSxDQUFDO2FBQ3BDO1lBQ0QsT0FBTztnQkFDTCxFQUFFO2dCQUNGLGlCQUFpQixFQUFFLGFBQWE7Z0JBQ2hDLFdBQVc7YUFDWixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDTyxNQUFNLENBQUMsS0FBaUM7UUFDaEQsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUN2RTtZQUNELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDckIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDM0Q7U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzt1SEE5RVUsMEJBQTBCOzJIQUExQiwwQkFBMEIsY0FGekIsTUFBTTsyRkFFUCwwQkFBMEI7a0JBSHRDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQXNtQXV0aFN0b3JhZ2VTZXJ2aWNlLCBBc21VaSwgVG9rZW5UYXJnZXQgfSBmcm9tICdAc3BhcnRhY3VzL2FzbS9yb290JztcbmltcG9ydCB7IEF1dGhUb2tlbiwgU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBc21BY3Rpb25zLCBBc21TZWxlY3RvcnMsIFN0YXRlV2l0aEFzbSB9IGZyb20gJy4uL3N0b3JlJztcblxuLyoqXG4gKiBBU00gc3RhdGUgc3luY2VkIHRvIGJyb3dzZXIgc3RvcmFnZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTeW5jZWRBc21TdGF0ZSB7XG4gIHVpPzogQXNtVWk7XG4gIGVtdWxhdGVkVXNlclRva2VuPzogQXV0aFRva2VuO1xuICB0b2tlblRhcmdldD86IFRva2VuVGFyZ2V0O1xufVxuXG4vKipcbiAqIFJlc3BvbnNpYmxlIGZvciBzdG9yaW5nIEFTTSBzdGF0ZSBpbiB0aGUgYnJvd3NlciBzdG9yYWdlLlxuICogVXNlcyBgU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2VgIG1lY2hhbmlzbS5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFzbVN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2U6IFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzdG9yZTogU3RvcmU8U3RhdGVXaXRoQXNtPixcbiAgICBwcm90ZWN0ZWQgYXV0aFN0b3JhZ2VTZXJ2aWNlOiBBc21BdXRoU3RvcmFnZVNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBJZGVudGlmaWVyIHVzZWQgZm9yIHN0b3JhZ2Uga2V5LlxuICAgKi9cbiAgcHJvdGVjdGVkIGtleSA9ICdhc20nO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgc3luY2hyb25pemF0aW9uIGJldHdlZW4gc3RhdGUgYW5kIGJyb3dzZXIgc3RvcmFnZS5cbiAgICovXG4gIHB1YmxpYyBpbml0U3luYygpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLnN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLnN5bmNXaXRoU3RvcmFnZSh7XG4gICAgICAgIGtleTogdGhpcy5rZXksXG4gICAgICAgIHN0YXRlJDogdGhpcy5nZXRBc21TdGF0ZSgpLFxuICAgICAgICBvblJlYWQ6IChzdGF0ZSkgPT4gdGhpcy5vblJlYWQoc3RhdGUpLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW5kIHRyYW5zZm9ybXMgc3RhdGUgZnJvbSBkaWZmZXJlbnQgc291cmNlcyBpbnRvIHRoZSBmb3JtIHRoYXQgc2hvdWxkXG4gICAqIGJlIHNhdmVkIGluIHN0b3JhZ2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0QXNtU3RhdGUoKTogT2JzZXJ2YWJsZTxTeW5jZWRBc21TdGF0ZT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMuc3RvcmUucGlwZShcbiAgICAgICAgLy8gU2luY2UgZ2V0QXNtU3RhdGUoKSBtYXkgYmUgY2FsbGVkIHdoaWxlIHRoZSBtb2R1bGUgaXMgbGF6eSBsb2RlZFxuICAgICAgICAvLyBUaGUgYXNtIHN0YXRlIHNsaWNlIG1heSBub3QgZXhpc3QgeWV0IGluIHRoZSBmaXJzdCBzdG9yZSBlbWlzc2lvbnMuXG4gICAgICAgIGZpbHRlcigoc3RvcmUpID0+ICEhc3RvcmUuYXNtKSxcbiAgICAgICAgc2VsZWN0KEFzbVNlbGVjdG9ycy5nZXRBc21VaSlcbiAgICAgICksXG4gICAgICBvZih0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5nZXRFbXVsYXRlZFVzZXJUb2tlbigpKSxcbiAgICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLmdldFRva2VuVGFyZ2V0KCksXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW3VpLCBlbXVsYXRlZFVzZXJUb2tlbiwgdG9rZW5UYXJnZXRdKSA9PiB7XG4gICAgICAgIGxldCBlbXVsYXRlZFRva2VuID0gZW11bGF0ZWRVc2VyVG9rZW47XG4gICAgICAgIGlmIChlbXVsYXRlZFRva2VuKSB7XG4gICAgICAgICAgZW11bGF0ZWRUb2tlbiA9IHsgLi4uZW11bGF0ZWRVc2VyVG9rZW4gfSBhcyBBdXRoVG9rZW47XG4gICAgICAgICAgLy8gVG8gbWluaW1pemUgcmlzayBvZiB1c2VyIGFjY291bnQgaGlqYWNraW5nIHdlIGRvbid0IHBlcnNpc3QgZW11bGF0ZWQgdXNlciByZWZyZXNoX3Rva2VuXG4gICAgICAgICAgZGVsZXRlIGVtdWxhdGVkVG9rZW4ucmVmcmVzaF90b2tlbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHVpLFxuICAgICAgICAgIGVtdWxhdGVkVXNlclRva2VuOiBlbXVsYXRlZFRva2VuLFxuICAgICAgICAgIHRva2VuVGFyZ2V0LFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGNhbGxlZCBvbiBlYWNoIGJyb3dzZXIgc3RvcmFnZSByZWFkLlxuICAgKiBVc2VkIHRvIHVwZGF0ZSBzdGF0ZSBmcm9tIGJyb3dzZXIgLT4gc3RhdGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgb25SZWFkKHN0YXRlOiBTeW5jZWRBc21TdGF0ZSB8IHVuZGVmaW5lZCkge1xuICAgIGlmIChzdGF0ZSkge1xuICAgICAgaWYgKHN0YXRlLnVpKSB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFzbUFjdGlvbnMuQXNtVWlVcGRhdGUoc3RhdGUudWkpKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGF0ZS5lbXVsYXRlZFVzZXJUb2tlbikge1xuICAgICAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5zZXRFbXVsYXRlZFVzZXJUb2tlbihzdGF0ZS5lbXVsYXRlZFVzZXJUb2tlbik7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUudG9rZW5UYXJnZXQpIHtcbiAgICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2Uuc2V0VG9rZW5UYXJnZXQoc3RhdGUudG9rZW5UYXJnZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==