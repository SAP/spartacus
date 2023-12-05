/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, HostBinding, Input, } from '@angular/core';
import { DirectionMode } from '../../../layout/direction/config/direction.model';
import * as i0 from "@angular/core";
import * as i1 from "./icon-loader.service";
/**
 *
 * The icon component can be added in different ways:
 *
 * With the component selector:
 * `<cx-icon type="SEARCH"></cx-icon>`
 *
 * With the attribute selector:
 * `<span cxIcon="STAR"></span>`
 *
 * Additionally, content can be projected to the icon:
 *
 * `<button cxIcon="HAPPY">happy label</button>`
 *
 * The above button would become (based on a TEXT resource type):
 * `<button>😊happy label</button>`
 *
 * While the content is projected, the icon itself doesn't require an
 * additional DOM node which is an advantage over the component selector.
 */
export class IconComponent {
    /**
     * The cxIcon directive is bound to the icon type. You can feed the `ICON_TYPE` to
     * accomplish a configurable button in the UI.
     */
    set cxIcon(type) {
        this.setIcon(type);
    }
    /**
     * The type input parameter is bound to the icon type. You can feed the `ICON_TYPE` to
     * accomplish a configurable button in the UI.
     */
    set type(type) {
        this.setIcon(type);
    }
    constructor(iconLoader, elementRef, renderer) {
        this.iconLoader = iconLoader;
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    setIcon(type) {
        if (!type || type === '') {
            return;
        }
        this.icon = this.iconLoader.getHtml(type);
        this.addStyleClasses(type);
        this.iconLoader.addLinkResource(type);
        this.flipIcon(type);
    }
    /**
     * The icons supports flipping for some icons to support rtl and ltr directions.
     */
    flipIcon(type) {
        // TODO: this can be dropped with the next major release.
        if (!this.iconLoader.getFlipDirection) {
            return;
        }
        const iconDirection = this.iconLoader.getFlipDirection(type);
        this.flipAtLtr = iconDirection === DirectionMode.LTR;
        this.flipAtRtl = iconDirection === DirectionMode.RTL;
    }
    /**
     * Adds the style classes and the link resource (if available).
     */
    addStyleClasses(type) {
        this.renderer.addClass(this.host, 'cx-icon');
        this.styleClasses?.forEach((cls) => this.renderer.removeClass(this.host, cls));
        this.styleClasses = this.iconLoader.getStyleClasses(type)?.split(' ');
        this.styleClasses?.forEach((cls) => {
            if (cls !== '') {
                this.renderer.addClass(this.host, cls);
            }
        });
    }
    get host() {
        return this.elementRef.nativeElement;
    }
}
IconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IconComponent, deps: [{ token: i1.IconLoaderService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
IconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: IconComponent, selector: "cx-icon,[cxIcon]", inputs: { cxIcon: "cxIcon", type: "type" }, host: { properties: { "class.flip-at-rtl": "this.flipAtRtl", "class.flip-at-ltr": "this.flipAtLtr" } }, ngImport: i0, template: "<i [outerHTML]=\"icon\"></i><ng-content></ng-content>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-icon,[cxIcon]', template: "<i [outerHTML]=\"icon\"></i><ng-content></ng-content>\n" }]
        }], ctorParameters: function () { return [{ type: i1.IconLoaderService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { cxIcon: [{
                type: Input
            }], type: [{
                type: Input
            }], flipAtRtl: [{
                type: HostBinding,
                args: ['class.flip-at-rtl']
            }], flipAtLtr: [{
                type: HostBinding,
                args: ['class.flip-at-ltr']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL21pc2MvaWNvbi9pY29uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbWlzYy9pY29uL2ljb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBRVQsV0FBVyxFQUNYLEtBQUssR0FFTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0RBQWtELENBQUM7OztBQU1qRjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUtILE1BQU0sT0FBTyxhQUFhO0lBQ3hCOzs7T0FHRztJQUNILElBQWEsTUFBTSxDQUFDLElBQWU7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBYSxJQUFJLENBQUMsSUFBZTtRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUF1QkQsWUFDWSxVQUE2QixFQUM3QixVQUFtQyxFQUNuQyxRQUFtQjtRQUZuQixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQzVCLENBQUM7SUFFTSxPQUFPLENBQUMsSUFBZTtRQUMvQixJQUFJLENBQUMsSUFBSSxJQUFZLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDaEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ08sUUFBUSxDQUFDLElBQWU7UUFDaEMseURBQXlEO1FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFO1lBQ3JDLE9BQU87U0FDUjtRQUNELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLEtBQUssYUFBYSxDQUFDLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsS0FBSyxhQUFhLENBQUMsR0FBRyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7T0FFRztJQUNPLGVBQWUsQ0FBQyxJQUFlO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUMxQyxDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNqQyxJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN4QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQWMsSUFBSTtRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7OzBHQXZGVSxhQUFhOzhGQUFiLGFBQWEsNE1DNUMxQix5REFDQTsyRkQyQ2EsYUFBYTtrQkFKekIsU0FBUzsrQkFDRSxrQkFBa0I7eUpBUWYsTUFBTTtzQkFBbEIsS0FBSztnQkFRTyxJQUFJO3NCQUFoQixLQUFLO2dCQVk0QixTQUFTO3NCQUExQyxXQUFXO3VCQUFDLG1CQUFtQjtnQkFLRSxTQUFTO3NCQUExQyxXQUFXO3VCQUFDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IERpcmVjdGlvbk1vZGUgfSBmcm9tICcuLi8uLi8uLi9sYXlvdXQvZGlyZWN0aW9uL2NvbmZpZy9kaXJlY3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgSWNvbkxvYWRlclNlcnZpY2UgfSBmcm9tICcuL2ljb24tbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSUNPTl9UWVBFIGFzIERFRkFVTFRfSUNPTl9UWVBFIH0gZnJvbSAnLi9pY29uLm1vZGVsJztcblxudHlwZSBJQ09OX1RZUEUgPSBERUZBVUxUX0lDT05fVFlQRSB8IHN0cmluZztcblxuLyoqXG4gKlxuICogVGhlIGljb24gY29tcG9uZW50IGNhbiBiZSBhZGRlZCBpbiBkaWZmZXJlbnQgd2F5czpcbiAqXG4gKiBXaXRoIHRoZSBjb21wb25lbnQgc2VsZWN0b3I6XG4gKiBgPGN4LWljb24gdHlwZT1cIlNFQVJDSFwiPjwvY3gtaWNvbj5gXG4gKlxuICogV2l0aCB0aGUgYXR0cmlidXRlIHNlbGVjdG9yOlxuICogYDxzcGFuIGN4SWNvbj1cIlNUQVJcIj48L3NwYW4+YFxuICpcbiAqIEFkZGl0aW9uYWxseSwgY29udGVudCBjYW4gYmUgcHJvamVjdGVkIHRvIHRoZSBpY29uOlxuICpcbiAqIGA8YnV0dG9uIGN4SWNvbj1cIkhBUFBZXCI+aGFwcHkgbGFiZWw8L2J1dHRvbj5gXG4gKlxuICogVGhlIGFib3ZlIGJ1dHRvbiB3b3VsZCBiZWNvbWUgKGJhc2VkIG9uIGEgVEVYVCByZXNvdXJjZSB0eXBlKTpcbiAqIGA8YnV0dG9uPvCfmIpoYXBweSBsYWJlbDwvYnV0dG9uPmBcbiAqXG4gKiBXaGlsZSB0aGUgY29udGVudCBpcyBwcm9qZWN0ZWQsIHRoZSBpY29uIGl0c2VsZiBkb2Vzbid0IHJlcXVpcmUgYW5cbiAqIGFkZGl0aW9uYWwgRE9NIG5vZGUgd2hpY2ggaXMgYW4gYWR2YW50YWdlIG92ZXIgdGhlIGNvbXBvbmVudCBzZWxlY3Rvci5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtaWNvbixbY3hJY29uXScsXG4gIHRlbXBsYXRlVXJsOiAnLi9pY29uLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgSWNvbkNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBUaGUgY3hJY29uIGRpcmVjdGl2ZSBpcyBib3VuZCB0byB0aGUgaWNvbiB0eXBlLiBZb3UgY2FuIGZlZWQgdGhlIGBJQ09OX1RZUEVgIHRvXG4gICAqIGFjY29tcGxpc2ggYSBjb25maWd1cmFibGUgYnV0dG9uIGluIHRoZSBVSS5cbiAgICovXG4gIEBJbnB1dCgpIHNldCBjeEljb24odHlwZTogSUNPTl9UWVBFKSB7XG4gICAgdGhpcy5zZXRJY29uKHR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIGlucHV0IHBhcmFtZXRlciBpcyBib3VuZCB0byB0aGUgaWNvbiB0eXBlLiBZb3UgY2FuIGZlZWQgdGhlIGBJQ09OX1RZUEVgIHRvXG4gICAqIGFjY29tcGxpc2ggYSBjb25maWd1cmFibGUgYnV0dG9uIGluIHRoZSBVSS5cbiAgICovXG4gIEBJbnB1dCgpIHNldCB0eXBlKHR5cGU6IElDT05fVFlQRSkge1xuICAgIHRoaXMuc2V0SWNvbih0eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGUgaWNvbiBwcm92aWRlcyBhbiBodG1sIGZyYWdtZW50IHRoYXQgaXMgdXNlZCB0byBhZGQgU1ZHIG9yIHRleHQgYmFzZWQgaWNvbnMuXG4gICAqL1xuICBpY29uOiBTYWZlSHRtbCB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogVGhlIGBmbGlwLWF0LXJ0bGAgY2xhc3MgaXMgYWRkZWQgdG8gdGhlIERPTSBmb3IgdGhlIHN0eWxlIGxheWVyIHRvIGZsaXAgdGhlIGljb24gaW4gUlRMIGRpcmVjdGlvbi5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZmxpcC1hdC1ydGwnKSBmbGlwQXRSdGw6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBgZmxpcC1hdC1sdHJgIGNsYXNzIGlzIGFkZGVkIHRvIHRoZSBET00gZm9yIHRoZSBzdHlsZSBsYXllciB0byBmbGlwIHRoZSBpY29uIGluIExUUiBkaXJlY3Rpb24uXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZsaXAtYXQtbHRyJykgZmxpcEF0THRyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBNYWludGFpbnMgdGhlIGFwcGxpZWQgc3R5bGUgY2xhc3NlcyBzbyB3ZSBjYW4gcmVtb3ZlIHRoZW0gd2hlbiB0aGVcbiAgICogaWNvbiB0eXBlIGNoYW5nZXMgYXQgcnVuIHRpbWUuXG4gICAqL1xuICBwcm90ZWN0ZWQgc3R5bGVDbGFzc2VzOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaWNvbkxvYWRlcjogSWNvbkxvYWRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICBwcm90ZWN0ZWQgc2V0SWNvbih0eXBlOiBJQ09OX1RZUEUpOiB2b2lkIHtcbiAgICBpZiAoIXR5cGUgfHwgPHN0cmluZz50eXBlID09PSAnJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmljb24gPSB0aGlzLmljb25Mb2FkZXIuZ2V0SHRtbCh0eXBlKTtcbiAgICB0aGlzLmFkZFN0eWxlQ2xhc3Nlcyh0eXBlKTtcbiAgICB0aGlzLmljb25Mb2FkZXIuYWRkTGlua1Jlc291cmNlKHR5cGUpO1xuICAgIHRoaXMuZmxpcEljb24odHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGljb25zIHN1cHBvcnRzIGZsaXBwaW5nIGZvciBzb21lIGljb25zIHRvIHN1cHBvcnQgcnRsIGFuZCBsdHIgZGlyZWN0aW9ucy5cbiAgICovXG4gIHByb3RlY3RlZCBmbGlwSWNvbih0eXBlOiBJQ09OX1RZUEUpIHtcbiAgICAvLyBUT0RPOiB0aGlzIGNhbiBiZSBkcm9wcGVkIHdpdGggdGhlIG5leHQgbWFqb3IgcmVsZWFzZS5cbiAgICBpZiAoIXRoaXMuaWNvbkxvYWRlci5nZXRGbGlwRGlyZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGljb25EaXJlY3Rpb24gPSB0aGlzLmljb25Mb2FkZXIuZ2V0RmxpcERpcmVjdGlvbih0eXBlKTtcbiAgICB0aGlzLmZsaXBBdEx0ciA9IGljb25EaXJlY3Rpb24gPT09IERpcmVjdGlvbk1vZGUuTFRSO1xuICAgIHRoaXMuZmxpcEF0UnRsID0gaWNvbkRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uTW9kZS5SVEw7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgc3R5bGUgY2xhc3NlcyBhbmQgdGhlIGxpbmsgcmVzb3VyY2UgKGlmIGF2YWlsYWJsZSkuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkU3R5bGVDbGFzc2VzKHR5cGU6IElDT05fVFlQRSk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0LCAnY3gtaWNvbicpO1xuXG4gICAgdGhpcy5zdHlsZUNsYXNzZXM/LmZvckVhY2goKGNscykgPT5cbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ob3N0LCBjbHMpXG4gICAgKTtcblxuICAgIHRoaXMuc3R5bGVDbGFzc2VzID0gdGhpcy5pY29uTG9hZGVyLmdldFN0eWxlQ2xhc3Nlcyh0eXBlKT8uc3BsaXQoJyAnKTtcbiAgICB0aGlzLnN0eWxlQ2xhc3Nlcz8uZm9yRWFjaCgoY2xzKSA9PiB7XG4gICAgICBpZiAoY2xzICE9PSAnJykge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuaG9zdCwgY2xzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgaG9zdCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cbiIsIjxpIFtvdXRlckhUTUxdPVwiaWNvblwiPjwvaT48bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4iXX0=