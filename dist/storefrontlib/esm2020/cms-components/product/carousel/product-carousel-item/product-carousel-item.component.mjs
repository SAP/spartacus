/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { ProductListItemContext, ProductListItemContextSource, } from '../../product-list';
import * as i0 from "@angular/core";
import * as i1 from "../../product-list";
import * as i2 from "../../../../shared/components/media/media.component";
import * as i3 from "@angular/router";
import * as i4 from "../../../../cms-structure/page/component/inner-components-host.directive";
import * as i5 from "@spartacus/core";
export class ProductCarouselItemComponent {
    constructor(productListItemContextSource) {
        this.productListItemContextSource = productListItemContextSource;
    }
    ngOnChanges(changes) {
        if (changes?.item) {
            this.productListItemContextSource.product$.next(this.item);
        }
    }
}
ProductCarouselItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductCarouselItemComponent, deps: [{ token: i1.ProductListItemContextSource }], target: i0.ɵɵFactoryTarget.Component });
ProductCarouselItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductCarouselItemComponent, selector: "cx-product-carousel-item", inputs: { item: "item" }, providers: [
        ProductListItemContextSource,
        {
            provide: ProductListItemContext,
            useExisting: ProductListItemContextSource,
        },
    ], usesOnChanges: true, ngImport: i0, template: "<a tabindex=\"0\" [routerLink]=\"{ cxRoute: 'product', params: item } | cxUrl\">\n  <cx-media\n    [container]=\"item.images?.PRIMARY\"\n    format=\"product\"\n    [alt]=\"item.name ?? ''\"\n  ></cx-media>\n  <h3 class=\"cx-product-name\">\n    {{ item.name }}\n  </h3>\n  <div class=\"price\">\n    {{ item.price?.formattedValue }}\n  </div>\n</a>\n<div class=\"actions\">\n  <ng-container cxInnerComponentsHost></ng-container>\n</div>\n", dependencies: [{ kind: "component", type: i2.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i4.InnerComponentsHostDirective, selector: "[cxInnerComponentsHost]" }, { kind: "pipe", type: i5.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductCarouselItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-carousel-item', providers: [
                        ProductListItemContextSource,
                        {
                            provide: ProductListItemContext,
                            useExisting: ProductListItemContextSource,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<a tabindex=\"0\" [routerLink]=\"{ cxRoute: 'product', params: item } | cxUrl\">\n  <cx-media\n    [container]=\"item.images?.PRIMARY\"\n    format=\"product\"\n    [alt]=\"item.name ?? ''\"\n  ></cx-media>\n  <h3 class=\"cx-product-name\">\n    {{ item.name }}\n  </h3>\n  <div class=\"price\">\n    {{ item.price?.formattedValue }}\n  </div>\n</a>\n<div class=\"actions\">\n  <ng-container cxInnerComponentsHost></ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ProductListItemContextSource }]; }, propDecorators: { item: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1jYXJvdXNlbC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvcHJvZHVjdC9jYXJvdXNlbC9wcm9kdWN0LWNhcm91c2VsLWl0ZW0vcHJvZHVjdC1jYXJvdXNlbC1pdGVtLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvcHJvZHVjdC9jYXJvdXNlbC9wcm9kdWN0LWNhcm91c2VsLWl0ZW0vcHJvZHVjdC1jYXJvdXNlbC1pdGVtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLHNCQUFzQixFQUN0Qiw0QkFBNEIsR0FDN0IsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7OztBQWM1QixNQUFNLE9BQU8sNEJBQTRCO0lBR3ZDLFlBQ1ksNEJBQTBEO1FBQTFELGlDQUE0QixHQUE1Qiw0QkFBNEIsQ0FBOEI7SUFDbkUsQ0FBQztJQUVKLFdBQVcsQ0FBQyxPQUF1QjtRQUNqQyxJQUFJLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDakIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVEO0lBQ0gsQ0FBQzs7eUhBWFUsNEJBQTRCOzZHQUE1Qiw0QkFBNEIsNkVBVDVCO1FBQ1QsNEJBQTRCO1FBQzVCO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixXQUFXLEVBQUUsNEJBQTRCO1NBQzFDO0tBQ0YsK0NDNUJILHliQWdCQTsyRkRlYSw0QkFBNEI7a0JBWnhDLFNBQVM7K0JBQ0UsMEJBQTBCLGFBRXpCO3dCQUNULDRCQUE0Qjt3QkFDNUI7NEJBQ0UsT0FBTyxFQUFFLHNCQUFzQjs0QkFDL0IsV0FBVyxFQUFFLDRCQUE0Qjt5QkFDMUM7cUJBQ0YsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU07bUhBR3RDLElBQUk7c0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBQcm9kdWN0TGlzdEl0ZW1Db250ZXh0LFxuICBQcm9kdWN0TGlzdEl0ZW1Db250ZXh0U291cmNlLFxufSBmcm9tICcuLi8uLi9wcm9kdWN0LWxpc3QnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1wcm9kdWN0LWNhcm91c2VsLWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvZHVjdC1jYXJvdXNlbC1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUHJvZHVjdExpc3RJdGVtQ29udGV4dFNvdXJjZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBQcm9kdWN0TGlzdEl0ZW1Db250ZXh0LFxuICAgICAgdXNlRXhpc3Rpbmc6IFByb2R1Y3RMaXN0SXRlbUNvbnRleHRTb3VyY2UsXG4gICAgfSxcbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RDYXJvdXNlbEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBpdGVtOiBQcm9kdWN0O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBwcm9kdWN0TGlzdEl0ZW1Db250ZXh0U291cmNlOiBQcm9kdWN0TGlzdEl0ZW1Db250ZXh0U291cmNlXG4gICkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzPy5pdGVtKSB7XG4gICAgICB0aGlzLnByb2R1Y3RMaXN0SXRlbUNvbnRleHRTb3VyY2UucHJvZHVjdCQubmV4dCh0aGlzLml0ZW0pO1xuICAgIH1cbiAgfVxufVxuIiwiPGEgdGFiaW5kZXg9XCIwXCIgW3JvdXRlckxpbmtdPVwieyBjeFJvdXRlOiAncHJvZHVjdCcsIHBhcmFtczogaXRlbSB9IHwgY3hVcmxcIj5cbiAgPGN4LW1lZGlhXG4gICAgW2NvbnRhaW5lcl09XCJpdGVtLmltYWdlcz8uUFJJTUFSWVwiXG4gICAgZm9ybWF0PVwicHJvZHVjdFwiXG4gICAgW2FsdF09XCJpdGVtLm5hbWUgPz8gJydcIlxuICA+PC9jeC1tZWRpYT5cbiAgPGgzIGNsYXNzPVwiY3gtcHJvZHVjdC1uYW1lXCI+XG4gICAge3sgaXRlbS5uYW1lIH19XG4gIDwvaDM+XG4gIDxkaXYgY2xhc3M9XCJwcmljZVwiPlxuICAgIHt7IGl0ZW0ucHJpY2U/LmZvcm1hdHRlZFZhbHVlIH19XG4gIDwvZGl2PlxuPC9hPlxuPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgPG5nLWNvbnRhaW5lciBjeElubmVyQ29tcG9uZW50c0hvc3Q+PC9uZy1jb250YWluZXI+XG48L2Rpdj5cbiJdfQ==