/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OutletModule } from '../../outlet/outlet.module';
import { PageComponentModule } from '../component/page-component.module';
import { PageSlotComponent } from './page-slot.component';
import * as i0 from "@angular/core";
import * as i1 from "./page-slot.service";
export class PageSlotModule {
    // instantiate PageSlotService ASAP, so it can examine SSR pre-rendered DOM
    constructor(_pageSlot) {
        // Intentional empty constructor
    }
}
PageSlotModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageSlotModule, deps: [{ token: i1.PageSlotService }], target: i0.ɵɵFactoryTarget.NgModule });
PageSlotModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PageSlotModule, declarations: [PageSlotComponent], imports: [CommonModule, OutletModule, PageComponentModule], exports: [PageSlotComponent] });
PageSlotModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageSlotModule, imports: [CommonModule, OutletModule, PageComponentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageSlotModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OutletModule, PageComponentModule],
                    declarations: [PageSlotComponent],
                    exports: [PageSlotComponent],
                }]
        }], ctorParameters: function () { return [{ type: i1.PageSlotService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbG90Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wYWdlL3Nsb3QvcGFnZS1zbG90Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7QUFRMUQsTUFBTSxPQUFPLGNBQWM7SUFDekIsMkVBQTJFO0lBQzNFLFlBQVksU0FBMEI7UUFDcEMsZ0NBQWdDO0lBQ2xDLENBQUM7OzJHQUpVLGNBQWM7NEdBQWQsY0FBYyxpQkFIVixpQkFBaUIsYUFEdEIsWUFBWSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsYUFFL0MsaUJBQWlCOzRHQUVoQixjQUFjLFlBSmYsWUFBWSxFQUFFLFlBQVksRUFBRSxtQkFBbUI7MkZBSTlDLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsQ0FBQztvQkFDMUQsWUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQ2pDLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO2lCQUM3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3V0bGV0TW9kdWxlIH0gZnJvbSAnLi4vLi4vb3V0bGV0L291dGxldC5tb2R1bGUnO1xuaW1wb3J0IHsgUGFnZUNvbXBvbmVudE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudC9wYWdlLWNvbXBvbmVudC5tb2R1bGUnO1xuaW1wb3J0IHsgUGFnZVNsb3RDb21wb25lbnQgfSBmcm9tICcuL3BhZ2Utc2xvdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnZVNsb3RTZXJ2aWNlIH0gZnJvbSAnLi9wYWdlLXNsb3Quc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE91dGxldE1vZHVsZSwgUGFnZUNvbXBvbmVudE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1BhZ2VTbG90Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1BhZ2VTbG90Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgUGFnZVNsb3RNb2R1bGUge1xuICAvLyBpbnN0YW50aWF0ZSBQYWdlU2xvdFNlcnZpY2UgQVNBUCwgc28gaXQgY2FuIGV4YW1pbmUgU1NSIHByZS1yZW5kZXJlZCBET01cbiAgY29uc3RydWN0b3IoX3BhZ2VTbG90OiBQYWdlU2xvdFNlcnZpY2UpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG59XG4iXX0=