/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, Input, Optional, } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./page-layout.service";
/**
 * Directive that Adds a style class to the host element based on the cms page
 * template. The CMS page template is driven by the CMS structure, which is configurable
 * in the backend.
 *
 * The style class is added to the host element of the directive. The host element is resolved
 * from the `elementRef`, or, in case the directive is used in an `ng-template`, by the
 * `TemplateRef`.
 *
 * An example of the usage is given below:
 *
 * ```html
 * <cx-storefront class="LandingPageTemplate">
 *   <ng-template cxPageTemplateStyle>...</ng-template>
 * <cx-storefront>
 * ```
 *
 * The style class can also be provided by an input:
 *
 * ```html
 * <ng-template [cxPageTemplateStyle]="pageTemplateName">
 * ```
 *
 */
export class PageTemplateDirective {
    /**
     * Adds a style class to the host element based on the cms page template, unless
     * the class is given as an input.
     *
     * The host element is either the actual host, or the parent element in case this
     * is used inside an `ng-template`.
     */
    set setTemplate(template) {
        if (template && template !== '') {
            this.useTemplateFromInput = true;
            this.addStyleClass(template);
        }
        else if (this.useTemplateFromInput) {
            // we only clear the template if it has been provided by the input before
            this.clear();
        }
    }
    constructor(pageLayoutService, elementRef, templateRef, cd) {
        this.pageLayoutService = pageLayoutService;
        this.elementRef = elementRef;
        this.templateRef = templateRef;
        this.cd = cd;
        // Maintains the page template subscription
        this.subscription = new Subscription();
    }
    ngOnInit() {
        if (!this.useTemplateFromInput) {
            this.subscription.add(this.pageLayoutService.templateName$.subscribe((template) => this.addStyleClass(template)));
        }
    }
    /**
     * Adds the page template as a style class to the given element. If any
     * page template was added before, we clean it up.
     *
     * We'll not use hostBinding for the style class, as it will potential drop
     * an existing class name on the host. This is why we need to work with
     * the lower level change detection api.
     */
    addStyleClass(template, el) {
        this.clear(el);
        if (template) {
            this.currentTemplate = template;
            (el ?? this.host).classList.add(this.currentTemplate);
            this.cd.markForCheck();
        }
    }
    /**
     * Cleans up the class host binding, if a template class was assigned before.
     */
    clear(el) {
        if (this.currentTemplate) {
            (el ?? this.host).classList?.remove(this.currentTemplate);
            this.cd.markForCheck();
        }
    }
    /**
     * Returns the host element (`HTMLElement`).
     *
     * If the directive is used on an `ng-template`, we take the parent element,
     * to ensure that we're not ending up with a comment.
     */
    get host() {
        return !!this.templateRef
            ? this.templateRef.elementRef.nativeElement.parentElement
            : this.elementRef.nativeElement;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
PageTemplateDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageTemplateDirective, deps: [{ token: i1.PageLayoutService }, { token: i0.ElementRef }, { token: i0.TemplateRef, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
PageTemplateDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: PageTemplateDirective, selector: "[cxPageTemplateStyle]", inputs: { setTemplate: ["cxPageTemplateStyle", "setTemplate"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageTemplateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxPageTemplateStyle]',
                }]
        }], ctorParameters: function () { return [{ type: i1.PageLayoutService }, { type: i0.ElementRef }, { type: i0.TemplateRef, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { setTemplate: [{
                type: Input,
                args: ['cxPageTemplateStyle']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS10ZW1wbGF0ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9wYWdlLWxheW91dC9wYWdlLXRlbXBsYXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUVMLFNBQVMsRUFFVCxLQUFLLEVBR0wsUUFBUSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUdwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFJSCxNQUFNLE9BQU8scUJBQXFCO0lBT2hDOzs7Ozs7T0FNRztJQUNILElBQWtDLFdBQVcsQ0FBQyxRQUFnQjtRQUM1RCxJQUFJLFFBQVEsSUFBSSxRQUFRLEtBQUssRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7WUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QjthQUFNLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQ3BDLHlFQUF5RTtZQUN6RSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtJQUNILENBQUM7SUFXRCxZQUNZLGlCQUFvQyxFQUNwQyxVQUFzQixFQUNWLFdBQXFDLEVBQ2pELEVBQXFCO1FBSHJCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNWLGdCQUFXLEdBQVgsV0FBVyxDQUEwQjtRQUNqRCxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWJqQywyQ0FBMkM7UUFDakMsaUJBQVksR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWF2RCxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDN0IsQ0FDRixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNPLGFBQWEsQ0FBQyxRQUFnQixFQUFFLEVBQWdCO1FBQ3hELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDZixJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1lBQ2hDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ08sS0FBSyxDQUFDLEVBQWdCO1FBQzlCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILElBQWMsSUFBSTtRQUNoQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVztZQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWE7WUFDekQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOztrSEEzRlUscUJBQXFCO3NHQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFIakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2lCQUNsQzs7MEJBcUNJLFFBQVE7NEVBdEJ1QixXQUFXO3NCQUE1QyxLQUFLO3VCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUGFnZUxheW91dFNlcnZpY2UgfSBmcm9tICcuL3BhZ2UtbGF5b3V0LnNlcnZpY2UnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IEFkZHMgYSBzdHlsZSBjbGFzcyB0byB0aGUgaG9zdCBlbGVtZW50IGJhc2VkIG9uIHRoZSBjbXMgcGFnZVxuICogdGVtcGxhdGUuIFRoZSBDTVMgcGFnZSB0ZW1wbGF0ZSBpcyBkcml2ZW4gYnkgdGhlIENNUyBzdHJ1Y3R1cmUsIHdoaWNoIGlzIGNvbmZpZ3VyYWJsZVxuICogaW4gdGhlIGJhY2tlbmQuXG4gKlxuICogVGhlIHN0eWxlIGNsYXNzIGlzIGFkZGVkIHRvIHRoZSBob3N0IGVsZW1lbnQgb2YgdGhlIGRpcmVjdGl2ZS4gVGhlIGhvc3QgZWxlbWVudCBpcyByZXNvbHZlZFxuICogZnJvbSB0aGUgYGVsZW1lbnRSZWZgLCBvciwgaW4gY2FzZSB0aGUgZGlyZWN0aXZlIGlzIHVzZWQgaW4gYW4gYG5nLXRlbXBsYXRlYCwgYnkgdGhlXG4gKiBgVGVtcGxhdGVSZWZgLlxuICpcbiAqIEFuIGV4YW1wbGUgb2YgdGhlIHVzYWdlIGlzIGdpdmVuIGJlbG93OlxuICpcbiAqIGBgYGh0bWxcbiAqIDxjeC1zdG9yZWZyb250IGNsYXNzPVwiTGFuZGluZ1BhZ2VUZW1wbGF0ZVwiPlxuICogICA8bmctdGVtcGxhdGUgY3hQYWdlVGVtcGxhdGVTdHlsZT4uLi48L25nLXRlbXBsYXRlPlxuICogPGN4LXN0b3JlZnJvbnQ+XG4gKiBgYGBcbiAqXG4gKiBUaGUgc3R5bGUgY2xhc3MgY2FuIGFsc28gYmUgcHJvdmlkZWQgYnkgYW4gaW5wdXQ6XG4gKlxuICogYGBgaHRtbFxuICogPG5nLXRlbXBsYXRlIFtjeFBhZ2VUZW1wbGF0ZVN0eWxlXT1cInBhZ2VUZW1wbGF0ZU5hbWVcIj5cbiAqIGBgYFxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2N4UGFnZVRlbXBsYXRlU3R5bGVdJyxcbn0pXG5leHBvcnQgY2xhc3MgUGFnZVRlbXBsYXRlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBjb21wb25lbnQgaXMgZHJpdmVuIGJ5IGFuIGlucHV0IHRlbXBsYXRlIG9yIHNob3VsZFxuICAgKiBvYnNlcnZlIHRoZSBDTVMgZHJpdmVuIHBhZ2UgbGF5b3V0IHRlbXBsYXRlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHVzZVRlbXBsYXRlRnJvbUlucHV0OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgc3R5bGUgY2xhc3MgdG8gdGhlIGhvc3QgZWxlbWVudCBiYXNlZCBvbiB0aGUgY21zIHBhZ2UgdGVtcGxhdGUsIHVubGVzc1xuICAgKiB0aGUgY2xhc3MgaXMgZ2l2ZW4gYXMgYW4gaW5wdXQuXG4gICAqXG4gICAqIFRoZSBob3N0IGVsZW1lbnQgaXMgZWl0aGVyIHRoZSBhY3R1YWwgaG9zdCwgb3IgdGhlIHBhcmVudCBlbGVtZW50IGluIGNhc2UgdGhpc1xuICAgKiBpcyB1c2VkIGluc2lkZSBhbiBgbmctdGVtcGxhdGVgLlxuICAgKi9cbiAgQElucHV0KCdjeFBhZ2VUZW1wbGF0ZVN0eWxlJykgc2V0IHNldFRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcpIHtcbiAgICBpZiAodGVtcGxhdGUgJiYgdGVtcGxhdGUgIT09ICcnKSB7XG4gICAgICB0aGlzLnVzZVRlbXBsYXRlRnJvbUlucHV0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYWRkU3R5bGVDbGFzcyh0ZW1wbGF0ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVzZVRlbXBsYXRlRnJvbUlucHV0KSB7XG4gICAgICAvLyB3ZSBvbmx5IGNsZWFyIHRoZSB0ZW1wbGF0ZSBpZiBpdCBoYXMgYmVlbiBwcm92aWRlZCBieSB0aGUgaW5wdXQgYmVmb3JlXG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gTWFpbnRhaW5zIHRoZSBwYWdlIHRlbXBsYXRlIHN1YnNjcmlwdGlvblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgLyoqXG4gICAqIEhvbGRzIHRoZSBjdXJyZW50IHBhZ2UgdGVtcGxhdGUsIHNvIHdlIGNhbiByZW1vdmUgcHJldmlvdXMgcGFnZSB0ZW1wbGF0ZXNcbiAgICogZnJvbSB0aGUgZWxlbWVudCBjbGFzc0xpc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgY3VycmVudFRlbXBsYXRlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHBhZ2VMYXlvdXRTZXJ2aWNlOiBQYWdlTGF5b3V0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPEhUTUxFbGVtZW50PixcbiAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudXNlVGVtcGxhdGVGcm9tSW5wdXQpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgICAgdGhpcy5wYWdlTGF5b3V0U2VydmljZS50ZW1wbGF0ZU5hbWUkLnN1YnNjcmliZSgodGVtcGxhdGUpID0+XG4gICAgICAgICAgdGhpcy5hZGRTdHlsZUNsYXNzKHRlbXBsYXRlKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBwYWdlIHRlbXBsYXRlIGFzIGEgc3R5bGUgY2xhc3MgdG8gdGhlIGdpdmVuIGVsZW1lbnQuIElmIGFueVxuICAgKiBwYWdlIHRlbXBsYXRlIHdhcyBhZGRlZCBiZWZvcmUsIHdlIGNsZWFuIGl0IHVwLlxuICAgKlxuICAgKiBXZSdsbCBub3QgdXNlIGhvc3RCaW5kaW5nIGZvciB0aGUgc3R5bGUgY2xhc3MsIGFzIGl0IHdpbGwgcG90ZW50aWFsIGRyb3BcbiAgICogYW4gZXhpc3RpbmcgY2xhc3MgbmFtZSBvbiB0aGUgaG9zdC4gVGhpcyBpcyB3aHkgd2UgbmVlZCB0byB3b3JrIHdpdGhcbiAgICogdGhlIGxvd2VyIGxldmVsIGNoYW5nZSBkZXRlY3Rpb24gYXBpLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFkZFN0eWxlQ2xhc3ModGVtcGxhdGU6IHN0cmluZywgZWw/OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXIoZWwpO1xuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgdGhpcy5jdXJyZW50VGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAgIChlbCA/PyB0aGlzLmhvc3QpLmNsYXNzTGlzdC5hZGQodGhpcy5jdXJyZW50VGVtcGxhdGUpO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYW5zIHVwIHRoZSBjbGFzcyBob3N0IGJpbmRpbmcsIGlmIGEgdGVtcGxhdGUgY2xhc3Mgd2FzIGFzc2lnbmVkIGJlZm9yZS5cbiAgICovXG4gIHByb3RlY3RlZCBjbGVhcihlbD86IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFRlbXBsYXRlKSB7XG4gICAgICAoZWwgPz8gdGhpcy5ob3N0KS5jbGFzc0xpc3Q/LnJlbW92ZSh0aGlzLmN1cnJlbnRUZW1wbGF0ZSk7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBob3N0IGVsZW1lbnQgKGBIVE1MRWxlbWVudGApLlxuICAgKlxuICAgKiBJZiB0aGUgZGlyZWN0aXZlIGlzIHVzZWQgb24gYW4gYG5nLXRlbXBsYXRlYCwgd2UgdGFrZSB0aGUgcGFyZW50IGVsZW1lbnQsXG4gICAqIHRvIGVuc3VyZSB0aGF0IHdlJ3JlIG5vdCBlbmRpbmcgdXAgd2l0aCBhIGNvbW1lbnQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IGhvc3QoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiAhIXRoaXMudGVtcGxhdGVSZWZcbiAgICAgID8gdGhpcy50ZW1wbGF0ZVJlZi5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICAgOiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==