/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, Optional, } from '@angular/core';
import { VariantQualifier, } from '@spartacus/core';
import { ProductListOutlets, } from '@spartacus/storefront';
import { EMPTY, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@angular/common";
export class ProductVariantStyleIconsComponent {
    constructor(config, productListItemContext) {
        this.config = config;
        this.productListItemContext = productListItemContext;
        this.subscriptions = new Subscription();
        this.ProductListOutlets = ProductListOutlets;
        this.product$ = this.productListItemContext?.product$ ?? EMPTY;
        this.variantNames = {};
    }
    ngOnInit() {
        this.setVariantsNames();
        this.subscriptions.add(this.product$.subscribe((product) => {
            if (product.variantOptions && product.variantOptions.length) {
                this.variants = product.variantOptions;
                this.setVariantsNames();
            }
        }));
    }
    setVariantsNames() {
        this.variants?.forEach((variant) => {
            if (variant.code && variant.variantOptionQualifiers) {
                this.variantNames[variant.code] =
                    this.getVariantName(variant.variantOptionQualifiers) || '';
            }
        });
    }
    getVariantThumbnailUrl(variantOptionQualifiers) {
        const thumbnail = variantOptionQualifiers.find((item) => item.qualifier === VariantQualifier.THUMBNAIL);
        return thumbnail
            ? `${this.config?.backend?.occ?.baseUrl}${thumbnail.image?.url}`
            : '';
    }
    getVariantName(variantOptionQualifiers) {
        const rollupProperty = variantOptionQualifiers.find((item) => item.qualifier === VariantQualifier.ROLLUP_PROPERTY);
        const property = rollupProperty
            ? variantOptionQualifiers.find((item) => item.qualifier === rollupProperty.value)
            : null;
        return property ? property.value : '';
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
ProductVariantStyleIconsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleIconsComponent, deps: [{ token: i1.OccConfig }, { token: i2.ProductListItemContext, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ProductVariantStyleIconsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductVariantStyleIconsComponent, selector: "cx-variant-style-icons", inputs: { variants: "variants" }, ngImport: i0, template: "<ul class=\"variant-list\" *ngIf=\"variants && variants.length\">\n  <li *ngFor=\"let v of variants\">\n    <img\n      [attr.src]=\"getVariantThumbnailUrl(v.variantOptionQualifiers)\"\n      [attr.title]=\"variantNames[v.code]\"\n      [attr.alt]=\"variantNames[v.code]\"\n    />\n  </li>\n</ul>\n", styles: ["ul{padding:0;white-space:nowrap;overflow:hidden}ul li{display:inline}ul li img{width:50px}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleIconsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-variant-style-icons', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ul class=\"variant-list\" *ngIf=\"variants && variants.length\">\n  <li *ngFor=\"let v of variants\">\n    <img\n      [attr.src]=\"getVariantThumbnailUrl(v.variantOptionQualifiers)\"\n      [attr.title]=\"variantNames[v.code]\"\n      [attr.alt]=\"variantNames[v.code]\"\n    />\n  </li>\n</ul>\n", styles: ["ul{padding:0;white-space:nowrap;overflow:hidden}ul li{display:inline}ul li img{width:50px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.OccConfig }, { type: i2.ProductListItemContext, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { variants: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12YXJpYW50LXN0eWxlLWljb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0L3ZhcmlhbnRzL3Jvb3QvY29tcG9uZW50cy92YXJpYW50LXN0eWxlLWljb25zL3Byb2R1Y3QtdmFyaWFudC1zdHlsZS1pY29ucy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC92YXJpYW50cy9yb290L2NvbXBvbmVudHMvdmFyaWFudC1zdHlsZS1pY29ucy9wcm9kdWN0LXZhcmlhbnQtc3R5bGUtaWNvbnMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTCxRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUtMLGdCQUFnQixHQUNqQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFFTCxrQkFBa0IsR0FDbkIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsS0FBSyxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFRdkQsTUFBTSxPQUFPLGlDQUFpQztJQUM1QyxZQUNVLE1BQWlCLEVBRWYsc0JBQStDO1FBRmpELFdBQU0sR0FBTixNQUFNLENBQVc7UUFFZiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXlCO1FBR2pELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwQyx1QkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUN4QyxhQUFRLEdBQ2YsSUFBSSxDQUFDLHNCQUFzQixFQUFFLFFBQVEsSUFBSSxLQUFLLENBQUM7UUFLakQsaUJBQVksR0FBOEIsRUFBRSxDQUFDO0lBVjFDLENBQUM7SUFZSixRQUFRO1FBQ04sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBZ0IsRUFBRSxFQUFFO1lBQzNDLElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtnQkFDM0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRU8sZ0JBQWdCO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDakMsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRTtnQkFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUM5RDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNCQUFzQixDQUNwQix1QkFBaUQ7UUFFakQsTUFBTSxTQUFTLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUM1QyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxnQkFBZ0IsQ0FBQyxTQUFTLENBQ3hELENBQUM7UUFDRixPQUFPLFNBQVM7WUFDZCxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ2hFLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDO0lBRU8sY0FBYyxDQUNwQix1QkFBaUQ7UUFFakQsTUFBTSxjQUFjLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUNqRCxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxnQkFBZ0IsQ0FBQyxlQUFlLENBQzlELENBQUM7UUFDRixNQUFNLFFBQVEsR0FBRyxjQUFjO1lBQzdCLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQzFCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLGNBQWMsQ0FBQyxLQUFLLENBQ2xEO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNULE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7OzhIQWxFVSxpQ0FBaUM7a0hBQWpDLGlDQUFpQyxnR0NqQzlDLDRTQVNBOzJGRHdCYSxpQ0FBaUM7a0JBTjdDLFNBQVM7K0JBQ0Usd0JBQXdCLG1CQUdqQix1QkFBdUIsQ0FBQyxNQUFNOzswQkFLNUMsUUFBUTs0Q0FVWCxRQUFRO3NCQURQLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE9jY0NvbmZpZyxcbiAgUHJvZHVjdCxcbiAgVmFyaWFudE9wdGlvbixcbiAgVmFyaWFudE9wdGlvblF1YWxpZmllcixcbiAgVmFyaWFudFF1YWxpZmllcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFByb2R1Y3RMaXN0SXRlbUNvbnRleHQsXG4gIFByb2R1Y3RMaXN0T3V0bGV0cyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEVNUFRZLCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtdmFyaWFudC1zdHlsZS1pY29ucycsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9kdWN0LXZhcmlhbnQtc3R5bGUtaWNvbnMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wcm9kdWN0LXZhcmlhbnQtc3R5bGUtaWNvbnMuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RWYXJpYW50U3R5bGVJY29uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWc6IE9jY0NvbmZpZyxcbiAgICBAT3B0aW9uYWwoKVxuICAgIHByb3RlY3RlZCBwcm9kdWN0TGlzdEl0ZW1Db250ZXh0PzogUHJvZHVjdExpc3RJdGVtQ29udGV4dFxuICApIHt9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHJlYWRvbmx5IFByb2R1Y3RMaXN0T3V0bGV0cyA9IFByb2R1Y3RMaXN0T3V0bGV0cztcbiAgcmVhZG9ubHkgcHJvZHVjdCQ6IE9ic2VydmFibGU8UHJvZHVjdD4gPVxuICAgIHRoaXMucHJvZHVjdExpc3RJdGVtQ29udGV4dD8ucHJvZHVjdCQgPz8gRU1QVFk7XG5cbiAgQElucHV0KClcbiAgdmFyaWFudHM6IFZhcmlhbnRPcHRpb25bXTtcblxuICB2YXJpYW50TmFtZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldFZhcmlhbnRzTmFtZXMoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnByb2R1Y3QkLnN1YnNjcmliZSgocHJvZHVjdDogUHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdC52YXJpYW50T3B0aW9ucyAmJiBwcm9kdWN0LnZhcmlhbnRPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMudmFyaWFudHMgPSBwcm9kdWN0LnZhcmlhbnRPcHRpb25zO1xuICAgICAgICAgIHRoaXMuc2V0VmFyaWFudHNOYW1lcygpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHNldFZhcmlhbnRzTmFtZXMoKSB7XG4gICAgdGhpcy52YXJpYW50cz8uZm9yRWFjaCgodmFyaWFudCkgPT4ge1xuICAgICAgaWYgKHZhcmlhbnQuY29kZSAmJiB2YXJpYW50LnZhcmlhbnRPcHRpb25RdWFsaWZpZXJzKSB7XG4gICAgICAgIHRoaXMudmFyaWFudE5hbWVzW3ZhcmlhbnQuY29kZV0gPVxuICAgICAgICAgIHRoaXMuZ2V0VmFyaWFudE5hbWUodmFyaWFudC52YXJpYW50T3B0aW9uUXVhbGlmaWVycykgfHwgJyc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRWYXJpYW50VGh1bWJuYWlsVXJsKFxuICAgIHZhcmlhbnRPcHRpb25RdWFsaWZpZXJzOiBWYXJpYW50T3B0aW9uUXVhbGlmaWVyW11cbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCB0aHVtYm5haWwgPSB2YXJpYW50T3B0aW9uUXVhbGlmaWVycy5maW5kKFxuICAgICAgKGl0ZW0pID0+IGl0ZW0ucXVhbGlmaWVyID09PSBWYXJpYW50UXVhbGlmaWVyLlRIVU1CTkFJTFxuICAgICk7XG4gICAgcmV0dXJuIHRodW1ibmFpbFxuICAgICAgPyBgJHt0aGlzLmNvbmZpZz8uYmFja2VuZD8ub2NjPy5iYXNlVXJsfSR7dGh1bWJuYWlsLmltYWdlPy51cmx9YFxuICAgICAgOiAnJztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VmFyaWFudE5hbWUoXG4gICAgdmFyaWFudE9wdGlvblF1YWxpZmllcnM6IFZhcmlhbnRPcHRpb25RdWFsaWZpZXJbXVxuICApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJvbGx1cFByb3BlcnR5ID0gdmFyaWFudE9wdGlvblF1YWxpZmllcnMuZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLnF1YWxpZmllciA9PT0gVmFyaWFudFF1YWxpZmllci5ST0xMVVBfUFJPUEVSVFlcbiAgICApO1xuICAgIGNvbnN0IHByb3BlcnR5ID0gcm9sbHVwUHJvcGVydHlcbiAgICAgID8gdmFyaWFudE9wdGlvblF1YWxpZmllcnMuZmluZChcbiAgICAgICAgICAoaXRlbSkgPT4gaXRlbS5xdWFsaWZpZXIgPT09IHJvbGx1cFByb3BlcnR5LnZhbHVlXG4gICAgICAgIClcbiAgICAgIDogbnVsbDtcbiAgICByZXR1cm4gcHJvcGVydHkgPyBwcm9wZXJ0eS52YWx1ZSA6ICcnO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjx1bCBjbGFzcz1cInZhcmlhbnQtbGlzdFwiICpuZ0lmPVwidmFyaWFudHMgJiYgdmFyaWFudHMubGVuZ3RoXCI+XG4gIDxsaSAqbmdGb3I9XCJsZXQgdiBvZiB2YXJpYW50c1wiPlxuICAgIDxpbWdcbiAgICAgIFthdHRyLnNyY109XCJnZXRWYXJpYW50VGh1bWJuYWlsVXJsKHYudmFyaWFudE9wdGlvblF1YWxpZmllcnMpXCJcbiAgICAgIFthdHRyLnRpdGxlXT1cInZhcmlhbnROYW1lc1t2LmNvZGVdXCJcbiAgICAgIFthdHRyLmFsdF09XCJ2YXJpYW50TmFtZXNbdi5jb2RlXVwiXG4gICAgLz5cbiAgPC9saT5cbjwvdWw+XG4iXX0=