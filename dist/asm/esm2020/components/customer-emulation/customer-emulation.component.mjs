/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Optional, ViewChild, } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/asm-component.service";
import * as i2 from "@spartacus/user/account/root";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@spartacus/core";
import * as i5 from "@angular/common";
import * as i6 from "../asm-bind-cart/asm-bind-cart.component";
export class CustomerEmulationComponent {
    constructor(asmComponentService, userAccountFacade, 
    // TODO(CXSPA-3090): Remove optional flag in 7.0
    launchDialogService, featureModules) {
        this.asmComponentService = asmComponentService;
        this.userAccountFacade = userAccountFacade;
        this.launchDialogService = launchDialogService;
        this.featureModules = featureModules;
        this.isAsmCustomer360Configured = false;
        this.isAsmCustomer360Loaded$ = new BehaviorSubject(false);
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.isAsmCustomer360Configured =
            this.featureModules?.isConfigured('asmCustomer360');
        if (this.isAsmCustomer360Configured) {
            // trigger lazy loading of the Customer 360 feature:
            this.featureModules?.resolveFeature('asmCustomer360').subscribe(() => {
                this.isAsmCustomer360Loaded$.next(true);
            });
        }
        this.subscription.add(this.userAccountFacade.get().subscribe((user) => {
            if (user) {
                this.customer = user;
            }
        }));
        this.isCustomerEmulationSessionInProgress$ =
            this.asmComponentService.isCustomerEmulationSessionInProgress();
    }
    logoutCustomer() {
        this.asmComponentService.logoutCustomer();
    }
    openAsmCustomer360() {
        this.subscription.add(this.isAsmCustomer360Loaded$
            .pipe(filter((isReady) => Boolean(isReady)))
            .subscribe(() => {
            const data = { customer: this.customer };
            this.launchDialogService?.openDialogAndSubscribe("ASM_CUSTOMER_360" /* LAUNCH_CALLER.ASM_CUSTOMER_360 */, this.asmCustomer360LauncherElement, data);
            this.subscription.add(this.launchDialogService?.dialogClose
                .pipe(filter((result) => Boolean(result)))
                .subscribe((event) => {
                this.asmComponentService.handleAsmDialogAction(event);
            }));
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CustomerEmulationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerEmulationComponent, deps: [{ token: i1.AsmComponentService }, { token: i2.UserAccountFacade }, { token: i3.LaunchDialogService, optional: true }, { token: i4.FeatureModulesService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CustomerEmulationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerEmulationComponent, selector: "cx-customer-emulation", viewQueries: [{ propertyName: "asmCustomer360LauncherElement", first: true, predicate: ["asmCustomer360Launcher"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"isCustomerEmulationSessionInProgress$ | async\">\n  <div class=\"cx-asm-customerInfo\">\n    <label class=\"cx-asm-name\">{{ customer?.name }}</label>\n    <label class=\"cx-asm-uid\">{{ customer?.uid }}</label>\n  </div>\n  <cx-asm-bind-cart></cx-asm-bind-cart>\n  <ng-container *cxFeatureLevel=\"'6.6'\">\n    <button\n      *ngIf=\"isAsmCustomer360Configured && customer\"\n      #asmCustomer360Launcher\n      class=\"cx-360-button\"\n      (click)=\"openAsmCustomer360()\"\n    >\n      {{ 'asm.asmCustomer360Button' | cxTranslate }}\n    </button>\n  </ng-container>\n  <button formcontrolname=\"logoutCustomer\" (click)=\"logoutCustomer()\">\n    {{ 'asm.endSession' | cxTranslate }}\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "component", type: i6.AsmBindCartComponent, selector: "cx-asm-bind-cart" }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerEmulationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-emulation', template: "<ng-container *ngIf=\"isCustomerEmulationSessionInProgress$ | async\">\n  <div class=\"cx-asm-customerInfo\">\n    <label class=\"cx-asm-name\">{{ customer?.name }}</label>\n    <label class=\"cx-asm-uid\">{{ customer?.uid }}</label>\n  </div>\n  <cx-asm-bind-cart></cx-asm-bind-cart>\n  <ng-container *cxFeatureLevel=\"'6.6'\">\n    <button\n      *ngIf=\"isAsmCustomer360Configured && customer\"\n      #asmCustomer360Launcher\n      class=\"cx-360-button\"\n      (click)=\"openAsmCustomer360()\"\n    >\n      {{ 'asm.asmCustomer360Button' | cxTranslate }}\n    </button>\n  </ng-container>\n  <button formcontrolname=\"logoutCustomer\" (click)=\"logoutCustomer()\">\n    {{ 'asm.endSession' | cxTranslate }}\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AsmComponentService }, { type: i2.UserAccountFacade }, { type: i3.LaunchDialogService, decorators: [{
                    type: Optional
                }] }, { type: i4.FeatureModulesService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { asmCustomer360LauncherElement: [{
                type: ViewChild,
                args: ['asmCustomer360Launcher']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9jdXN0b21lci1lbXVsYXRpb24vY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9jdXN0b21lci1lbXVsYXRpb24vY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUlULFFBQVEsRUFDUixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLGVBQWUsRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7OztBQU94QyxNQUFNLE9BQU8sMEJBQTBCO0lBMEJyQyxZQUNZLG1CQUF3QyxFQUN4QyxpQkFBb0M7SUFDOUMsZ0RBQWdEO0lBQzFCLG1CQUF5QyxFQUN6QyxjQUFzQztRQUpsRCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFFeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFzQjtRQUN6QyxtQkFBYyxHQUFkLGNBQWMsQ0FBd0I7UUEzQjlELCtCQUEwQixHQUF3QixLQUFLLENBQUM7UUFDeEQsNEJBQXVCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFLcEQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBc0J6QyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQywwQkFBMEI7WUFDN0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0RCxJQUFJLElBQUksQ0FBQywwQkFBMEIsRUFBRTtZQUNuQyxvREFBb0Q7WUFDcEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNuRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzlDLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxxQ0FBcUM7WUFDeEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9DQUFvQyxFQUFFLENBQUM7SUFDcEUsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLHVCQUF1QjthQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUMzQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsTUFBTSxJQUFJLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxzQkFBc0IsMERBRTlDLElBQUksQ0FBQyw2QkFBNkIsRUFDbEMsSUFBSSxDQUNMLENBQUM7WUFFRixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFdBQVc7aUJBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2lCQUN6QyxTQUFTLENBQUMsQ0FBQyxLQUEyQixFQUFFLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUMsQ0FDTCxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzt1SEFwRlUsMEJBQTBCOzJHQUExQiwwQkFBMEIsc01DMUJ2QywwdUJBb0JBOzJGRE1hLDBCQUEwQjtrQkFKdEMsU0FBUzsrQkFDRSx1QkFBdUI7OzBCQWlDOUIsUUFBUTs7MEJBQ1IsUUFBUTs0Q0F2QlgsNkJBQTZCO3NCQUQ1QixTQUFTO3VCQUFDLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXNtRGlhbG9nQWN0aW9uRXZlbnQgfSBmcm9tICdAc3BhcnRhY3VzL2FzbS9jdXN0b21lci0zNjAvcm9vdCc7XG5pbXBvcnQgeyBGZWF0dXJlTW9kdWxlc1NlcnZpY2UsIFVzZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTGF1bmNoRGlhbG9nU2VydmljZSwgTEFVTkNIX0NBTExFUiB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBVc2VyQWNjb3VudEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9hY2NvdW50L3Jvb3QnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFzbUNvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hc20tY29tcG9uZW50LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jdXN0b21lci1lbXVsYXRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJFbXVsYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGN1c3RvbWVyOiBVc2VyO1xuICBpc0N1c3RvbWVyRW11bGF0aW9uU2Vzc2lvbkluUHJvZ3Jlc3MkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIGlzQXNtQ3VzdG9tZXIzNjBDb25maWd1cmVkOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG4gIGlzQXNtQ3VzdG9tZXIzNjBMb2FkZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgQFZpZXdDaGlsZCgnYXNtQ3VzdG9tZXIzNjBMYXVuY2hlcicpXG4gIGFzbUN1c3RvbWVyMzYwTGF1bmNoZXJFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgYXNtQ29tcG9uZW50U2VydmljZTogQXNtQ29tcG9uZW50U2VydmljZSxcbiAgICB1c2VyQWNjb3VudEZhY2FkZTogVXNlckFjY291bnRGYWNhZGUsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC91bmlmaWVkLXNpZ25hdHVyZXNcbiAgICBsYXVuY2hEaWFsb2dTZXJ2aWNlOiBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxuICAgIGZlYXR1cmVNb2R1bGVzOiBGZWF0dXJlTW9kdWxlc1NlcnZpY2VcbiAgKTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHNpbmNlIDcuMFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgYXNtQ29tcG9uZW50U2VydmljZTogQXNtQ29tcG9uZW50U2VydmljZSxcbiAgICB1c2VyQWNjb3VudEZhY2FkZTogVXNlckFjY291bnRGYWNhZGVcbiAgKTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFzbUNvbXBvbmVudFNlcnZpY2U6IEFzbUNvbXBvbmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJBY2NvdW50RmFjYWRlOiBVc2VyQWNjb3VudEZhY2FkZSxcbiAgICAvLyBUT0RPKENYU1BBLTMwOTApOiBSZW1vdmUgb3B0aW9uYWwgZmxhZyBpbiA3LjBcbiAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZT86IExhdW5jaERpYWxvZ1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIGZlYXR1cmVNb2R1bGVzPzogRmVhdHVyZU1vZHVsZXNTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmlzQXNtQ3VzdG9tZXIzNjBDb25maWd1cmVkID1cbiAgICAgIHRoaXMuZmVhdHVyZU1vZHVsZXM/LmlzQ29uZmlndXJlZCgnYXNtQ3VzdG9tZXIzNjAnKTtcbiAgICBpZiAodGhpcy5pc0FzbUN1c3RvbWVyMzYwQ29uZmlndXJlZCkge1xuICAgICAgLy8gdHJpZ2dlciBsYXp5IGxvYWRpbmcgb2YgdGhlIEN1c3RvbWVyIDM2MCBmZWF0dXJlOlxuICAgICAgdGhpcy5mZWF0dXJlTW9kdWxlcz8ucmVzb2x2ZUZlYXR1cmUoJ2FzbUN1c3RvbWVyMzYwJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pc0FzbUN1c3RvbWVyMzYwTG9hZGVkJC5uZXh0KHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy51c2VyQWNjb3VudEZhY2FkZS5nZXQoKS5zdWJzY3JpYmUoKHVzZXIpID0+IHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICB0aGlzLmN1c3RvbWVyID0gdXNlcjtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuaXNDdXN0b21lckVtdWxhdGlvblNlc3Npb25JblByb2dyZXNzJCA9XG4gICAgICB0aGlzLmFzbUNvbXBvbmVudFNlcnZpY2UuaXNDdXN0b21lckVtdWxhdGlvblNlc3Npb25JblByb2dyZXNzKCk7XG4gIH1cblxuICBsb2dvdXRDdXN0b21lcigpIHtcbiAgICB0aGlzLmFzbUNvbXBvbmVudFNlcnZpY2UubG9nb3V0Q3VzdG9tZXIoKTtcbiAgfVxuXG4gIG9wZW5Bc21DdXN0b21lcjM2MCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmlzQXNtQ3VzdG9tZXIzNjBMb2FkZWQkXG4gICAgICAgIC5waXBlKGZpbHRlcigoaXNSZWFkeSkgPT4gQm9vbGVhbihpc1JlYWR5KSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSB7IGN1c3RvbWVyOiB0aGlzLmN1c3RvbWVyIH07XG4gICAgICAgICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlPy5vcGVuRGlhbG9nQW5kU3Vic2NyaWJlKFxuICAgICAgICAgICAgTEFVTkNIX0NBTExFUi5BU01fQ1VTVE9NRVJfMzYwLFxuICAgICAgICAgICAgdGhpcy5hc21DdXN0b21lcjM2MExhdW5jaGVyRWxlbWVudCxcbiAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgICAgICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlPy5kaWFsb2dDbG9zZVxuICAgICAgICAgICAgICAucGlwZShmaWx0ZXIoKHJlc3VsdCkgPT4gQm9vbGVhbihyZXN1bHQpKSlcbiAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IEFzbURpYWxvZ0FjdGlvbkV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hc21Db21wb25lbnRTZXJ2aWNlLmhhbmRsZUFzbURpYWxvZ0FjdGlvbihldmVudCk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzQ3VzdG9tZXJFbXVsYXRpb25TZXNzaW9uSW5Qcm9ncmVzcyQgfCBhc3luY1wiPlxuICA8ZGl2IGNsYXNzPVwiY3gtYXNtLWN1c3RvbWVySW5mb1wiPlxuICAgIDxsYWJlbCBjbGFzcz1cImN4LWFzbS1uYW1lXCI+e3sgY3VzdG9tZXI/Lm5hbWUgfX08L2xhYmVsPlxuICAgIDxsYWJlbCBjbGFzcz1cImN4LWFzbS11aWRcIj57eyBjdXN0b21lcj8udWlkIH19PC9sYWJlbD5cbiAgPC9kaXY+XG4gIDxjeC1hc20tYmluZC1jYXJ0PjwvY3gtYXNtLWJpbmQtY2FydD5cbiAgPG5nLWNvbnRhaW5lciAqY3hGZWF0dXJlTGV2ZWw9XCInNi42J1wiPlxuICAgIDxidXR0b25cbiAgICAgICpuZ0lmPVwiaXNBc21DdXN0b21lcjM2MENvbmZpZ3VyZWQgJiYgY3VzdG9tZXJcIlxuICAgICAgI2FzbUN1c3RvbWVyMzYwTGF1bmNoZXJcbiAgICAgIGNsYXNzPVwiY3gtMzYwLWJ1dHRvblwiXG4gICAgICAoY2xpY2spPVwib3BlbkFzbUN1c3RvbWVyMzYwKClcIlxuICAgID5cbiAgICAgIHt7ICdhc20uYXNtQ3VzdG9tZXIzNjBCdXR0b24nIHwgY3hUcmFuc2xhdGUgfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxidXR0b24gZm9ybWNvbnRyb2xuYW1lPVwibG9nb3V0Q3VzdG9tZXJcIiAoY2xpY2spPVwibG9nb3V0Q3VzdG9tZXIoKVwiPlxuICAgIHt7ICdhc20uZW5kU2Vzc2lvbicgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L2J1dHRvbj5cbjwvbmctY29udGFpbmVyPlxuIl19