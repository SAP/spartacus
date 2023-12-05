/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, HostBinding, HostListener, } from '@angular/core';
import { BlockFocusDirective } from '../block/block-focus.directive';
import { FOCUS_ATTR } from '../keyboard-focus.model';
import * as i0 from "@angular/core";
import * as i1 from "./persist-focus.service";
/**
 * Directive that provides persistence of the focused state. This is useful
 * when a group of focusable elements got refocused or even recreated. That
 * happens often when the DOM is constructed with an `*ngIf` or `*ngFor`.
 *
 * The focus state is based on a configured _key_, which can be passed in the
 * config input, either by using a string primitive or `PersistFocusConfig.key`:
 *
 * ```html
 * <button cxPersistFocus="myKey"></button>
 * <button cxFocus="myKey"></button>
 * <button [cxFocus]="{{key:'myKey'}"></button>
 * ```
 *
 * The focus state can be part of a focus _group_, so that the state is shared
 * and remember for the given group. In order to detect the persistence for a
 * given element, we store the persistence key as a data attribute (`data-cx-focus`):
 *
 * ```html
 * <button data-cx-focus="myKey"></button>
 * ```
 *
 * Other keyboard focus directives can read the key to understand whether the element
 * should retrieve focus.
 *
 */
export class PersistFocusDirective extends BlockFocusDirective {
    handleFocus(event) {
        this.service.set(this.key, this.group);
        event?.preventDefault();
        event?.stopPropagation();
    }
    constructor(elementRef, service) {
        super(elementRef, service);
        this.elementRef = elementRef;
        this.service = service;
        this.defaultConfig = {};
        /**
         * The persistence key can be passed directly or through the `FocusConfig.key`.
         * While this could be considered a global key, the likeliness of conflicts
         * is very small since the key is cleared when the focus is changed.
         */
        // @Input('cxPersistFocus')
        this.config = {};
    }
    ngOnInit() {
        super.ngOnInit();
        this.attr = this.key ? this.key : undefined;
    }
    setDefaultConfiguration() {
        if (typeof this.config === 'string' && this.config !== '') {
            this.config = { key: this.config };
        }
        super.setDefaultConfiguration();
    }
    /**
     * Focus the element explicitly if it was focused before.
     */
    ngAfterViewInit() {
        if (this.isPersisted) {
            this.host.focus({ preventScroll: true });
        }
    }
    get isPersisted() {
        return !!this.key && this.service.get(this.group) === this.key;
    }
    /**
     * Returns the key for the host element, which is used to persist the
     * focus state. This is useful in cases where the DOM is rebuild.
     */
    get key() {
        return this.config?.key;
    }
    /**
     * returns the persistence group (if any) for the focusable elements.
     */
    get group() {
        return this.service.getPersistenceGroup(this.host, this.config);
    }
}
PersistFocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersistFocusDirective, deps: [{ token: i0.ElementRef }, { token: i1.PersistFocusService }], target: i0.ɵɵFactoryTarget.Directive });
PersistFocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: PersistFocusDirective, host: { listeners: { "focus": "handleFocus($event)" }, properties: { "attr.data-cx-focus": "this.attr" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersistFocusDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.PersistFocusService }]; }, propDecorators: { attr: [{
                type: HostBinding,
                args: [`attr.${FOCUS_ATTR}`]
            }], handleFocus: [{
                type: HostListener,
                args: ['focus', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc2lzdC1mb2N1cy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL3BlcnNpc3QvcGVyc2lzdC1mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFFTCxTQUFTLEVBRVQsV0FBVyxFQUNYLFlBQVksR0FFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFzQixNQUFNLHlCQUF5QixDQUFDOzs7QUFHekU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFFSCxNQUFNLE9BQU8scUJBQ1gsU0FBUSxtQkFBbUI7SUFxQjNCLFdBQVcsQ0FBQyxLQUFxQjtRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2QyxLQUFLLEVBQUUsY0FBYyxFQUFFLENBQUM7UUFDeEIsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxZQUNZLFVBQXNCLEVBQ3RCLE9BQTRCO1FBRXRDLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFIakIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixZQUFPLEdBQVAsT0FBTyxDQUFxQjtRQTNCOUIsa0JBQWEsR0FBdUIsRUFBRSxDQUFDO1FBRWpEOzs7O1dBSUc7UUFDSCwyQkFBMkI7UUFDakIsV0FBTSxHQUF1QixFQUFFLENBQUM7SUFzQjFDLENBQUM7SUFFRCxRQUFRO1FBQ04sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzlDLENBQUM7SUFFUyx1QkFBdUI7UUFDL0IsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFO1lBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3BDO1FBQ0QsS0FBSyxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVELElBQWMsV0FBVztRQUN2QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFjLEdBQUc7UUFDZixPQUFRLElBQUksQ0FBQyxNQUE2QixFQUFFLEdBQUcsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFjLEtBQUs7UUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUNyQyxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxNQUE0QixDQUNsQyxDQUFDO0lBQ0osQ0FBQzs7a0hBN0VVLHFCQUFxQjtzR0FBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFNBQVM7bUlBb0IyQixJQUFJO3NCQUF0QyxXQUFXO3VCQUFDLFFBQVEsVUFBVSxFQUFFO2dCQUdqQyxXQUFXO3NCQURWLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmxvY2tGb2N1c0RpcmVjdGl2ZSB9IGZyb20gJy4uL2Jsb2NrL2Jsb2NrLWZvY3VzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGT0NVU19BVFRSLCBQZXJzaXN0Rm9jdXNDb25maWcgfSBmcm9tICcuLi9rZXlib2FyZC1mb2N1cy5tb2RlbCc7XG5pbXBvcnQgeyBQZXJzaXN0Rm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9wZXJzaXN0LWZvY3VzLnNlcnZpY2UnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IHByb3ZpZGVzIHBlcnNpc3RlbmNlIG9mIHRoZSBmb2N1c2VkIHN0YXRlLiBUaGlzIGlzIHVzZWZ1bFxuICogd2hlbiBhIGdyb3VwIG9mIGZvY3VzYWJsZSBlbGVtZW50cyBnb3QgcmVmb2N1c2VkIG9yIGV2ZW4gcmVjcmVhdGVkLiBUaGF0XG4gKiBoYXBwZW5zIG9mdGVuIHdoZW4gdGhlIERPTSBpcyBjb25zdHJ1Y3RlZCB3aXRoIGFuIGAqbmdJZmAgb3IgYCpuZ0ZvcmAuXG4gKlxuICogVGhlIGZvY3VzIHN0YXRlIGlzIGJhc2VkIG9uIGEgY29uZmlndXJlZCBfa2V5Xywgd2hpY2ggY2FuIGJlIHBhc3NlZCBpbiB0aGVcbiAqIGNvbmZpZyBpbnB1dCwgZWl0aGVyIGJ5IHVzaW5nIGEgc3RyaW5nIHByaW1pdGl2ZSBvciBgUGVyc2lzdEZvY3VzQ29uZmlnLmtleWA6XG4gKlxuICogYGBgaHRtbFxuICogPGJ1dHRvbiBjeFBlcnNpc3RGb2N1cz1cIm15S2V5XCI+PC9idXR0b24+XG4gKiA8YnV0dG9uIGN4Rm9jdXM9XCJteUtleVwiPjwvYnV0dG9uPlxuICogPGJ1dHRvbiBbY3hGb2N1c109XCJ7e2tleTonbXlLZXknfVwiPjwvYnV0dG9uPlxuICogYGBgXG4gKlxuICogVGhlIGZvY3VzIHN0YXRlIGNhbiBiZSBwYXJ0IG9mIGEgZm9jdXMgX2dyb3VwXywgc28gdGhhdCB0aGUgc3RhdGUgaXMgc2hhcmVkXG4gKiBhbmQgcmVtZW1iZXIgZm9yIHRoZSBnaXZlbiBncm91cC4gSW4gb3JkZXIgdG8gZGV0ZWN0IHRoZSBwZXJzaXN0ZW5jZSBmb3IgYVxuICogZ2l2ZW4gZWxlbWVudCwgd2Ugc3RvcmUgdGhlIHBlcnNpc3RlbmNlIGtleSBhcyBhIGRhdGEgYXR0cmlidXRlIChgZGF0YS1jeC1mb2N1c2ApOlxuICpcbiAqIGBgYGh0bWxcbiAqIDxidXR0b24gZGF0YS1jeC1mb2N1cz1cIm15S2V5XCI+PC9idXR0b24+XG4gKiBgYGBcbiAqXG4gKiBPdGhlciBrZXlib2FyZCBmb2N1cyBkaXJlY3RpdmVzIGNhbiByZWFkIHRoZSBrZXkgdG8gdW5kZXJzdGFuZCB3aGV0aGVyIHRoZSBlbGVtZW50XG4gKiBzaG91bGQgcmV0cmlldmUgZm9jdXMuXG4gKlxuICovXG5ARGlyZWN0aXZlKCkgLy8gc2VsZWN0b3I6ICdbY3hQZXJzaXN0Rm9jdXNdJyxcbmV4cG9ydCBjbGFzcyBQZXJzaXN0Rm9jdXNEaXJlY3RpdmVcbiAgZXh0ZW5kcyBCbG9ja0ZvY3VzRGlyZWN0aXZlXG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0XG57XG4gIHByb3RlY3RlZCBkZWZhdWx0Q29uZmlnOiBQZXJzaXN0Rm9jdXNDb25maWcgPSB7fTtcblxuICAvKipcbiAgICogVGhlIHBlcnNpc3RlbmNlIGtleSBjYW4gYmUgcGFzc2VkIGRpcmVjdGx5IG9yIHRocm91Z2ggdGhlIGBGb2N1c0NvbmZpZy5rZXlgLlxuICAgKiBXaGlsZSB0aGlzIGNvdWxkIGJlIGNvbnNpZGVyZWQgYSBnbG9iYWwga2V5LCB0aGUgbGlrZWxpbmVzcyBvZiBjb25mbGljdHNcbiAgICogaXMgdmVyeSBzbWFsbCBzaW5jZSB0aGUga2V5IGlzIGNsZWFyZWQgd2hlbiB0aGUgZm9jdXMgaXMgY2hhbmdlZC5cbiAgICovXG4gIC8vIEBJbnB1dCgnY3hQZXJzaXN0Rm9jdXMnKVxuICBwcm90ZWN0ZWQgY29uZmlnOiBQZXJzaXN0Rm9jdXNDb25maWcgPSB7fTtcblxuICAvKipcbiAgICogVGhlIHBlcnNpc3RlbmNlIGtleSBpcyBtYWludGFpbmVkIGluIGFuIGVsZW1lbnQgYXR0cmlidXRlIGZvciBvdGhlclxuICAgKiBpbXBsZW1lbnRhdGlvbnMuIFRoaXMgaXMgbmVlZGVkIHRvIGVuc3VyZSB0aGF0IHdlIGNhbiByZXNvbHZlIHRoZSBmb2N1c1xuICAgKiBzdGF0ZSBpbiBjYXNlIG9mIGEgcmVwYWludC5cbiAgICovXG4gIEBIb3N0QmluZGluZyhgYXR0ci4ke0ZPQ1VTX0FUVFJ9YCkgYXR0cjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgWyckZXZlbnQnXSlcbiAgaGFuZGxlRm9jdXMoZXZlbnQ/OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy5zZXJ2aWNlLnNldCh0aGlzLmtleSwgdGhpcy5ncm91cCk7XG5cbiAgICBldmVudD8ucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudD8uc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgc2VydmljZTogUGVyc2lzdEZvY3VzU2VydmljZVxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBzZXJ2aWNlKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5hdHRyID0gdGhpcy5rZXkgPyB0aGlzLmtleSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXREZWZhdWx0Q29uZmlndXJhdGlvbigpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnID09PSAnc3RyaW5nJyAmJiB0aGlzLmNvbmZpZyAhPT0gJycpIHtcbiAgICAgIHRoaXMuY29uZmlnID0geyBrZXk6IHRoaXMuY29uZmlnIH07XG4gICAgfVxuICAgIHN1cGVyLnNldERlZmF1bHRDb25maWd1cmF0aW9uKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXMgdGhlIGVsZW1lbnQgZXhwbGljaXRseSBpZiBpdCB3YXMgZm9jdXNlZCBiZWZvcmUuXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuaXNQZXJzaXN0ZWQpIHtcbiAgICAgIHRoaXMuaG9zdC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBpc1BlcnNpc3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmtleSAmJiB0aGlzLnNlcnZpY2UuZ2V0KHRoaXMuZ3JvdXApID09PSB0aGlzLmtleTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBrZXkgZm9yIHRoZSBob3N0IGVsZW1lbnQsIHdoaWNoIGlzIHVzZWQgdG8gcGVyc2lzdCB0aGVcbiAgICogZm9jdXMgc3RhdGUuIFRoaXMgaXMgdXNlZnVsIGluIGNhc2VzIHdoZXJlIHRoZSBET00gaXMgcmVidWlsZC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXQga2V5KCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuICh0aGlzLmNvbmZpZyBhcyBQZXJzaXN0Rm9jdXNDb25maWcpPy5rZXk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyB0aGUgcGVyc2lzdGVuY2UgZ3JvdXAgKGlmIGFueSkgZm9yIHRoZSBmb2N1c2FibGUgZWxlbWVudHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IGdyb3VwKCk6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0UGVyc2lzdGVuY2VHcm91cChcbiAgICAgIHRoaXMuaG9zdCxcbiAgICAgIHRoaXMuY29uZmlnIGFzIFBlcnNpc3RGb2N1c0NvbmZpZ1xuICAgICk7XG4gIH1cbn1cbiJdfQ==