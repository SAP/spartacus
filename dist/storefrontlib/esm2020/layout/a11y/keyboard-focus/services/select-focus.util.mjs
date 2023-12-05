/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class SelectFocusUtility {
    constructor() {
        /**
         * Query selectors used to query focusable child elements of the host element.
         * The selectors are supplemented with `:not([disabled])` and `:not([hidden])`.
         */
        this.focusableSelectors = [
            'a[href]',
            'button',
            '[tabindex]',
            'input',
            'select',
            'textarea',
        ];
        // like to leave out the following as we don't use it, and make this list exensible.
        //   `[contentEditable=true]`, // very unlikely to suport as we're not a business tool
        //   `iframe`, // we really don't like iframes...
        //   `area[href]`, // very debatable!
        this.focusableSelectorSuffix = ':not([disabled]):not([hidden]):not([aria-hidden])';
    }
    query(host, selector) {
        if (!selector || selector === '') {
            return [];
        }
        return Array.from(host?.querySelectorAll(selector));
    }
    findFirstFocusable(host, config = { autofocus: true }) {
        const selector = typeof config?.autofocus === 'string' ? config.autofocus : '[autofocus]';
        // fallback to first focusable
        return (this.query(host, selector).find((el) => !this.isHidden(el)) ||
            this.findFocusable(host).find((el) => Boolean(el)));
    }
    /**
     * returns all focusable child elements of the host element. The element selectors
     * are build from the `focusableSelectors`.
     *
     * @param host the `HTMLElement` used to query focusable elements
     * @param locked indicates whether inactive (`tabindex="-1"`) focusable elements should be returned
     * @param invisible indicates whether hidden focusable elements should be returned
     */
    findFocusable(host, locked = false, invisible = false) {
        let suffix = this.focusableSelectorSuffix;
        if (!locked) {
            suffix += `:not([tabindex='-1'])`;
        }
        const selector = this.focusableSelectors
            .map((s) => (s += suffix))
            .join(',');
        return this.query(host, selector).filter((el) => !invisible ? !this.isHidden(el) : Boolean(el));
    }
    /**
     * Indicates whether the element is hidden by CSS. There are various CSS rules and
     * HTML structures which can lead to an hidden or invisible element. An `offsetParent`
     * of null indicates that the element or any of it's decendants is hidden (`display:none`).
     *
     * Oother techniques use the visibility (`visibility: hidden`), opacity (`opacity`) or
     * phyisical location on the element itself or any of it's anchestor elements. Those
     * technique require to work with the _computed styles_, which will cause a performance
     * downgrade. We don't do this in the standard implementaton.
     */
    isHidden(el) {
        return el.offsetParent === null;
    }
}
SelectFocusUtility.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectFocusUtility, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SelectFocusUtility.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectFocusUtility, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectFocusUtility, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZvY3VzLnV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL3NlcnZpY2VzL3NlbGVjdC1mb2N1cy51dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU0zQyxNQUFNLE9BQU8sa0JBQWtCO0lBSC9CO1FBSUU7OztXQUdHO1FBQ08sdUJBQWtCLEdBQWE7WUFDdkMsU0FBUztZQUNULFFBQVE7WUFDUixZQUFZO1lBQ1osT0FBTztZQUNQLFFBQVE7WUFDUixVQUFVO1NBQ1gsQ0FBQztRQUVGLG9GQUFvRjtRQUNwRixzRkFBc0Y7UUFDdEYsaURBQWlEO1FBQ2pELHFDQUFxQztRQUUzQiw0QkFBdUIsR0FDL0IsbURBQW1ELENBQUM7S0E4RHZEO0lBNURDLEtBQUssQ0FBQyxJQUFvQyxFQUFFLFFBQWdCO1FBQzFELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxLQUFLLEVBQUUsRUFBRTtZQUNoQyxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUNmLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRLENBQTRCLENBQzVELENBQUM7SUFDSixDQUFDO0lBRUQsa0JBQWtCLENBQ2hCLElBQW9DLEVBQ3BDLFNBQTBCLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtRQUU3QyxNQUFNLFFBQVEsR0FDWixPQUFPLE1BQU0sRUFBRSxTQUFTLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDM0UsOEJBQThCO1FBQzlCLE9BQU8sQ0FDTCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ25ELENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILGFBQWEsQ0FDWCxJQUFvQyxFQUNwQyxNQUFNLEdBQUcsS0FBSyxFQUNkLFNBQVMsR0FBRyxLQUFLO1FBRWpCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxJQUFJLHVCQUF1QixDQUFDO1NBQ25DO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQjthQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDO2FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FDOUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUM5QyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNPLFFBQVEsQ0FBQyxFQUFlO1FBQ2hDLE9BQU8sRUFBRSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUM7SUFDbEMsQ0FBQzs7K0dBakZVLGtCQUFrQjttSEFBbEIsa0JBQWtCLGNBRmpCLE1BQU07MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dG9Gb2N1c0NvbmZpZyB9IGZyb20gJy4uL2tleWJvYXJkLWZvY3VzLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdEZvY3VzVXRpbGl0eSB7XG4gIC8qKlxuICAgKiBRdWVyeSBzZWxlY3RvcnMgdXNlZCB0byBxdWVyeSBmb2N1c2FibGUgY2hpbGQgZWxlbWVudHMgb2YgdGhlIGhvc3QgZWxlbWVudC5cbiAgICogVGhlIHNlbGVjdG9ycyBhcmUgc3VwcGxlbWVudGVkIHdpdGggYDpub3QoW2Rpc2FibGVkXSlgIGFuZCBgOm5vdChbaGlkZGVuXSlgLlxuICAgKi9cbiAgcHJvdGVjdGVkIGZvY3VzYWJsZVNlbGVjdG9yczogc3RyaW5nW10gPSBbXG4gICAgJ2FbaHJlZl0nLFxuICAgICdidXR0b24nLFxuICAgICdbdGFiaW5kZXhdJyxcbiAgICAnaW5wdXQnLFxuICAgICdzZWxlY3QnLFxuICAgICd0ZXh0YXJlYScsXG4gIF07XG5cbiAgLy8gbGlrZSB0byBsZWF2ZSBvdXQgdGhlIGZvbGxvd2luZyBhcyB3ZSBkb24ndCB1c2UgaXQsIGFuZCBtYWtlIHRoaXMgbGlzdCBleGVuc2libGUuXG4gIC8vICAgYFtjb250ZW50RWRpdGFibGU9dHJ1ZV1gLCAvLyB2ZXJ5IHVubGlrZWx5IHRvIHN1cG9ydCBhcyB3ZSdyZSBub3QgYSBidXNpbmVzcyB0b29sXG4gIC8vICAgYGlmcmFtZWAsIC8vIHdlIHJlYWxseSBkb24ndCBsaWtlIGlmcmFtZXMuLi5cbiAgLy8gICBgYXJlYVtocmVmXWAsIC8vIHZlcnkgZGViYXRhYmxlIVxuXG4gIHByb3RlY3RlZCBmb2N1c2FibGVTZWxlY3RvclN1ZmZpeCA9XG4gICAgJzpub3QoW2Rpc2FibGVkXSk6bm90KFtoaWRkZW5dKTpub3QoW2FyaWEtaGlkZGVuXSknO1xuXG4gIHF1ZXJ5KGhvc3Q6IEhUTUxFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZCwgc2VsZWN0b3I6IHN0cmluZyk6IEhUTUxFbGVtZW50W10ge1xuICAgIGlmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09ICcnKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKFxuICAgICAgaG9zdD8ucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD5cbiAgICApO1xuICB9XG5cbiAgZmluZEZpcnN0Rm9jdXNhYmxlKFxuICAgIGhvc3Q6IEhUTUxFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICBjb25maWc6IEF1dG9Gb2N1c0NvbmZpZyA9IHsgYXV0b2ZvY3VzOiB0cnVlIH1cbiAgKTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHNlbGVjdG9yID1cbiAgICAgIHR5cGVvZiBjb25maWc/LmF1dG9mb2N1cyA9PT0gJ3N0cmluZycgPyBjb25maWcuYXV0b2ZvY3VzIDogJ1thdXRvZm9jdXNdJztcbiAgICAvLyBmYWxsYmFjayB0byBmaXJzdCBmb2N1c2FibGVcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5xdWVyeShob3N0LCBzZWxlY3RvcikuZmluZCgoZWwpID0+ICF0aGlzLmlzSGlkZGVuKGVsKSkgfHxcbiAgICAgIHRoaXMuZmluZEZvY3VzYWJsZShob3N0KS5maW5kKChlbCkgPT4gQm9vbGVhbihlbCkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGFsbCBmb2N1c2FibGUgY2hpbGQgZWxlbWVudHMgb2YgdGhlIGhvc3QgZWxlbWVudC4gVGhlIGVsZW1lbnQgc2VsZWN0b3JzXG4gICAqIGFyZSBidWlsZCBmcm9tIHRoZSBgZm9jdXNhYmxlU2VsZWN0b3JzYC5cbiAgICpcbiAgICogQHBhcmFtIGhvc3QgdGhlIGBIVE1MRWxlbWVudGAgdXNlZCB0byBxdWVyeSBmb2N1c2FibGUgZWxlbWVudHNcbiAgICogQHBhcmFtIGxvY2tlZCBpbmRpY2F0ZXMgd2hldGhlciBpbmFjdGl2ZSAoYHRhYmluZGV4PVwiLTFcImApIGZvY3VzYWJsZSBlbGVtZW50cyBzaG91bGQgYmUgcmV0dXJuZWRcbiAgICogQHBhcmFtIGludmlzaWJsZSBpbmRpY2F0ZXMgd2hldGhlciBoaWRkZW4gZm9jdXNhYmxlIGVsZW1lbnRzIHNob3VsZCBiZSByZXR1cm5lZFxuICAgKi9cbiAgZmluZEZvY3VzYWJsZShcbiAgICBob3N0OiBIVE1MRWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgbG9ja2VkID0gZmFsc2UsXG4gICAgaW52aXNpYmxlID0gZmFsc2VcbiAgKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgbGV0IHN1ZmZpeCA9IHRoaXMuZm9jdXNhYmxlU2VsZWN0b3JTdWZmaXg7XG4gICAgaWYgKCFsb2NrZWQpIHtcbiAgICAgIHN1ZmZpeCArPSBgOm5vdChbdGFiaW5kZXg9Jy0xJ10pYDtcbiAgICB9XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLmZvY3VzYWJsZVNlbGVjdG9yc1xuICAgICAgLm1hcCgocykgPT4gKHMgKz0gc3VmZml4KSlcbiAgICAgIC5qb2luKCcsJyk7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkoaG9zdCwgc2VsZWN0b3IpLmZpbHRlcigoZWwpID0+XG4gICAgICAhaW52aXNpYmxlID8gIXRoaXMuaXNIaWRkZW4oZWwpIDogQm9vbGVhbihlbClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBlbGVtZW50IGlzIGhpZGRlbiBieSBDU1MuIFRoZXJlIGFyZSB2YXJpb3VzIENTUyBydWxlcyBhbmRcbiAgICogSFRNTCBzdHJ1Y3R1cmVzIHdoaWNoIGNhbiBsZWFkIHRvIGFuIGhpZGRlbiBvciBpbnZpc2libGUgZWxlbWVudC4gQW4gYG9mZnNldFBhcmVudGBcbiAgICogb2YgbnVsbCBpbmRpY2F0ZXMgdGhhdCB0aGUgZWxlbWVudCBvciBhbnkgb2YgaXQncyBkZWNlbmRhbnRzIGlzIGhpZGRlbiAoYGRpc3BsYXk6bm9uZWApLlxuICAgKlxuICAgKiBPb3RoZXIgdGVjaG5pcXVlcyB1c2UgdGhlIHZpc2liaWxpdHkgKGB2aXNpYmlsaXR5OiBoaWRkZW5gKSwgb3BhY2l0eSAoYG9wYWNpdHlgKSBvclxuICAgKiBwaHlpc2ljYWwgbG9jYXRpb24gb24gdGhlIGVsZW1lbnQgaXRzZWxmIG9yIGFueSBvZiBpdCdzIGFuY2hlc3RvciBlbGVtZW50cy4gVGhvc2VcbiAgICogdGVjaG5pcXVlIHJlcXVpcmUgdG8gd29yayB3aXRoIHRoZSBfY29tcHV0ZWQgc3R5bGVzXywgd2hpY2ggd2lsbCBjYXVzZSBhIHBlcmZvcm1hbmNlXG4gICAqIGRvd25ncmFkZS4gV2UgZG9uJ3QgZG8gdGhpcyBpbiB0aGUgc3RhbmRhcmQgaW1wbGVtZW50YXRvbi5cbiAgICovXG4gIHByb3RlY3RlZCBpc0hpZGRlbihlbDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZWwub2Zmc2V0UGFyZW50ID09PSBudWxsO1xuICB9XG59XG4iXX0=