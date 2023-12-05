/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { AutoFocusService } from '../autofocus/auto-focus.service';
import * as i0 from "@angular/core";
export class TabFocusService extends AutoFocusService {
    /**
     * Moves to the next (or previous) tab.
     */
    moveTab(host, config, increment, event) {
        if (config?.tab) {
            const next = config.tab === 'scroll'
                ? this.findNextScrollable(host, config, increment)
                : this.findNext(host, config, increment);
            next?.focus();
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * builds out virtual slides out of the full scrollable area, to allow
     * for maximum flexibility for the underlying layout without using hardcoded
     * slide sizes.
     */
    findNextScrollable(host, config, increment) {
        const active = this.getActiveChild(host, config);
        if (!active) {
            return;
        }
        // slide count
        const virtualSlideCount = Math.round(host.scrollWidth / host.clientWidth);
        // find current virtual slide
        const currentVirtualSlide = Math.round(active.offsetLeft / (host.scrollWidth / virtualSlideCount));
        let nextVirtualSlide = currentVirtualSlide + increment;
        if (increment === 1 /* MOVE_FOCUS.NEXT */ &&
            nextVirtualSlide >= virtualSlideCount) {
            nextVirtualSlide = 0;
        }
        if (increment === -1 /* MOVE_FOCUS.PREV */ && nextVirtualSlide < 0) {
            nextVirtualSlide = virtualSlideCount - 1;
        }
        const firstItemOnNextSlide = this.getChildren(host, config)?.find((tab) => tab.offsetLeft >=
            (host.scrollWidth / virtualSlideCount) * nextVirtualSlide);
        return firstItemOnNextSlide;
    }
    findNext(host, config, increment) {
        const childs = this.getChildren(host, config);
        let activeIndex = childs?.findIndex((c) => c === this.getActiveChild(host, config));
        if (!activeIndex || activeIndex === -1) {
            activeIndex = 0;
        }
        activeIndex += increment;
        if (increment === 1 /* MOVE_FOCUS.NEXT */ && activeIndex >= childs?.length) {
            activeIndex = childs.length - 1;
        }
        if (increment === -1 /* MOVE_FOCUS.PREV */ && activeIndex < 0) {
            activeIndex = 0;
        }
        return childs ? childs[activeIndex] : undefined;
    }
    /**
     * Returns the active focusable child element. If there's no active
     * focusable child element, the first focusable child is returned.
     */
    getActiveChild(host, config) {
        const persisted = this.getPersisted(host, config?.group);
        if (persisted) {
            return persisted;
        }
        const children = this.getChildren(host, config);
        let index = children.findIndex((tab) => this.isActive(tab));
        if (!index || index === -1) {
            index = 0;
        }
        return children[index];
    }
    getChildren(host, config) {
        if (typeof config.tab === 'string' && config.tab !== 'scroll') {
            return this.selectFocusUtil.query(host, config.tab);
        }
        else {
            return this.findFocusable(host, true);
        }
    }
    /**
     * Returns all focusable child elements of the host element.
     *
     * @param host The host element is used to query child focusable elements.
     * @param locked Indicates if locked elements (tabindex=-1) should be returned, defaults to false.
     * @param invisible Indicates if invisible child elements should be returned, defaults to false.
     */
    findFocusable(host, locked = false, invisible = false) {
        return this.selectFocusUtil.findFocusable(host, locked, invisible);
    }
    isActive(el) {
        const child = document.activeElement;
        const selector = child?.tagName;
        return (el === child ||
            (!!selector &&
                !!Array.from(el.querySelectorAll(selector)).find((e) => e === child)));
    }
}
TabFocusService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TabFocusService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
TabFocusService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TabFocusService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TabFocusService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWZvY3VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL3RhYi90YWItZm9jdXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFNbkUsTUFBTSxPQUFPLGVBQWdCLFNBQVEsZ0JBQWdCO0lBQ25EOztPQUVHO0lBQ0gsT0FBTyxDQUNMLElBQWlCLEVBQ2pCLE1BQXNCLEVBQ3RCLFNBQXFCLEVBQ3JCLEtBQW9CO1FBRXBCLElBQUksTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUNmLE1BQU0sSUFBSSxHQUNSLE1BQU0sQ0FBQyxHQUFHLEtBQUssUUFBUTtnQkFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUU3QyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFFZCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxrQkFBa0IsQ0FDMUIsSUFBaUIsRUFDakIsTUFBc0IsRUFDdEIsU0FBcUI7UUFFckIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU87U0FDUjtRQUNELGNBQWM7UUFD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LEdBQUcsS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDN0QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JEO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGFBQWEsQ0FDWCxJQUFpQixFQUNqQixNQUFNLEdBQUcsS0FBSyxFQUNkLFNBQVMsR0FBRyxLQUFLO1FBRWpCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRVMsUUFBUSxDQUFDLEVBQWU7UUFDaEMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUNyQyxNQUFNLFFBQVEsR0FBRyxLQUFLLEVBQUUsT0FBTyxDQUFDO1FBRWhDLE9BQU8sQ0FDTCxFQUFFLEtBQUssS0FBSztZQUNaLENBQUMsQ0FBQyxDQUFDLFFBQVE7Z0JBQ1QsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FDeEUsQ0FBQztJQUNKLENBQUM7OzRHQWpKVSxlQUFlO2dIQUFmLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXV0b0ZvY3VzU2VydmljZSB9IGZyb20gJy4uL2F1dG9mb2N1cy9hdXRvLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTU9WRV9GT0NVUywgVGFiRm9jdXNDb25maWcgfSBmcm9tICcuLi9rZXlib2FyZC1mb2N1cy5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBUYWJGb2N1c1NlcnZpY2UgZXh0ZW5kcyBBdXRvRm9jdXNTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBuZXh0IChvciBwcmV2aW91cykgdGFiLlxuICAgKi9cbiAgbW92ZVRhYihcbiAgICBob3N0OiBIVE1MRWxlbWVudCxcbiAgICBjb25maWc6IFRhYkZvY3VzQ29uZmlnLFxuICAgIGluY3JlbWVudDogTU9WRV9GT0NVUyxcbiAgICBldmVudDogS2V5Ym9hcmRFdmVudFxuICApOiB2b2lkIHtcbiAgICBpZiAoY29uZmlnPy50YWIpIHtcbiAgICAgIGNvbnN0IG5leHQgPVxuICAgICAgICBjb25maWcudGFiID09PSAnc2Nyb2xsJ1xuICAgICAgICAgID8gdGhpcy5maW5kTmV4dFNjcm9sbGFibGUoaG9zdCwgY29uZmlnLCBpbmNyZW1lbnQpXG4gICAgICAgICAgOiB0aGlzLmZpbmROZXh0KGhvc3QsIGNvbmZpZywgaW5jcmVtZW50KTtcblxuICAgICAgbmV4dD8uZm9jdXMoKTtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBidWlsZHMgb3V0IHZpcnR1YWwgc2xpZGVzIG91dCBvZiB0aGUgZnVsbCBzY3JvbGxhYmxlIGFyZWEsIHRvIGFsbG93XG4gICAqIGZvciBtYXhpbXVtIGZsZXhpYmlsaXR5IGZvciB0aGUgdW5kZXJseWluZyBsYXlvdXQgd2l0aG91dCB1c2luZyBoYXJkY29kZWRcbiAgICogc2xpZGUgc2l6ZXMuXG4gICAqL1xuICBwcm90ZWN0ZWQgZmluZE5leHRTY3JvbGxhYmxlKFxuICAgIGhvc3Q6IEhUTUxFbGVtZW50LFxuICAgIGNvbmZpZzogVGFiRm9jdXNDb25maWcsXG4gICAgaW5jcmVtZW50OiBNT1ZFX0ZPQ1VTXG4gICk6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZUNoaWxkKGhvc3QsIGNvbmZpZyk7XG5cbiAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBzbGlkZSBjb3VudFxuICAgIGNvbnN0IHZpcnR1YWxTbGlkZUNvdW50ID0gTWF0aC5yb3VuZChob3N0LnNjcm9sbFdpZHRoIC8gaG9zdC5jbGllbnRXaWR0aCk7XG5cbiAgICAvLyBmaW5kIGN1cnJlbnQgdmlydHVhbCBzbGlkZVxuICAgIGNvbnN0IGN1cnJlbnRWaXJ0dWFsU2xpZGUgPSBNYXRoLnJvdW5kKFxuICAgICAgYWN0aXZlLm9mZnNldExlZnQgLyAoaG9zdC5zY3JvbGxXaWR0aCAvIHZpcnR1YWxTbGlkZUNvdW50KVxuICAgICk7XG5cbiAgICBsZXQgbmV4dFZpcnR1YWxTbGlkZSA9IGN1cnJlbnRWaXJ0dWFsU2xpZGUgKyBpbmNyZW1lbnQ7XG4gICAgaWYgKFxuICAgICAgaW5jcmVtZW50ID09PSBNT1ZFX0ZPQ1VTLk5FWFQgJiZcbiAgICAgIG5leHRWaXJ0dWFsU2xpZGUgPj0gdmlydHVhbFNsaWRlQ291bnRcbiAgICApIHtcbiAgICAgIG5leHRWaXJ0dWFsU2xpZGUgPSAwO1xuICAgIH1cbiAgICBpZiAoaW5jcmVtZW50ID09PSBNT1ZFX0ZPQ1VTLlBSRVYgJiYgbmV4dFZpcnR1YWxTbGlkZSA8IDApIHtcbiAgICAgIG5leHRWaXJ0dWFsU2xpZGUgPSB2aXJ0dWFsU2xpZGVDb3VudCAtIDE7XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RJdGVtT25OZXh0U2xpZGUgPSB0aGlzLmdldENoaWxkcmVuKGhvc3QsIGNvbmZpZyk/LmZpbmQoXG4gICAgICAodGFiKSA9PlxuICAgICAgICB0YWIub2Zmc2V0TGVmdCA+PVxuICAgICAgICAoaG9zdC5zY3JvbGxXaWR0aCAvIHZpcnR1YWxTbGlkZUNvdW50KSAqIG5leHRWaXJ0dWFsU2xpZGVcbiAgICApO1xuXG4gICAgcmV0dXJuIGZpcnN0SXRlbU9uTmV4dFNsaWRlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGZpbmROZXh0KFxuICAgIGhvc3Q6IEhUTUxFbGVtZW50LFxuICAgIGNvbmZpZzogVGFiRm9jdXNDb25maWcsXG4gICAgaW5jcmVtZW50OiBNT1ZFX0ZPQ1VTXG4gICk6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBjaGlsZHMgPSB0aGlzLmdldENoaWxkcmVuKGhvc3QsIGNvbmZpZyk7XG4gICAgbGV0IGFjdGl2ZUluZGV4ID0gY2hpbGRzPy5maW5kSW5kZXgoXG4gICAgICAoYykgPT4gYyA9PT0gdGhpcy5nZXRBY3RpdmVDaGlsZChob3N0LCBjb25maWcpXG4gICAgKTtcblxuICAgIGlmICghYWN0aXZlSW5kZXggfHwgYWN0aXZlSW5kZXggPT09IC0xKSB7XG4gICAgICBhY3RpdmVJbmRleCA9IDA7XG4gICAgfVxuICAgIGFjdGl2ZUluZGV4ICs9IGluY3JlbWVudDtcblxuICAgIGlmIChpbmNyZW1lbnQgPT09IE1PVkVfRk9DVVMuTkVYVCAmJiBhY3RpdmVJbmRleCA+PSBjaGlsZHM/Lmxlbmd0aCkge1xuICAgICAgYWN0aXZlSW5kZXggPSBjaGlsZHMubGVuZ3RoIC0gMTtcbiAgICB9XG4gICAgaWYgKGluY3JlbWVudCA9PT0gTU9WRV9GT0NVUy5QUkVWICYmIGFjdGl2ZUluZGV4IDwgMCkge1xuICAgICAgYWN0aXZlSW5kZXggPSAwO1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRzID8gY2hpbGRzW2FjdGl2ZUluZGV4XSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBhY3RpdmUgZm9jdXNhYmxlIGNoaWxkIGVsZW1lbnQuIElmIHRoZXJlJ3Mgbm8gYWN0aXZlXG4gICAqIGZvY3VzYWJsZSBjaGlsZCBlbGVtZW50LCB0aGUgZmlyc3QgZm9jdXNhYmxlIGNoaWxkIGlzIHJldHVybmVkLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEFjdGl2ZUNoaWxkKFxuICAgIGhvc3Q6IEhUTUxFbGVtZW50LFxuICAgIGNvbmZpZzogVGFiRm9jdXNDb25maWdcbiAgKTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IHBlcnNpc3RlZCA9IHRoaXMuZ2V0UGVyc2lzdGVkKGhvc3QsIGNvbmZpZz8uZ3JvdXApO1xuICAgIGlmIChwZXJzaXN0ZWQpIHtcbiAgICAgIHJldHVybiBwZXJzaXN0ZWQ7XG4gICAgfVxuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5nZXRDaGlsZHJlbihob3N0LCBjb25maWcpO1xuICAgIGxldCBpbmRleCA9IGNoaWxkcmVuLmZpbmRJbmRleCgodGFiKSA9PiB0aGlzLmlzQWN0aXZlKHRhYikpO1xuICAgIGlmICghaW5kZXggfHwgaW5kZXggPT09IC0xKSB7XG4gICAgICBpbmRleCA9IDA7XG4gICAgfVxuICAgIHJldHVybiBjaGlsZHJlbltpbmRleF07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q2hpbGRyZW4oXG4gICAgaG9zdDogSFRNTEVsZW1lbnQsXG4gICAgY29uZmlnOiBUYWJGb2N1c0NvbmZpZ1xuICApOiBIVE1MRWxlbWVudFtdIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZy50YWIgPT09ICdzdHJpbmcnICYmIGNvbmZpZy50YWIgIT09ICdzY3JvbGwnKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RGb2N1c1V0aWwucXVlcnkoaG9zdCwgY29uZmlnLnRhYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbmRGb2N1c2FibGUoaG9zdCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIGZvY3VzYWJsZSBjaGlsZCBlbGVtZW50cyBvZiB0aGUgaG9zdCBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0gaG9zdCBUaGUgaG9zdCBlbGVtZW50IGlzIHVzZWQgdG8gcXVlcnkgY2hpbGQgZm9jdXNhYmxlIGVsZW1lbnRzLlxuICAgKiBAcGFyYW0gbG9ja2VkIEluZGljYXRlcyBpZiBsb2NrZWQgZWxlbWVudHMgKHRhYmluZGV4PS0xKSBzaG91bGQgYmUgcmV0dXJuZWQsIGRlZmF1bHRzIHRvIGZhbHNlLlxuICAgKiBAcGFyYW0gaW52aXNpYmxlIEluZGljYXRlcyBpZiBpbnZpc2libGUgY2hpbGQgZWxlbWVudHMgc2hvdWxkIGJlIHJldHVybmVkLCBkZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIGZpbmRGb2N1c2FibGUoXG4gICAgaG9zdDogSFRNTEVsZW1lbnQsXG4gICAgbG9ja2VkID0gZmFsc2UsXG4gICAgaW52aXNpYmxlID0gZmFsc2VcbiAgKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0Rm9jdXNVdGlsLmZpbmRGb2N1c2FibGUoaG9zdCwgbG9ja2VkLCBpbnZpc2libGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQWN0aXZlKGVsOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNoaWxkID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBjb25zdCBzZWxlY3RvciA9IGNoaWxkPy50YWdOYW1lO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIGVsID09PSBjaGlsZCB8fFxuICAgICAgKCEhc2VsZWN0b3IgJiZcbiAgICAgICAgISFBcnJheS5mcm9tKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKS5maW5kKChlKSA9PiBlID09PSBjaGlsZCkpXG4gICAgKTtcbiAgfVxufVxuIl19