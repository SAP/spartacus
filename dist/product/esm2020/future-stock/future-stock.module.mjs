/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { FutureStockComponentsModule } from '@spartacus/product/future-stock/components';
import { FutureStockCoreModule } from '@spartacus/product/future-stock/core';
import { FutureStockOccModule } from '@spartacus/product/future-stock/occ';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/product/future-stock/core";
export class FutureStockModule {
}
FutureStockModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FutureStockModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FutureStockModule, imports: [i1.FutureStockCoreModule, FutureStockOccModule,
        FutureStockComponentsModule] });
FutureStockModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockModule, imports: [FutureStockCoreModule.forRoot(),
        FutureStockOccModule,
        FutureStockComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FutureStockCoreModule.forRoot(),
                        FutureStockOccModule,
                        FutureStockComponentsModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLXN0b2NrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0L2Z1dHVyZS1zdG9jay9mdXR1cmUtc3RvY2subW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7QUFTM0UsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLHNDQUoxQixvQkFBb0I7UUFDcEIsMkJBQTJCOytHQUdsQixpQkFBaUIsWUFMMUIscUJBQXFCLENBQUMsT0FBTyxFQUFFO1FBQy9CLG9CQUFvQjtRQUNwQiwyQkFBMkI7MkZBR2xCLGlCQUFpQjtrQkFQN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AscUJBQXFCLENBQUMsT0FBTyxFQUFFO3dCQUMvQixvQkFBb0I7d0JBQ3BCLDJCQUEyQjtxQkFDNUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRnV0dXJlU3RvY2tDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0L2Z1dHVyZS1zdG9jay9jb21wb25lbnRzJztcbmltcG9ydCB7IEZ1dHVyZVN0b2NrQ29yZU1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC9mdXR1cmUtc3RvY2svY29yZSc7XG5pbXBvcnQgeyBGdXR1cmVTdG9ja09jY01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC9mdXR1cmUtc3RvY2svb2NjJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEZ1dHVyZVN0b2NrQ29yZU1vZHVsZS5mb3JSb290KCksXG4gICAgRnV0dXJlU3RvY2tPY2NNb2R1bGUsXG4gICAgRnV0dXJlU3RvY2tDb21wb25lbnRzTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBGdXR1cmVTdG9ja01vZHVsZSB7fVxuIl19