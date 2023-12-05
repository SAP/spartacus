/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { PickupInfoModule } from '../../presentational/index';
import { PickupInfoContainerComponent } from './pickup-info-container.component';
import * as i0 from "@angular/core";
export class PickupInfoContainerModule {
}
PickupInfoContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoContainerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInfoContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoContainerModule, declarations: [PickupInfoContainerComponent], imports: [CommonModule, PickupInfoModule], exports: [PickupInfoContainerComponent] });
PickupInfoContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoContainerModule, providers: [
        provideOutlet({
            id: CartOutlets.PICKUP_INFO,
            position: OutletPosition.REPLACE,
            component: PickupInfoContainerComponent,
        }),
    ], imports: [CommonModule, PickupInfoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PickupInfoModule],
                    exports: [PickupInfoContainerComponent],
                    declarations: [PickupInfoContainerComponent],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.PICKUP_INFO,
                            position: OutletPosition.REPLACE,
                            component: PickupInfoContainerComponent,
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLWluZm8tY29udGFpbmVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9waWNrdXAtaW4tc3RvcmUvY29tcG9uZW50cy9jb250YWluZXIvcGlja3VwLWluZm8tY29udGFpbmVyL3BpY2t1cC1pbmZvLWNvbnRhaW5lci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTlELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztBQWNqRixNQUFNLE9BQU8seUJBQXlCOztzSEFBekIseUJBQXlCO3VIQUF6Qix5QkFBeUIsaUJBVHJCLDRCQUE0QixhQUZqQyxZQUFZLEVBQUUsZ0JBQWdCLGFBQzlCLDRCQUE0Qjt1SEFVM0IseUJBQXlCLGFBUnpCO1FBQ1QsYUFBYSxDQUFDO1lBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyxXQUFXO1lBQzNCLFFBQVEsRUFBRSxjQUFjLENBQUMsT0FBTztZQUNoQyxTQUFTLEVBQUUsNEJBQTRCO1NBQ3hDLENBQUM7S0FDSCxZQVRTLFlBQVksRUFBRSxnQkFBZ0I7MkZBVzdCLHlCQUF5QjtrQkFackMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ3pDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO29CQUN2QyxZQUFZLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztvQkFDNUMsU0FBUyxFQUFFO3dCQUNULGFBQWEsQ0FBQzs0QkFDWixFQUFFLEVBQUUsV0FBVyxDQUFDLFdBQVc7NEJBQzNCLFFBQVEsRUFBRSxjQUFjLENBQUMsT0FBTzs0QkFDaEMsU0FBUyxFQUFFLDRCQUE0Qjt5QkFDeEMsQ0FBQztxQkFDSDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FydE91dGxldHMgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IE91dGxldFBvc2l0aW9uLCBwcm92aWRlT3V0bGV0IH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFBpY2t1cEluZm9Nb2R1bGUgfSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb25hbC9pbmRleCc7XG5cbmltcG9ydCB7IFBpY2t1cEluZm9Db250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3BpY2t1cC1pbmZvLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQaWNrdXBJbmZvTW9kdWxlXSxcbiAgZXhwb3J0czogW1BpY2t1cEluZm9Db250YWluZXJDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtQaWNrdXBJbmZvQ29udGFpbmVyQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZU91dGxldCh7XG4gICAgICBpZDogQ2FydE91dGxldHMuUElDS1VQX0lORk8sXG4gICAgICBwb3NpdGlvbjogT3V0bGV0UG9zaXRpb24uUkVQTEFDRSxcbiAgICAgIGNvbXBvbmVudDogUGlja3VwSW5mb0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGlja3VwSW5mb0NvbnRhaW5lck1vZHVsZSB7fVxuIl19