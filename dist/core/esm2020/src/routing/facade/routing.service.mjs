import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { RoutingActions } from '../store/actions/index';
import { RoutingSelector } from '../store/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../../window/window-ref";
import * as i3 from "../configurable-routes/url-translation/semantic-path.service";
import * as i4 from "./routing-params.service";
import * as i5 from "@angular/router";
import * as i6 from "@angular/common";
export class RoutingService {
    constructor(store, winRef, semanticPathService, routingParamsService, router, location) {
        this.store = store;
        this.winRef = winRef;
        this.semanticPathService = semanticPathService;
        this.routingParamsService = routingParamsService;
        this.router = router;
        this.location = location;
    }
    /**
     * Get the list of all parameters of the full route. This includes
     * active child routes.
     */
    getParams() {
        return this.routingParamsService.getParams();
    }
    /**
     * Get the current router state
     */
    getRouterState() {
        return this.store.pipe(select(RoutingSelector.getRouterState));
    }
    /**
     * Get the `PageContext` from the state
     */
    getPageContext() {
        return this.store.pipe(select(RoutingSelector.getPageContext));
    }
    /**
     * Get the next `PageContext` from the state
     */
    getNextPageContext() {
        return this.store.pipe(select(RoutingSelector.getNextPageContext));
    }
    /**
     * Allow to change next page context for the ongoing navigation
     *
     * @param pageContext
     */
    changeNextPageContext(pageContext) {
        this.store.dispatch(new RoutingActions.ChangeNextPageContext(pageContext));
    }
    /**
     * Get the `isNavigating` info from the state
     */
    isNavigating() {
        return this.store.pipe(select(RoutingSelector.isNavigating));
    }
    /**
     * Navigation with a new state into history
     * @param commands: url commands
     * @param extras: Represents the extra options used during navigation.
     *
     * @returns Promise that resolves to `true` when navigation succeeds,
     *          to `false` when navigation fails, or is rejected on error.
     */
    go(commands, extras) {
        const path = this.semanticPathService.transform(commands);
        return this.navigate(path, extras);
    }
    /**
     * Resolves the relative url for the given `UrlCommands` and `NavigationExtras`.
     *
     * The absolute url can be resolved using `getFullUrl()`.
     */
    getUrl(commands, extras) {
        let url = this.router.serializeUrl(this.router.createUrlTree(this.semanticPathService.transform(commands), extras));
        if (!url.startsWith('/')) {
            url = `/${url}`;
        }
        return url;
    }
    /**
     * Returns the absolute url for the given `UrlCommands` and `NavigationExtras`.
     *
     * The absolute url uses the origin of the current location.
     */
    getFullUrl(commands, extras) {
        return `${this.winRef.document.location.origin}${this.getUrl(commands, extras)}`;
    }
    /**
     * Navigation using absolute route path
     * @param url
     * @param extras: Represents the extra options used during navigation.
     *
     * @returns Promise that resolves to `true` when navigation succeeds,
     *          to `false` when navigation fails, or is rejected on error.
     */
    goByUrl(url, extras) {
        return this.router.navigateByUrl(url, extras);
    }
    /**
     * Navigating back
     */
    back() {
        const isLastPageInApp = this.winRef.nativeWindow &&
            this.winRef.document.referrer.includes(this.winRef.nativeWindow.location.origin);
        if (isLastPageInApp) {
            this.location.back();
            return;
        }
        this.go(['/']);
        return;
    }
    /**
     * Navigating forward
     */
    forward() {
        this.location.forward();
    }
    /**
     * Navigation with a new state into history
     * @param path
     * @param extras: Represents the extra options used during navigation.
     *
     * @returns Promise that resolves to `true` when navigation succeeds,
     *          to `false` when navigation fails, or is rejected on error.
     */
    navigate(path, extras) {
        return this.router.navigate(path, extras);
    }
}
RoutingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingService, deps: [{ token: i1.Store }, { token: i2.WindowRef }, { token: i3.SemanticPathService }, { token: i4.RoutingParamsService }, { token: i5.Router }, { token: i6.Location }], target: i0.ɵɵFactoryTarget.Injectable });
RoutingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.WindowRef }, { type: i3.SemanticPathService }, { type: i4.RoutingParamsService }, { type: i5.Router }, { type: i6.Location }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvcm91dGluZy9mYWNhZGUvcm91dGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQU01QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7OztBQU0zRCxNQUFNLE9BQU8sY0FBYztJQUN6QixZQUNZLEtBQXlCLEVBQ3pCLE1BQWlCLEVBQ2pCLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMsTUFBYyxFQUNkLFFBQWtCO1FBTGxCLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQzNCLENBQUM7SUFFSjs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENB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bnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTmF2aWdhdGlvbkJlaGF2aW9yT3B0aW9ucyxcbiAgTmF2aWdhdGlvbkV4dHJhcyxcbiAgUm91dGVyLFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgc2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJy4uLy4uL3dpbmRvdy93aW5kb3ctcmVmJztcbmltcG9ydCB7IFNlbWFudGljUGF0aFNlcnZpY2UgfSBmcm9tICcuLi9jb25maWd1cmFibGUtcm91dGVzL3VybC10cmFuc2xhdGlvbi9zZW1hbnRpYy1wYXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXJsQ29tbWFuZHMgfSBmcm9tICcuLi9jb25maWd1cmFibGUtcm91dGVzL3VybC10cmFuc2xhdGlvbi91cmwtY29tbWFuZCc7XG5pbXBvcnQgeyBQYWdlQ29udGV4dCB9IGZyb20gJy4uL21vZGVscy9wYWdlLWNvbnRleHQubW9kZWwnO1xuaW1wb3J0IHsgUm91dGluZ0FjdGlvbnMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFJvdXRlclN0YXRlIH0gZnJvbSAnLi4vc3RvcmUvcm91dGluZy1zdGF0ZSc7XG5pbXBvcnQgeyBSb3V0aW5nU2VsZWN0b3IgfSBmcm9tICcuLi9zdG9yZS9zZWxlY3RvcnMvaW5kZXgnO1xuaW1wb3J0IHsgUm91dGluZ1BhcmFtc1NlcnZpY2UgfSBmcm9tICcuL3JvdXRpbmctcGFyYW1zLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUm91dGluZ1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFJvdXRlclN0YXRlPixcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWYsXG4gICAgcHJvdGVjdGVkIHNlbWFudGljUGF0aFNlcnZpY2U6IFNlbWFudGljUGF0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdQYXJhbXNTZXJ2aWNlOiBSb3V0aW5nUGFyYW1zU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJvdGVjdGVkIGxvY2F0aW9uOiBMb2NhdGlvblxuICApIHt9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGlzdCBvZiBhbGwgcGFyYW1ldGVycyBvZiB0aGUgZnVsbCByb3V0ZS4gVGhpcyBpbmNsdWRlc1xuICAgKiBhY3RpdmUgY2hpbGQgcm91dGVzLlxuICAgKi9cbiAgZ2V0UGFyYW1zKCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfT4ge1xuICAgIHJldHVybiB0aGlzLnJvdXRpbmdQYXJhbXNTZXJ2aWNlLmdldFBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCByb3V0ZXIgc3RhdGVcbiAgICovXG4gIGdldFJvdXRlclN0YXRlKCk6IE9ic2VydmFibGU8Um91dGVyU3RhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKHNlbGVjdChSb3V0aW5nU2VsZWN0b3IuZ2V0Um91dGVyU3RhdGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGBQYWdlQ29udGV4dGAgZnJvbSB0aGUgc3RhdGVcbiAgICovXG4gIGdldFBhZ2VDb250ZXh0KCk6IE9ic2VydmFibGU8UGFnZUNvbnRleHQ+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKHNlbGVjdChSb3V0aW5nU2VsZWN0b3IuZ2V0UGFnZUNvbnRleHQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5leHQgYFBhZ2VDb250ZXh0YCBmcm9tIHRoZSBzdGF0ZVxuICAgKi9cbiAgZ2V0TmV4dFBhZ2VDb250ZXh0KCk6IE9ic2VydmFibGU8UGFnZUNvbnRleHQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKHNlbGVjdChSb3V0aW5nU2VsZWN0b3IuZ2V0TmV4dFBhZ2VDb250ZXh0KSk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3cgdG8gY2hhbmdlIG5leHQgcGFnZSBjb250ZXh0IGZvciB0aGUgb25nb2luZyBuYXZpZ2F0aW9uXG4gICAqXG4gICAqIEBwYXJhbSBwYWdlQ29udGV4dFxuICAgKi9cbiAgY2hhbmdlTmV4dFBhZ2VDb250ZXh0KHBhZ2VDb250ZXh0OiBQYWdlQ29udGV4dCkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFJvdXRpbmdBY3Rpb25zLkNoYW5nZU5leHRQYWdlQ29udGV4dChwYWdlQ29udGV4dCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYGlzTmF2aWdhdGluZ2AgaW5mbyBmcm9tIHRoZSBzdGF0ZVxuICAgKi9cbiAgaXNOYXZpZ2F0aW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoc2VsZWN0KFJvdXRpbmdTZWxlY3Rvci5pc05hdmlnYXRpbmcpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0aW9uIHdpdGggYSBuZXcgc3RhdGUgaW50byBoaXN0b3J5XG4gICAqIEBwYXJhbSBjb21tYW5kczogdXJsIGNvbW1hbmRzXG4gICAqIEBwYXJhbSBleHRyYXM6IFJlcHJlc2VudHMgdGhlIGV4dHJhIG9wdGlvbnMgdXNlZCBkdXJpbmcgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGB0cnVlYCB3aGVuIG5hdmlnYXRpb24gc3VjY2VlZHMsXG4gICAqICAgICAgICAgIHRvIGBmYWxzZWAgd2hlbiBuYXZpZ2F0aW9uIGZhaWxzLCBvciBpcyByZWplY3RlZCBvbiBlcnJvci5cbiAgICovXG4gIGdvKGNvbW1hbmRzOiBVcmxDb21tYW5kcywgZXh0cmFzPzogTmF2aWdhdGlvbkV4dHJhcyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLnNlbWFudGljUGF0aFNlcnZpY2UudHJhbnNmb3JtKGNvbW1hbmRzKTtcbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZShwYXRoLCBleHRyYXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIHRoZSByZWxhdGl2ZSB1cmwgZm9yIHRoZSBnaXZlbiBgVXJsQ29tbWFuZHNgIGFuZCBgTmF2aWdhdGlvbkV4dHJhc2AuXG4gICAqXG4gICAqIFRoZSBhYnNvbHV0ZSB1cmwgY2FuIGJlIHJlc29sdmVkIHVzaW5nIGBnZXRGdWxsVXJsKClgLlxuICAgKi9cbiAgZ2V0VXJsKGNvbW1hbmRzOiBVcmxDb21tYW5kcywgZXh0cmFzPzogTmF2aWdhdGlvbkV4dHJhcyk6IHN0cmluZyB7XG4gICAgbGV0IHVybCA9IHRoaXMucm91dGVyLnNlcmlhbGl6ZVVybChcbiAgICAgIHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUoXG4gICAgICAgIHRoaXMuc2VtYW50aWNQYXRoU2VydmljZS50cmFuc2Zvcm0oY29tbWFuZHMpLFxuICAgICAgICBleHRyYXNcbiAgICAgIClcbiAgICApO1xuICAgIGlmICghdXJsLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgdXJsID0gYC8ke3VybH1gO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGFic29sdXRlIHVybCBmb3IgdGhlIGdpdmVuIGBVcmxDb21tYW5kc2AgYW5kIGBOYXZpZ2F0aW9uRXh0cmFzYC5cbiAgICpcbiAgICogVGhlIGFic29sdXRlIHVybCB1c2VzIHRoZSBvcmlnaW4gb2YgdGhlIGN1cnJlbnQgbG9jYXRpb24uXG4gICAqL1xuICBnZXRGdWxsVXJsKGNvbW1hbmRzOiBVcmxDb21tYW5kcywgZXh0cmFzPzogTmF2aWdhdGlvbkV4dHJhcykge1xuICAgIHJldHVybiBgJHt0aGlzLndpblJlZi5kb2N1bWVudC5sb2NhdGlvbi5vcmlnaW59JHt0aGlzLmdldFVybChcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZXh0cmFzXG4gICAgKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRpb24gdXNpbmcgYWJzb2x1dGUgcm91dGUgcGF0aFxuICAgKiBAcGFyYW0gdXJsXG4gICAqIEBwYXJhbSBleHRyYXM6IFJlcHJlc2VudHMgdGhlIGV4dHJhIG9wdGlvbnMgdXNlZCBkdXJpbmcgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGB0cnVlYCB3aGVuIG5hdmlnYXRpb24gc3VjY2VlZHMsXG4gICAqICAgICAgICAgIHRvIGBmYWxzZWAgd2hlbiBuYXZpZ2F0aW9uIGZhaWxzLCBvciBpcyByZWplY3RlZCBvbiBlcnJvci5cbiAgICovXG4gIGdvQnlVcmwodXJsOiBzdHJpbmcsIGV4dHJhcz86IE5hdmlnYXRpb25CZWhhdmlvck9wdGlvbnMpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh1cmwsIGV4dHJhcyk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGluZyBiYWNrXG4gICAqL1xuICBiYWNrKCk6IHZvaWQge1xuICAgIGNvbnN0IGlzTGFzdFBhZ2VJbkFwcCA9XG4gICAgICB0aGlzLndpblJlZi5uYXRpdmVXaW5kb3cgJiZcbiAgICAgIHRoaXMud2luUmVmLmRvY3VtZW50LnJlZmVycmVyLmluY2x1ZGVzKFxuICAgICAgICB0aGlzLndpblJlZi5uYXRpdmVXaW5kb3cubG9jYXRpb24ub3JpZ2luXG4gICAgICApO1xuICAgIGlmIChpc0xhc3RQYWdlSW5BcHApIHtcbiAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmdvKFsnLyddKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGluZyBmb3J3YXJkXG4gICAqL1xuICBmb3J3YXJkKCk6IHZvaWQge1xuICAgIHRoaXMubG9jYXRpb24uZm9yd2FyZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRpb24gd2l0aCBhIG5ldyBzdGF0ZSBpbnRvIGhpc3RvcnlcbiAgICogQHBhcmFtIHBhdGhcbiAgICogQHBhcmFtIGV4dHJhczogUmVwcmVzZW50cyB0aGUgZXh0cmEgb3B0aW9ucyB1c2VkIGR1cmluZyBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYHRydWVgIHdoZW4gbmF2aWdhdGlvbiBzdWNjZWVkcyxcbiAgICogICAgICAgICAgdG8gYGZhbHNlYCB3aGVuIG5hdmlnYXRpb24gZmFpbHMsIG9yIGlzIHJlamVjdGVkIG9uIGVycm9yLlxuICAgKi9cbiAgcHJvdGVjdGVkIG5hdmlnYXRlKHBhdGg6IGFueVtdLCBleHRyYXM/OiBOYXZpZ2F0aW9uRXh0cmFzKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyLm5hdmlnYXRlKHBhdGgsIGV4dHJhcyk7XG4gIH1cbn1cbiJdfQ==