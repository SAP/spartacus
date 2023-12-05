/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { StorageSyncType } from '../../state/config/state-config';
import { getStorage, persistToStorage, readFromStorage, } from '../utils/browser-storage';
import * as i0 from "@angular/core";
import * as i1 from "../../window/window-ref";
export class StatePersistenceService {
    constructor(winRef) {
        this.winRef = winRef;
    }
    /**
     * Helper to synchronize state to more persistent storage (localStorage, sessionStorage).
     * It is context aware, so you can keep different state for te same feature based on specified context.
     *
     * Eg. cart is valid only under the same base site. So you want to synchronize cart only with the same base site.
     * Usage for that case: `syncWithStorage({ key: 'cart', state$: activeCartSelector$, context$: this.siteContextParamsService.getValues([BASE_SITE_CONTEXT_ID]), onRead: (state) => setCorrectStateInStore(state) })`.
     * Active cart for the `electronics` base site will be stored under `spartacus⚿electronics⚿cart` and for apparel under `spartacus⚿apparel⚿cart`.
     *
     * On each context change onRead function will be executed with state from storage provided as a parameter.
     *
     * Omitting context$ will trigger onRead only once at initialization.
     *
     * @param key Key to use in storage for the synchronized state. Should be unique for each feature.
     * @param state$ State to be saved and later restored.
     * @param context$ Context for state
     * @param storageType Storage type to be used to persist state
     * @param onRead Function to be executed on each storage read after context change
     *
     * @returns Subscriptions for reading/writing in storage on context/state change
     */
    syncWithStorage({ key, state$, context$ = of(''), storageType = StorageSyncType.LOCAL_STORAGE, onRead = () => {
        // Intentional empty arrow function
    }, }) {
        const storage = getStorage(storageType, this.winRef);
        const subscriptions = new Subscription();
        // Do not change order of subscription! Read should happen before write on context change.
        subscriptions.add(context$
            .pipe(map((context) => {
            return storage
                ? readFromStorage(storage, this.generateKeyWithContext(context, key))
                : undefined;
        }), tap((state) => onRead(state)))
            .subscribe());
        if (storage) {
            subscriptions.add(state$.pipe(withLatestFrom(context$)).subscribe(([state, context]) => {
                persistToStorage(this.generateKeyWithContext(context, key), state, storage);
            }));
        }
        return subscriptions;
    }
    /**
     * Helper to read state from persistent storage (localStorage, sessionStorage).
     * It is useful if you need synchronously access state saved with `syncWithStorage`.
     *
     * @param key Key to use in storage for state. Should be unique for each feature.
     * @param context Context value for state
     * @param storageType Storage type from to read state
     *
     * @returns State from the storage
     */
    readStateFromStorage({ key, context = '', storageType = StorageSyncType.LOCAL_STORAGE, }) {
        const storage = getStorage(storageType, this.winRef);
        if (storage) {
            return readFromStorage(storage, this.generateKeyWithContext(context, key));
        }
    }
    generateKeyWithContext(context, key) {
        return `spartacus⚿${[]
            .concat(context)
            .join('⚿')}⚿${key}`;
    }
}
StatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StatePersistenceService, deps: [{ token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
StatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StatePersistenceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtcGVyc2lzdGVuY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3N0YXRlL3NlcnZpY2VzL3N0YXRlLXBlcnNpc3RlbmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWxFLE9BQU8sRUFDTCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLGVBQWUsR0FDaEIsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBS2xDLE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFBc0IsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztJQUFHLENBQUM7SUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCxlQUFlLENBQUksRUFDakIsR0FBRyxFQUNILE1BQU0sRUFDTixRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUNqQixXQUFXLEdBQUcsZUFBZSxDQUFDLGFBQWEsRUFDM0MsTUFBTSxHQUFHLEdBQUcsRUFBRTtRQUNaLG1DQUFtQztJQUNyQyxDQUFDLEdBT0Y7UUFDQyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVyRCxNQUFNLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpDLDBGQUEwRjtRQUMxRixhQUFhLENBQUMsR0FBRyxDQUNmLFFBQVE7YUFDTCxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDZCxPQUFPLE9BQU87Z0JBQ1osQ0FBQyxDQUFFLGVBQWUsQ0FDZCxPQUFPLEVBQ1AsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FDeEI7Z0JBQ3JCLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEIsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDOUI7YUFDQSxTQUFTLEVBQUUsQ0FDZixDQUFDO1FBRUYsSUFBSSxPQUFPLEVBQUU7WUFDWCxhQUFhLENBQUMsR0FBRyxDQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRTtnQkFDbkUsZ0JBQWdCLENBQ2QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFDekMsS0FBSyxFQUNMLE9BQU8sQ0FDUixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztTQUNIO1FBRUQsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILG9CQUFvQixDQUFJLEVBQ3RCLEdBQUcsRUFDSCxPQUFPLEdBQUcsRUFBRSxFQUNaLFdBQVcsR0FBRyxlQUFlLENBQUMsYUFBYSxHQUs1QztRQUNDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXJELElBQUksT0FBTyxFQUFFO1lBQ1gsT0FBTyxlQUFlLENBQ3BCLE9BQU8sRUFDUCxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUN6QixDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVTLHNCQUFzQixDQUM5QixPQUErQixFQUMvQixHQUFXO1FBRVgsT0FBTyxhQUFjLEVBQW9CO2FBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7b0hBOUdVLHVCQUF1Qjt3SEFBdkIsdUJBQXVCLGNBRnRCLE1BQU07MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN0b3JhZ2VTeW5jVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2NvbmZpZy9zdGF0ZS1jb25maWcnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnLi4vLi4vd2luZG93L3dpbmRvdy1yZWYnO1xuaW1wb3J0IHtcbiAgZ2V0U3RvcmFnZSxcbiAgcGVyc2lzdFRvU3RvcmFnZSxcbiAgcmVhZEZyb21TdG9yYWdlLFxufSBmcm9tICcuLi91dGlscy9icm93c2VyLXN0b3JhZ2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWYpIHt9XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBzeW5jaHJvbml6ZSBzdGF0ZSB0byBtb3JlIHBlcnNpc3RlbnQgc3RvcmFnZSAobG9jYWxTdG9yYWdlLCBzZXNzaW9uU3RvcmFnZSkuXG4gICAqIEl0IGlzIGNvbnRleHQgYXdhcmUsIHNvIHlvdSBjYW4ga2VlcCBkaWZmZXJlbnQgc3RhdGUgZm9yIHRlIHNhbWUgZmVhdHVyZSBiYXNlZCBvbiBzcGVjaWZpZWQgY29udGV4dC5cbiAgICpcbiAgICogRWcuIGNhcnQgaXMgdmFsaWQgb25seSB1bmRlciB0aGUgc2FtZSBiYXNlIHNpdGUuIFNvIHlvdSB3YW50IHRvIHN5bmNocm9uaXplIGNhcnQgb25seSB3aXRoIHRoZSBzYW1lIGJhc2Ugc2l0ZS5cbiAgICogVXNhZ2UgZm9yIHRoYXQgY2FzZTogYHN5bmNXaXRoU3RvcmFnZSh7IGtleTogJ2NhcnQnLCBzdGF0ZSQ6IGFjdGl2ZUNhcnRTZWxlY3RvciQsIGNvbnRleHQkOiB0aGlzLnNpdGVDb250ZXh0UGFyYW1zU2VydmljZS5nZXRWYWx1ZXMoW0JBU0VfU0lURV9DT05URVhUX0lEXSksIG9uUmVhZDogKHN0YXRlKSA9PiBzZXRDb3JyZWN0U3RhdGVJblN0b3JlKHN0YXRlKSB9KWAuXG4gICAqIEFjdGl2ZSBjYXJ0IGZvciB0aGUgYGVsZWN0cm9uaWNzYCBiYXNlIHNpdGUgd2lsbCBiZSBzdG9yZWQgdW5kZXIgYHNwYXJ0YWN1c+Kav2VsZWN0cm9uaWNz4pq/Y2FydGAgYW5kIGZvciBhcHBhcmVsIHVuZGVyIGBzcGFydGFjdXPimr9hcHBhcmVs4pq/Y2FydGAuXG4gICAqXG4gICAqIE9uIGVhY2ggY29udGV4dCBjaGFuZ2Ugb25SZWFkIGZ1bmN0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgd2l0aCBzdGF0ZSBmcm9tIHN0b3JhZ2UgcHJvdmlkZWQgYXMgYSBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIE9taXR0aW5nIGNvbnRleHQkIHdpbGwgdHJpZ2dlciBvblJlYWQgb25seSBvbmNlIGF0IGluaXRpYWxpemF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ga2V5IEtleSB0byB1c2UgaW4gc3RvcmFnZSBmb3IgdGhlIHN5bmNocm9uaXplZCBzdGF0ZS4gU2hvdWxkIGJlIHVuaXF1ZSBmb3IgZWFjaCBmZWF0dXJlLlxuICAgKiBAcGFyYW0gc3RhdGUkIFN0YXRlIHRvIGJlIHNhdmVkIGFuZCBsYXRlciByZXN0b3JlZC5cbiAgICogQHBhcmFtIGNvbnRleHQkIENvbnRleHQgZm9yIHN0YXRlXG4gICAqIEBwYXJhbSBzdG9yYWdlVHlwZSBTdG9yYWdlIHR5cGUgdG8gYmUgdXNlZCB0byBwZXJzaXN0IHN0YXRlXG4gICAqIEBwYXJhbSBvblJlYWQgRnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgb24gZWFjaCBzdG9yYWdlIHJlYWQgYWZ0ZXIgY29udGV4dCBjaGFuZ2VcbiAgICpcbiAgICogQHJldHVybnMgU3Vic2NyaXB0aW9ucyBmb3IgcmVhZGluZy93cml0aW5nIGluIHN0b3JhZ2Ugb24gY29udGV4dC9zdGF0ZSBjaGFuZ2VcbiAgICovXG4gIHN5bmNXaXRoU3RvcmFnZTxUPih7XG4gICAga2V5LFxuICAgIHN0YXRlJCxcbiAgICBjb250ZXh0JCA9IG9mKCcnKSxcbiAgICBzdG9yYWdlVHlwZSA9IFN0b3JhZ2VTeW5jVHlwZS5MT0NBTF9TVE9SQUdFLFxuICAgIG9uUmVhZCA9ICgpID0+IHtcbiAgICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGFycm93IGZ1bmN0aW9uXG4gICAgfSxcbiAgfToge1xuICAgIGtleTogc3RyaW5nO1xuICAgIHN0YXRlJDogT2JzZXJ2YWJsZTxUPjtcbiAgICBjb250ZXh0JD86IE9ic2VydmFibGU8c3RyaW5nIHwgQXJyYXk8c3RyaW5nPj47XG4gICAgc3RvcmFnZVR5cGU/OiBTdG9yYWdlU3luY1R5cGU7XG4gICAgb25SZWFkPzogKHN0YXRlRnJvbVN0b3JhZ2U6IFQgfCB1bmRlZmluZWQpID0+IHZvaWQ7XG4gIH0pOiBTdWJzY3JpcHRpb24ge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSBnZXRTdG9yYWdlKHN0b3JhZ2VUeXBlLCB0aGlzLndpblJlZik7XG5cbiAgICBjb25zdCBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgLy8gRG8gbm90IGNoYW5nZSBvcmRlciBvZiBzdWJzY3JpcHRpb24hIFJlYWQgc2hvdWxkIGhhcHBlbiBiZWZvcmUgd3JpdGUgb24gY29udGV4dCBjaGFuZ2UuXG4gICAgc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBjb250ZXh0JFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoKGNvbnRleHQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdG9yYWdlXG4gICAgICAgICAgICAgID8gKHJlYWRGcm9tU3RvcmFnZShcbiAgICAgICAgICAgICAgICAgIHN0b3JhZ2UsXG4gICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlS2V5V2l0aENvbnRleHQoY29udGV4dCwga2V5KVxuICAgICAgICAgICAgICAgICkgYXMgVCB8IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgdGFwKChzdGF0ZSkgPT4gb25SZWFkKHN0YXRlKSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKClcbiAgICApO1xuXG4gICAgaWYgKHN0b3JhZ2UpIHtcbiAgICAgIHN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgICBzdGF0ZSQucGlwZSh3aXRoTGF0ZXN0RnJvbShjb250ZXh0JCkpLnN1YnNjcmliZSgoW3N0YXRlLCBjb250ZXh0XSkgPT4ge1xuICAgICAgICAgIHBlcnNpc3RUb1N0b3JhZ2UoXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlS2V5V2l0aENvbnRleHQoY29udGV4dCwga2V5KSxcbiAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgc3RvcmFnZVxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBzdWJzY3JpcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byByZWFkIHN0YXRlIGZyb20gcGVyc2lzdGVudCBzdG9yYWdlIChsb2NhbFN0b3JhZ2UsIHNlc3Npb25TdG9yYWdlKS5cbiAgICogSXQgaXMgdXNlZnVsIGlmIHlvdSBuZWVkIHN5bmNocm9ub3VzbHkgYWNjZXNzIHN0YXRlIHNhdmVkIHdpdGggYHN5bmNXaXRoU3RvcmFnZWAuXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgS2V5IHRvIHVzZSBpbiBzdG9yYWdlIGZvciBzdGF0ZS4gU2hvdWxkIGJlIHVuaXF1ZSBmb3IgZWFjaCBmZWF0dXJlLlxuICAgKiBAcGFyYW0gY29udGV4dCBDb250ZXh0IHZhbHVlIGZvciBzdGF0ZVxuICAgKiBAcGFyYW0gc3RvcmFnZVR5cGUgU3RvcmFnZSB0eXBlIGZyb20gdG8gcmVhZCBzdGF0ZVxuICAgKlxuICAgKiBAcmV0dXJucyBTdGF0ZSBmcm9tIHRoZSBzdG9yYWdlXG4gICAqL1xuICByZWFkU3RhdGVGcm9tU3RvcmFnZTxUPih7XG4gICAga2V5LFxuICAgIGNvbnRleHQgPSAnJyxcbiAgICBzdG9yYWdlVHlwZSA9IFN0b3JhZ2VTeW5jVHlwZS5MT0NBTF9TVE9SQUdFLFxuICB9OiB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgY29udGV4dD86IHN0cmluZyB8IEFycmF5PHN0cmluZz47XG4gICAgc3RvcmFnZVR5cGU/OiBTdG9yYWdlU3luY1R5cGU7XG4gIH0pOiBUIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBzdG9yYWdlID0gZ2V0U3RvcmFnZShzdG9yYWdlVHlwZSwgdGhpcy53aW5SZWYpO1xuXG4gICAgaWYgKHN0b3JhZ2UpIHtcbiAgICAgIHJldHVybiByZWFkRnJvbVN0b3JhZ2UoXG4gICAgICAgIHN0b3JhZ2UsXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVLZXlXaXRoQ29udGV4dChjb250ZXh0LCBrZXkpXG4gICAgICApIGFzIFQgfCB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdlbmVyYXRlS2V5V2l0aENvbnRleHQoXG4gICAgY29udGV4dDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPixcbiAgICBrZXk6IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIHJldHVybiBgc3BhcnRhY3Vz4pq/JHsoW10gYXMgQXJyYXk8c3RyaW5nPilcbiAgICAgIC5jb25jYXQoY29udGV4dClcbiAgICAgIC5qb2luKCfimr8nKX3imr8ke2tleX1gO1xuICB9XG59XG4iXX0=