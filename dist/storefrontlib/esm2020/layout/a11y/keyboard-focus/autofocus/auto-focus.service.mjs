/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { EscapeFocusService } from '../escape/escape-focus.service';
import { FOCUS_ATTR, } from '../keyboard-focus.model';
import * as i0 from "@angular/core";
export class AutoFocusService extends EscapeFocusService {
    /**
     * Returns the first focusable child element of the host element.
     */
    findFirstFocusable(host, config = { autofocus: true }) {
        if (config?.autofocus === ':host') {
            return host;
        }
        else if (this.hasPersistedFocus(host, config)) {
            return this.getPersisted(host, this.getPersistenceGroup(host, config));
        }
        else {
            return this.selectFocusUtil.findFirstFocusable(host, config) || host;
        }
    }
    /**
     * Indicates whether any of the focusable child elements is focused.
     */
    hasPersistedFocus(host, config) {
        return !!this.getPersisted(host, this.getPersistenceGroup(host, config));
    }
    /**
     * Returns the element that has a persisted focus state.
     *
     * @param host the `HTMLElement` used to query for focusable children
     * @param group the optional group for the persistent state, to separate different focus
     *   groups and remain the persistence
     */
    getPersisted(host, group) {
        if (!this.get(group)) {
            return;
        }
        const focussed = Array.from(host?.querySelectorAll(`[${FOCUS_ATTR}='${this.get(group)}']`));
        return focussed.length > 0 ? focussed[0] : undefined;
    }
}
AutoFocusService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AutoFocusService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
AutoFocusService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AutoFocusService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AutoFocusService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1mb2N1cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvYTExeS9rZXlib2FyZC1mb2N1cy9hdXRvZm9jdXMvYXV0by1mb2N1cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFFTCxVQUFVLEdBRVgsTUFBTSx5QkFBeUIsQ0FBQzs7QUFLakMsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGtCQUFrQjtJQUN0RDs7T0FFRztJQUNILGtCQUFrQixDQUNoQixJQUFvQyxFQUNwQyxTQUEwQixFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUU7UUFFN0MsSUFBSSxNQUFNLEVBQUUsU0FBUyxLQUFLLE9BQU8sRUFBRTtZQUNqQyxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9DLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3hFO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQztTQUN0RTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILGlCQUFpQixDQUNmLElBQW9DLEVBQ3BDLE1BQTBCO1FBRTFCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sWUFBWSxDQUNwQixJQUF5QixFQUN6QixLQUFxQjtRQUVyQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQixPQUFPO1NBQ1I7UUFDRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUN6QixJQUFJLEVBQUUsZ0JBQWdCLENBQ3BCLElBQUksVUFBVSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDWixDQUM3QixDQUFDO1FBQ0YsT0FBTyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdkQsQ0FBQzs7NkdBL0NVLGdCQUFnQjtpSEFBaEIsZ0JBQWdCLGNBRmYsTUFBTTsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXNjYXBlRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vZXNjYXBlL2VzY2FwZS1mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIEF1dG9Gb2N1c0NvbmZpZyxcbiAgRk9DVVNfQVRUUixcbiAgUGVyc2lzdEZvY3VzQ29uZmlnLFxufSBmcm9tICcuLi9rZXlib2FyZC1mb2N1cy5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRvRm9jdXNTZXJ2aWNlIGV4dGVuZHMgRXNjYXBlRm9jdXNTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZpcnN0IGZvY3VzYWJsZSBjaGlsZCBlbGVtZW50IG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqL1xuICBmaW5kRmlyc3RGb2N1c2FibGUoXG4gICAgaG9zdDogSFRNTEVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIGNvbmZpZzogQXV0b0ZvY3VzQ29uZmlnID0geyBhdXRvZm9jdXM6IHRydWUgfVxuICApOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB8IG51bGwge1xuICAgIGlmIChjb25maWc/LmF1dG9mb2N1cyA9PT0gJzpob3N0Jykge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhhc1BlcnNpc3RlZEZvY3VzKGhvc3QsIGNvbmZpZykpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFBlcnNpc3RlZChob3N0LCB0aGlzLmdldFBlcnNpc3RlbmNlR3JvdXAoaG9zdCwgY29uZmlnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdEZvY3VzVXRpbC5maW5kRmlyc3RGb2N1c2FibGUoaG9zdCwgY29uZmlnKSB8fCBob3N0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBhbnkgb2YgdGhlIGZvY3VzYWJsZSBjaGlsZCBlbGVtZW50cyBpcyBmb2N1c2VkLlxuICAgKi9cbiAgaGFzUGVyc2lzdGVkRm9jdXMoXG4gICAgaG9zdDogSFRNTEVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIGNvbmZpZzogUGVyc2lzdEZvY3VzQ29uZmlnXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuZ2V0UGVyc2lzdGVkKGhvc3QsIHRoaXMuZ2V0UGVyc2lzdGVuY2VHcm91cChob3N0LCBjb25maWcpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50IHRoYXQgaGFzIGEgcGVyc2lzdGVkIGZvY3VzIHN0YXRlLlxuICAgKlxuICAgKiBAcGFyYW0gaG9zdCB0aGUgYEhUTUxFbGVtZW50YCB1c2VkIHRvIHF1ZXJ5IGZvciBmb2N1c2FibGUgY2hpbGRyZW5cbiAgICogQHBhcmFtIGdyb3VwIHRoZSBvcHRpb25hbCBncm91cCBmb3IgdGhlIHBlcnNpc3RlbnQgc3RhdGUsIHRvIHNlcGFyYXRlIGRpZmZlcmVudCBmb2N1c1xuICAgKiAgIGdyb3VwcyBhbmQgcmVtYWluIHRoZSBwZXJzaXN0ZW5jZVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFBlcnNpc3RlZChcbiAgICBob3N0PzogSFRNTEVsZW1lbnQgfCBudWxsLFxuICAgIGdyb3VwPzogc3RyaW5nIHwgbnVsbFxuICApOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF0aGlzLmdldChncm91cCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZm9jdXNzZWQgPSBBcnJheS5mcm9tKFxuICAgICAgaG9zdD8ucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgYFske0ZPQ1VTX0FUVFJ9PScke3RoaXMuZ2V0KGdyb3VwKX0nXWBcbiAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD5cbiAgICApO1xuICAgIHJldHVybiBmb2N1c3NlZC5sZW5ndGggPiAwID8gZm9jdXNzZWRbMF0gOiB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==