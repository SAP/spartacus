/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, } from '@angular/core';
import { ICON_TYPE, BREAKPOINT, } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
import * as i1 from "../../core/facade/configurator-commons.service";
import * as i2 from "../../core/facade/configurator-groups.service";
import * as i3 from "@spartacus/product-configurator/common";
import * as i4 from "../../core/services/configurator-expert-mode.service";
import * as i5 from "@spartacus/storefront";
import * as i6 from "../service/configurator-storefront-utils.service";
import * as i7 from "@angular/common";
export class ConfiguratorGroupTitleComponent {
    constructor(configuratorCommonsService, configuratorGroupsService, configRouterExtractorService, configExpertModeService, breakpointService, configuratorStorefrontUtilsService, hamburgerMenuService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configExpertModeService = configExpertModeService;
        this.breakpointService = breakpointService;
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.hamburgerMenuService = hamburgerMenuService;
        this.ghostStyle = true;
        this.subscription = new Subscription();
        this.PRE_HEADER = '.PreHeader';
        this.displayedGroup$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorGroupsService.getCurrentGroup(routerData.owner).pipe(tap(() => {
            this.ghostStyle = false;
        }))));
        this.iconTypes = ICON_TYPE;
    }
    ngOnInit() {
        this.subscription.add(this.hamburgerMenuService.isExpanded.subscribe((isExpanded) => {
            if (!isExpanded) {
                this.configuratorStorefrontUtilsService.changeStyling(this.PRE_HEADER, 'display', 'none');
            }
            else {
                this.configuratorStorefrontUtilsService.changeStyling(this.PRE_HEADER, 'display', 'block');
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.configuratorStorefrontUtilsService.removeStyling(this.PRE_HEADER, 'display');
    }
    getGroupTitle(group) {
        let title = group.description;
        if (group.groupType !== Configurator.GroupType.CONFLICT_GROUP) {
            this.configExpertModeService
                .getExpModeActive()
                .pipe(take(1))
                .subscribe((expMode) => {
                if (expMode) {
                    title += ` / [${group.name}]`;
                }
            });
        }
        return title;
    }
    /**
     * Verifies whether the current screen size equals or is smaller than breakpoint `BREAKPOINT.md`.
     *
     * @returns {Observable<boolean>} - If the given breakpoint equals or is smaller than`BREAKPOINT.md` returns `true`, otherwise `false`.
     */
    isMobile() {
        return this.breakpointService.isDown(BREAKPOINT.md);
    }
}
ConfiguratorGroupTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupTitleComponent, deps: [{ token: i1.ConfiguratorCommonsService }, { token: i2.ConfiguratorGroupsService }, { token: i3.ConfiguratorRouterExtractorService }, { token: i4.ConfiguratorExpertModeService }, { token: i5.BreakpointService }, { token: i6.ConfiguratorStorefrontUtilsService }, { token: i5.HamburgerMenuService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorGroupTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorGroupTitleComponent, selector: "cx-configurator-group-title", host: { properties: { "class.ghost": "this.ghostStyle" } }, ngImport: i0, template: "<ng-container *ngIf=\"displayedGroup$ | async as group; else ghostGroup\">\n  <div class=\"cx-group-title\">\n    <ng-container *ngIf=\"isMobile() | async\">\n      <cx-hamburger-menu></cx-hamburger-menu>\n    </ng-container>\n\n    {{ getGroupTitle(group) }}\n  </div>\n</ng-container>\n<ng-template #ghostGroup>\n  <div class=\"cx-ghost-group-title\"></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.HamburgerMenuComponent, selector: "cx-hamburger-menu" }, { kind: "pipe", type: i7.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-group-title', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayedGroup$ | async as group; else ghostGroup\">\n  <div class=\"cx-group-title\">\n    <ng-container *ngIf=\"isMobile() | async\">\n      <cx-hamburger-menu></cx-hamburger-menu>\n    </ng-container>\n\n    {{ getGroupTitle(group) }}\n  </div>\n</ng-container>\n<ng-template #ghostGroup>\n  <div class=\"cx-ghost-group-title\"></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorCommonsService }, { type: i2.ConfiguratorGroupsService }, { type: i3.ConfiguratorRouterExtractorService }, { type: i4.ConfiguratorExpertModeService }, { type: i5.BreakpointService }, { type: i6.ConfiguratorStorefrontUtilsService }, { type: i5.HamburgerMenuService }]; }, propDecorators: { ghostStyle: [{
                type: HostBinding,
                args: ['class.ghost']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWdyb3VwLXRpdGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9ncm91cC10aXRsZS9jb25maWd1cmF0b3ItZ3JvdXAtdGl0bGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2dyb3VwLXRpdGxlL2NvbmZpZ3VyYXRvci1ncm91cC10aXRsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsV0FBVyxHQUdaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxTQUFTLEVBRVQsVUFBVSxHQUVYLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7Ozs7OztBQVNuRSxNQUFNLE9BQU8sK0JBQStCO0lBaUIxQyxZQUNZLDBCQUFzRCxFQUN0RCx5QkFBb0QsRUFDcEQsNEJBQWdFLEVBQ2hFLHVCQUFzRCxFQUN0RCxpQkFBb0MsRUFDcEMsa0NBQXNFLEVBQ3RFLG9CQUEwQztRQU4xQywrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1FBQ3RELDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsaUNBQTRCLEdBQTVCLDRCQUE0QixDQUFvQztRQUNoRSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQStCO1FBQ3RELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsdUNBQWtDLEdBQWxDLGtDQUFrQyxDQUFvQztRQUN0RSx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBdkIxQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6QixlQUFVLEdBQUcsWUFBWSxDQUFDO1FBRTdDLG9CQUFlLEdBQ2IsSUFBSSxDQUFDLDRCQUE0QixDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUN4RCxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUN2QixJQUFJLENBQUMseUJBQXlCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQ25FLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FDSCxDQUNGLENBQ0YsQ0FBQztRQUNKLGNBQVMsR0FBRyxTQUFTLENBQUM7SUFVbkIsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUM1RCxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxhQUFhLENBQ25ELElBQUksQ0FBQyxVQUFVLEVBQ2YsU0FBUyxFQUNULE1BQU0sQ0FDUCxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLGFBQWEsQ0FDbkQsSUFBSSxDQUFDLFVBQVUsRUFDZixTQUFTLEVBQ1QsT0FBTyxDQUNSLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLGFBQWEsQ0FDbkQsSUFBSSxDQUFDLFVBQVUsRUFDZixTQUFTLENBQ1YsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBeUI7UUFDckMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUM5QixJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUU7WUFDN0QsSUFBSSxDQUFDLHVCQUF1QjtpQkFDekIsZ0JBQWdCLEVBQUU7aUJBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2IsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksT0FBTyxFQUFFO29CQUNYLEtBQUssSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQztpQkFDL0I7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7OzRIQTdFVSwrQkFBK0I7Z0hBQS9CLCtCQUErQiwrSENqQzVDLDJYQVlBOzJGRHFCYSwrQkFBK0I7a0JBTDNDLFNBQVM7K0JBQ0UsNkJBQTZCLG1CQUV0Qix1QkFBdUIsQ0FBQyxNQUFNOzBXQUduQixVQUFVO3NCQUFyQyxXQUFXO3VCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uJztcbmltcG9ydCB7XG4gIElDT05fVFlQRSxcbiAgSGFtYnVyZ2VyTWVudVNlcnZpY2UsXG4gIEJSRUFLUE9JTlQsXG4gIEJyZWFrcG9pbnRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLWNvbW1vbnMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLWdyb3Vwcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckV4cGVydE1vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9jb25maWd1cmF0b3ItZXhwZXJ0LW1vZGUuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9jb25maWd1cmF0b3Itc3RvcmVmcm9udC11dGlscy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY29uZmlndXJhdG9yLWdyb3VwLXRpdGxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpZ3VyYXRvci1ncm91cC10aXRsZS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JHcm91cFRpdGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmdob3N0JykgZ2hvc3RTdHlsZSA9IHRydWU7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByb3RlY3RlZCByZWFkb25seSBQUkVfSEVBREVSID0gJy5QcmVIZWFkZXInO1xuXG4gIGRpc3BsYXllZEdyb3VwJDogT2JzZXJ2YWJsZTxDb25maWd1cmF0b3IuR3JvdXA+ID1cbiAgICB0aGlzLmNvbmZpZ1JvdXRlckV4dHJhY3RvclNlcnZpY2UuZXh0cmFjdFJvdXRlckRhdGEoKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChyb3V0ZXJEYXRhKSA9PlxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UuZ2V0Q3VycmVudEdyb3VwKHJvdXRlckRhdGEub3duZXIpLnBpcGUoXG4gICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2hvc3RTdHlsZSA9IGZhbHNlO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlOiBDb25maWd1cmF0b3JDb21tb25zU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yR3JvdXBzU2VydmljZTogQ29uZmlndXJhdG9yR3JvdXBzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnUm91dGVyRXh0cmFjdG9yU2VydmljZTogQ29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnRXhwZXJ0TW9kZVNlcnZpY2U6IENvbmZpZ3VyYXRvckV4cGVydE1vZGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBicmVha3BvaW50U2VydmljZTogQnJlYWtwb2ludFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2U6IENvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGhhbWJ1cmdlck1lbnVTZXJ2aWNlOiBIYW1idXJnZXJNZW51U2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5oYW1idXJnZXJNZW51U2VydmljZS5pc0V4cGFuZGVkLnN1YnNjcmliZSgoaXNFeHBhbmRlZCkgPT4ge1xuICAgICAgICBpZiAoIWlzRXhwYW5kZWQpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UuY2hhbmdlU3R5bGluZyhcbiAgICAgICAgICAgIHRoaXMuUFJFX0hFQURFUixcbiAgICAgICAgICAgICdkaXNwbGF5JyxcbiAgICAgICAgICAgICdub25lJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlLmNoYW5nZVN0eWxpbmcoXG4gICAgICAgICAgICB0aGlzLlBSRV9IRUFERVIsXG4gICAgICAgICAgICAnZGlzcGxheScsXG4gICAgICAgICAgICAnYmxvY2snXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UucmVtb3ZlU3R5bGluZyhcbiAgICAgIHRoaXMuUFJFX0hFQURFUixcbiAgICAgICdkaXNwbGF5J1xuICAgICk7XG4gIH1cblxuICBnZXRHcm91cFRpdGxlKGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGxldCB0aXRsZSA9IGdyb3VwLmRlc2NyaXB0aW9uO1xuICAgIGlmIChncm91cC5ncm91cFR5cGUgIT09IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfR1JPVVApIHtcbiAgICAgIHRoaXMuY29uZmlnRXhwZXJ0TW9kZVNlcnZpY2VcbiAgICAgICAgLmdldEV4cE1vZGVBY3RpdmUoKVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKChleHBNb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKGV4cE1vZGUpIHtcbiAgICAgICAgICAgIHRpdGxlICs9IGAgLyBbJHtncm91cC5uYW1lfV1gO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBjdXJyZW50IHNjcmVlbiBzaXplIGVxdWFscyBvciBpcyBzbWFsbGVyIHRoYW4gYnJlYWtwb2ludCBgQlJFQUtQT0lOVC5tZGAuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGJvb2xlYW4+fSAtIElmIHRoZSBnaXZlbiBicmVha3BvaW50IGVxdWFscyBvciBpcyBzbWFsbGVyIHRoYW5gQlJFQUtQT0lOVC5tZGAgcmV0dXJucyBgdHJ1ZWAsIG90aGVyd2lzZSBgZmFsc2VgLlxuICAgKi9cbiAgaXNNb2JpbGUoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuYnJlYWtwb2ludFNlcnZpY2UuaXNEb3duKEJSRUFLUE9JTlQubWQpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzcGxheWVkR3JvdXAkIHwgYXN5bmMgYXMgZ3JvdXA7IGVsc2UgZ2hvc3RHcm91cFwiPlxuICA8ZGl2IGNsYXNzPVwiY3gtZ3JvdXAtdGl0bGVcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNNb2JpbGUoKSB8IGFzeW5jXCI+XG4gICAgICA8Y3gtaGFtYnVyZ2VyLW1lbnU+PC9jeC1oYW1idXJnZXItbWVudT5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIHt7IGdldEdyb3VwVGl0bGUoZ3JvdXApIH19XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG48bmctdGVtcGxhdGUgI2dob3N0R3JvdXA+XG4gIDxkaXYgY2xhc3M9XCJjeC1naG9zdC1ncm91cC10aXRsZVwiPjwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==