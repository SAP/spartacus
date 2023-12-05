/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CdsMerchandisingStrategyAdapter } from './adapters';
import { MerchandisingCarouselCmsModule } from './cms-components';
import { MerchandisingStrategyAdapter } from './connectors';
import * as i0 from "@angular/core";
export class MerchandisingModule {
}
MerchandisingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MerchandisingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingModule, imports: [MerchandisingCarouselCmsModule] });
MerchandisingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingModule, providers: [
        {
            provide: MerchandisingStrategyAdapter,
            useClass: CdsMerchandisingStrategyAdapter,
        },
    ], imports: [MerchandisingCarouselCmsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MerchandisingCarouselCmsModule],
                    providers: [
                        {
                            provide: MerchandisingStrategyAdapter,
                            useClass: CdsMerchandisingStrategyAdapter,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyY2hhbmRpc2luZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2Nkcy9zcmMvbWVyY2hhbmRpc2luZy9tZXJjaGFuZGlzaW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0QsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sY0FBYyxDQUFDOztBQVc1RCxNQUFNLE9BQU8sbUJBQW1COztnSEFBbkIsbUJBQW1CO2lIQUFuQixtQkFBbUIsWUFScEIsOEJBQThCO2lIQVE3QixtQkFBbUIsYUFQbkI7UUFDVDtZQUNFLE9BQU8sRUFBRSw0QkFBNEI7WUFDckMsUUFBUSxFQUFFLCtCQUErQjtTQUMxQztLQUNGLFlBTlMsOEJBQThCOzJGQVE3QixtQkFBbUI7a0JBVC9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsOEJBQThCLENBQUM7b0JBQ3pDLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsNEJBQTRCOzRCQUNyQyxRQUFRLEVBQUUsK0JBQStCO3lCQUMxQztxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZHNNZXJjaGFuZGlzaW5nU3RyYXRlZ3lBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycyc7XG5pbXBvcnQgeyBNZXJjaGFuZGlzaW5nQ2Fyb3VzZWxDbXNNb2R1bGUgfSBmcm9tICcuL2Ntcy1jb21wb25lbnRzJztcbmltcG9ydCB7IE1lcmNoYW5kaXNpbmdTdHJhdGVneUFkYXB0ZXIgfSBmcm9tICcuL2Nvbm5lY3RvcnMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWVyY2hhbmRpc2luZ0Nhcm91c2VsQ21zTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTWVyY2hhbmRpc2luZ1N0cmF0ZWd5QWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBDZHNNZXJjaGFuZGlzaW5nU3RyYXRlZ3lBZGFwdGVyLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1lcmNoYW5kaXNpbmdNb2R1bGUge31cbiJdfQ==