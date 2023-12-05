/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/profile-tag.injector.service";
import * as i2 from "@angular/common";
export class ProfileTagComponent {
    constructor(profileTagInjector) {
        this.profileTagInjector = profileTagInjector;
        this.profileTagEnabled$ = this.profileTagInjector.track();
    }
}
ProfileTagComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagComponent, deps: [{ token: i1.ProfileTagInjectorService }], target: i0.ɵɵFactoryTarget.Component });
ProfileTagComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProfileTagComponent, selector: "cx-profiletag", ngImport: i0, template: `
    <ng-container *ngIf="profileTagEnabled$ | async"></ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'cx-profiletag',
                    template: `
    <ng-container *ngIf="profileTagEnabled$ | async"></ng-container>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.ProfileTagInjectorService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS10YWcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZHMvc3JjL3Byb2ZpbGV0YWcvY21zLWNvbXBvbmVudHMvcHJvZmlsZS10YWcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBV25FLE1BQU0sT0FBTyxtQkFBbUI7SUFFOUIsWUFBb0Isa0JBQTZDO1FBQTdDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBMkI7UUFEakUsdUJBQWtCLEdBQXdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNOLENBQUM7O2dIQUYxRCxtQkFBbUI7b0dBQW5CLG1CQUFtQixxREFKcEI7O0dBRVQ7MkZBRVUsbUJBQW1CO2tCQVAvQixTQUFTO21CQUFDO29CQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFOztHQUVUO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUHJvZmlsZVRhZ0luamVjdG9yU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Byb2ZpbGUtdGFnLmluamVjdG9yLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnY3gtcHJvZmlsZXRhZycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInByb2ZpbGVUYWdFbmFibGVkJCB8IGFzeW5jXCI+PC9uZy1jb250YWluZXI+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVUYWdDb21wb25lbnQge1xuICBwcm9maWxlVGFnRW5hYmxlZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLnByb2ZpbGVUYWdJbmplY3Rvci50cmFjaygpO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByb2ZpbGVUYWdJbmplY3RvcjogUHJvZmlsZVRhZ0luamVjdG9yU2VydmljZSkge31cbn1cbiJdfQ==