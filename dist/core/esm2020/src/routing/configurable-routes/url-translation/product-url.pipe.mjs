/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./semantic-path.service";
export class ProductURLPipe {
    constructor(semanticPath) {
        this.semanticPath = semanticPath;
    }
    transform(product) {
        return this.semanticPath.transform({ cxRoute: 'product', params: product });
    }
}
ProductURLPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductURLPipe, deps: [{ token: i1.SemanticPathService }], target: i0.ɵɵFactoryTarget.Pipe });
ProductURLPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductURLPipe, name: "cxProductUrl" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductURLPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'cxProductUrl',
                }]
        }], ctorParameters: function () { return [{ type: i1.SemanticPathService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC11cmwucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3JvdXRpbmcvY29uZmlndXJhYmxlLXJvdXRlcy91cmwtdHJhbnNsYXRpb24vcHJvZHVjdC11cmwucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7OztBQU1wRCxNQUFNLE9BQU8sY0FBYztJQUN6QixZQUFvQixZQUFpQztRQUFqQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7SUFBRyxDQUFDO0lBQ3pELFNBQVMsQ0FBQyxPQUFnQjtRQUN4QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM5RSxDQUFDOzsyR0FKVSxjQUFjO3lHQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFIMUIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsY0FBYztpQkFDckIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZW1hbnRpY1BhdGhTZXJ2aWNlIH0gZnJvbSAnLi9zZW1hbnRpYy1wYXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJy4uLy4uLy4uL21vZGVsL3Byb2R1Y3QubW9kZWwnO1xuQFBpcGUoe1xuICBuYW1lOiAnY3hQcm9kdWN0VXJsJyxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdFVSTFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZW1hbnRpY1BhdGg6IFNlbWFudGljUGF0aFNlcnZpY2UpIHt9XG4gIHRyYW5zZm9ybShwcm9kdWN0OiBQcm9kdWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuc2VtYW50aWNQYXRoLnRyYW5zZm9ybSh7IGN4Um91dGU6ICdwcm9kdWN0JywgcGFyYW1zOiBwcm9kdWN0IH0pO1xuICB9XG59XG4iXX0=