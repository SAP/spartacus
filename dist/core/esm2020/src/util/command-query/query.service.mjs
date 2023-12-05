/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Subscription, iif, isObservable, merge, of, using, } from 'rxjs';
import { catchError, distinctUntilChanged, map, share, switchMap, takeUntil, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../event/event.service";
export class QueryService {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
    }
    create(loaderFactory, options) {
        const initialState = {
            data: undefined,
            error: false,
            loading: true,
        };
        const state$ = new BehaviorSubject(initialState);
        // if the query will be unsubscribed from while the data is being loaded, we will end up with the loading flag set to true
        // we want to retry this load on next subscription
        const onSubscribeLoad$ = iif(() => state$.value.loading, of(undefined), EMPTY);
        const loadTrigger$ = this.getTriggersStream([
            onSubscribeLoad$,
            ...(options?.reloadOn ?? []),
            ...(options?.resetOn ?? []),
        ]);
        const resetTrigger$ = this.getTriggersStream(options?.resetOn ?? []);
        const reloadTrigger$ = this.getTriggersStream(options?.reloadOn ?? []);
        const loader$ = loaderFactory().pipe(takeUntil(resetTrigger$));
        const load$ = loadTrigger$.pipe(tap(() => {
            if (!state$.value.loading) {
                state$.next({ ...state$.value, loading: true });
            }
        }), switchMap(() => loader$), tap((data) => {
            state$.next({ loading: false, error: false, data });
        }), catchError((error, sourceStream$) => {
            state$.next({ loading: false, error, data: undefined });
            return sourceStream$;
        }), share());
        // reload logic
        if (options?.reloadOn?.length) {
            this.subscriptions.add(reloadTrigger$.subscribe(() => {
                if (!state$.value.loading) {
                    state$.next({ ...state$.value, loading: true });
                }
            }));
        }
        // reset logic
        if (options?.resetOn?.length) {
            this.subscriptions.add(resetTrigger$.subscribe(() => {
                if (state$.value.data !== undefined ||
                    state$.value.error !== false ||
                    state$.value.loading !== false) {
                    state$.next(initialState);
                }
            }));
        }
        const query$ = using(() => load$.subscribe(), () => state$);
        const data$ = query$.pipe(map((queryState) => queryState.data), distinctUntilChanged());
        return { get: () => data$, getState: () => query$ };
    }
    getTriggersStream(triggers) {
        if (!triggers.length) {
            return EMPTY;
        }
        const observables = triggers.map((trigger) => {
            if (isObservable(trigger)) {
                return trigger;
            }
            return this.eventService.get(trigger);
        });
        return merge(...observables);
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
QueryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QueryService, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
QueryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QueryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QueryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3V0aWwvY29tbWFuZC1xdWVyeS9xdWVyeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFtQixNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsZUFBZSxFQUNmLEtBQUssRUFFTCxZQUFZLEVBQ1osR0FBRyxFQUNILFlBQVksRUFDWixLQUFLLEVBQ0wsRUFBRSxFQUNGLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLEdBQUcsRUFDSCxLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBb0J4QixNQUFNLE9BQU8sWUFBWTtJQUd2QixZQUFzQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUZ0QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFTSxDQUFDO0lBRXBELE1BQU0sQ0FDSixhQUFrQyxFQUNsQyxPQUtDO1FBRUQsTUFBTSxZQUFZLEdBQWtCO1lBQ2xDLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUM7UUFFRixNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsWUFBWSxDQUFDLENBQUM7UUFFaEUsMEhBQTBIO1FBQzFILGtEQUFrRDtRQUNsRCxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FDMUIsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQzFCLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFDYixLQUFLLENBQ04sQ0FBQztRQUVGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FB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dkIsQ0FBQztRQUVGLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRVMsaUJBQWlCLENBQUMsUUFBeUI7UUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDcEIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDekIsT0FBTyxPQUFPLENBQUM7YUFDaEI7WUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7eUdBaEhVLFlBQVk7NkdBQVosWUFBWSxjQUZYLE1BQU07MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgRU1QVFksXG4gIE9ic2VydmFibGUsXG4gIFN1YnNjcmlwdGlvbixcbiAgaWlmLFxuICBpc09ic2VydmFibGUsXG4gIG1lcmdlLFxuICBvZixcbiAgdXNpbmcsXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY2F0Y2hFcnJvcixcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIG1hcCxcbiAgc2hhcmUsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZVVudGlsLFxuICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEN4RXZlbnQgfSBmcm9tICcuLi8uLi9ldmVudC9jeC1ldmVudCc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9ldmVudC9ldmVudC5zZXJ2aWNlJztcblxuZXhwb3J0IHR5cGUgUXVlcnlOb3RpZmllciA9IE9ic2VydmFibGU8dW5rbm93bj4gfCBUeXBlPEN4RXZlbnQ+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5U3RhdGU8VD4ge1xuICBsb2FkaW5nOiBib29sZWFuO1xuICBlcnJvcjogZmFsc2UgfCBFcnJvcjtcbiAgZGF0YTogVCB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeTxSRVNVTFQsIFBBUkFNUyBleHRlbmRzIHVua25vd25bXSA9IFtdPiB7XG4gIGdldCguLi5wYXJhbXM6IFBBUkFNUyk6IE9ic2VydmFibGU8UkVTVUxUIHwgdW5kZWZpbmVkPjtcbiAgZ2V0U3RhdGUoLi4ucGFyYW1zOiBQQVJBTVMpOiBPYnNlcnZhYmxlPFF1ZXJ5U3RhdGU8UkVTVUxUPj47XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBRdWVyeVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UpIHt9XG5cbiAgY3JlYXRlPFQ+KFxuICAgIGxvYWRlckZhY3Rvcnk6ICgpID0+IE9ic2VydmFibGU8VD4sXG4gICAgb3B0aW9ucz86IHtcbiAgICAgIC8qKiBSZWxvYWRzIHRoZSBxdWVyeSwgd2hpbGUgcHJlc2VydmluZyB0aGUgYGRhdGFgIHVudGlsIHRoZSBuZXcgZGF0YSBpcyBsb2FkZWQgKi9cbiAgICAgIHJlbG9hZE9uPzogUXVlcnlOb3RpZmllcltdO1xuICAgICAgLyoqIFJlc2V0cyB0aGUgcXVlcnkgdG8gdGhlIGluaXRpYWwgc3RhdGUgKi9cbiAgICAgIHJlc2V0T24/OiBRdWVyeU5vdGlmaWVyW107XG4gICAgfVxuICApOiBRdWVyeTxUPiB7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlOiBRdWVyeVN0YXRlPFQ+ID0ge1xuICAgICAgZGF0YTogdW5kZWZpbmVkLFxuICAgICAgZXJyb3I6IGZhbHNlLFxuICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxRdWVyeVN0YXRlPFQ+Pihpbml0aWFsU3RhdGUpO1xuXG4gICAgLy8gaWYgdGhlIHF1ZXJ5IHdpbGwgYmUgdW5zdWJzY3JpYmVkIGZyb20gd2hpbGUgdGhlIGRhdGEgaXMgYmVpbmcgbG9hZGVkLCB3ZSB3aWxsIGVuZCB1cCB3aXRoIHRoZSBsb2FkaW5nIGZsYWcgc2V0IHRvIHRydWVcbiAgICAvLyB3ZSB3YW50IHRvIHJldHJ5IHRoaXMgbG9hZCBvbiBuZXh0IHN1YnNjcmlwdGlvblxuICAgIGNvbnN0IG9uU3Vic2NyaWJlTG9hZCQgPSBpaWYoXG4gICAgICAoKSA9PiBzdGF0ZSQudmFsdWUubG9hZGluZyxcbiAgICAgIG9mKHVuZGVmaW5lZCksXG4gICAgICBFTVBUWVxuICAgICk7XG5cbiAgICBjb25zdCBsb2FkVHJpZ2dlciQgPSB0aGlzLmdldFRyaWdnZXJzU3RyZWFtKFtcbiAgICAgIG9uU3Vic2NyaWJlTG9hZCQsIC8vIHdlIG5lZWQgdG8gZXZhbHVhdGUgb25TdWJzY3JpYmVMb2FkJCBiZWZvcmUgb3RoZXIgdHJpZ2dlcnMgaW4gb3JkZXIgdG8gYXZvaWQgb3RoZXIgdHJpZ2dlcnMgY2hhbmdpbmcgc3RhdGUkIHZhbHVlXG4gICAgICAuLi4ob3B0aW9ucz8ucmVsb2FkT24gPz8gW10pLFxuICAgICAgLi4uKG9wdGlvbnM/LnJlc2V0T24gPz8gW10pLFxuICAgIF0pO1xuXG4gICAgY29uc3QgcmVzZXRUcmlnZ2VyJCA9IHRoaXMuZ2V0VHJpZ2dlcnNTdHJlYW0ob3B0aW9ucz8ucmVzZXRPbiA/PyBbXSk7XG4gICAgY29uc3QgcmVsb2FkVHJpZ2dlciQgPSB0aGlzLmdldFRyaWdnZXJzU3RyZWFtKG9wdGlvbnM/LnJlbG9hZE9uID8/IFtdKTtcblxuICAgIGNvbnN0IGxvYWRlciQgPSBsb2FkZXJGYWN0b3J5KCkucGlwZSh0YWtlVW50aWwocmVzZXRUcmlnZ2VyJCkpO1xuXG4gICAgY29uc3QgbG9hZCQgPSBsb2FkVHJpZ2dlciQucGlwZShcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIGlmICghc3RhdGUkLnZhbHVlLmxvYWRpbmcpIHtcbiAgICAgICAgICBzdGF0ZSQubmV4dCh7IC4uLnN0YXRlJC52YWx1ZSwgbG9hZGluZzogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4gbG9hZGVyJCksXG4gICAgICB0YXAoKGRhdGEpID0+IHtcbiAgICAgICAgc3RhdGUkLm5leHQoeyBsb2FkaW5nOiBmYWxzZSwgZXJyb3I6IGZhbHNlLCBkYXRhIH0pO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKChlcnJvciwgc291cmNlU3RyZWFtJCkgPT4ge1xuICAgICAgICBzdGF0ZSQubmV4dCh7IGxvYWRpbmc6IGZhbHNlLCBlcnJvciwgZGF0YTogdW5kZWZpbmVkIH0pO1xuICAgICAgICByZXR1cm4gc291cmNlU3RyZWFtJDtcbiAgICAgIH0pLFxuICAgICAgc2hhcmUoKVxuICAgICk7XG5cbiAgICAvLyByZWxvYWQgbG9naWNcbiAgICBpZiAob3B0aW9ucz8ucmVsb2FkT24/Lmxlbmd0aCkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgICAgcmVsb2FkVHJpZ2dlciQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAoIXN0YXRlJC52YWx1ZS5sb2FkaW5nKSB7XG4gICAgICAgICAgICBzdGF0ZSQubmV4dCh7IC4uLnN0YXRlJC52YWx1ZSwgbG9hZGluZzogdHJ1ZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIHJlc2V0IGxvZ2ljXG4gICAgaWYgKG9wdGlvbnM/LnJlc2V0T24/Lmxlbmd0aCkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgICAgcmVzZXRUcmlnZ2VyJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHN0YXRlJC52YWx1ZS5kYXRhICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIHN0YXRlJC52YWx1ZS5lcnJvciAhPT0gZmFsc2UgfHxcbiAgICAgICAgICAgIHN0YXRlJC52YWx1ZS5sb2FkaW5nICE9PSBmYWxzZVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgc3RhdGUkLm5leHQoaW5pdGlhbFN0YXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXJ5JCA9IHVzaW5nKFxuICAgICAgKCkgPT4gbG9hZCQuc3Vic2NyaWJlKCksXG4gICAgICAoKSA9PiBzdGF0ZSRcbiAgICApO1xuXG4gICAgY29uc3QgZGF0YSQgPSBxdWVyeSQucGlwZShcbiAgICAgIG1hcCgocXVlcnlTdGF0ZSkgPT4gcXVlcnlTdGF0ZS5kYXRhKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICApO1xuXG4gICAgcmV0dXJuIHsgZ2V0OiAoKSA9PiBkYXRhJCwgZ2V0U3RhdGU6ICgpID0+IHF1ZXJ5JCB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFRyaWdnZXJzU3RyZWFtKHRyaWdnZXJzOiBRdWVyeU5vdGlmaWVyW10pOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICBpZiAoIXRyaWdnZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIEVNUFRZO1xuICAgIH1cbiAgICBjb25zdCBvYnNlcnZhYmxlcyA9IHRyaWdnZXJzLm1hcCgodHJpZ2dlcikgPT4ge1xuICAgICAgaWYgKGlzT2JzZXJ2YWJsZSh0cmlnZ2VyKSkge1xuICAgICAgICByZXR1cm4gdHJpZ2dlcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZS5nZXQodHJpZ2dlcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1lcmdlKC4uLm9ic2VydmFibGVzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=