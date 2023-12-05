/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input, } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/storefront";
export class ConfiguratorConflictDescriptionComponent {
    constructor() {
        this.groupType = Configurator.GroupType;
        this.iconTypes = ICON_TYPE;
        this.tabindex = '0';
        // Intentional empty constructor
    }
    /**
     * Verifies whether the  conflict description should be displayed for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the conflict description should be displayed, otherwise 'false'.
     */
    displayConflictDescription(group) {
        return group.groupType === Configurator.GroupType.CONFLICT_GROUP;
    }
}
ConfiguratorConflictDescriptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictDescriptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorConflictDescriptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorConflictDescriptionComponent, selector: "cx-configurator-conflict-description", inputs: { currentGroup: "currentGroup" }, host: { properties: { "tabindex": "this.tabindex" } }, ngImport: i0, template: "<ng-container *ngIf=\"displayConflictDescription(currentGroup)\">\n  <cx-icon [type]=\"iconTypes.WARNING\" aria-hidden=\"true\"></cx-icon>\n  {{ currentGroup.name }}\n</ng-container>\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictDescriptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-conflict-description', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayConflictDescription(currentGroup)\">\n  <cx-icon [type]=\"iconTypes.WARNING\" aria-hidden=\"true\"></cx-icon>\n  {{ currentGroup.name }}\n</ng-container>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { currentGroup: [{
                type: Input
            }], tabindex: [{
                type: HostBinding,
                args: ['tabindex']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNvbmZsaWN0LWRlc2NyaXB0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9jb25mbGljdC1kZXNjcmlwdGlvbi9jb25maWd1cmF0b3ItY29uZmxpY3QtZGVzY3JpcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2NvbmZsaWN0LWRlc2NyaXB0aW9uL2NvbmZpZ3VyYXRvci1jb25mbGljdC1kZXNjcmlwdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsV0FBVyxFQUNYLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7O0FBT25FLE1BQU0sT0FBTyx3Q0FBd0M7SUFRbkQ7UUFMQSxjQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxjQUFTLEdBQUcsU0FBUyxDQUFDO1FBRUcsYUFBUSxHQUFHLEdBQUcsQ0FBQztRQUd0QyxnQ0FBZ0M7SUFDbEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsMEJBQTBCLENBQUMsS0FBeUI7UUFDbEQsT0FBTyxLQUFLLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO0lBQ25FLENBQUM7O3FJQXBCVSx3Q0FBd0M7eUhBQXhDLHdDQUF3Qyw2S0NwQnJELDBMQUlBOzJGRGdCYSx3Q0FBd0M7a0JBTHBELFNBQVM7K0JBQ0Usc0NBQXNDLG1CQUUvQix1QkFBdUIsQ0FBQyxNQUFNOzBFQUd0QyxZQUFZO3NCQUFwQixLQUFLO2dCQUttQixRQUFRO3NCQUFoQyxXQUFXO3VCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUNPTl9UWVBFIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY29uZmlndXJhdG9yLWNvbmZsaWN0LWRlc2NyaXB0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpZ3VyYXRvci1jb25mbGljdC1kZXNjcmlwdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JDb25mbGljdERlc2NyaXB0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgY3VycmVudEdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXA7XG5cbiAgZ3JvdXBUeXBlID0gQ29uZmlndXJhdG9yLkdyb3VwVHlwZTtcbiAgaWNvblR5cGVzID0gSUNPTl9UWVBFO1xuXG4gIEBIb3N0QmluZGluZygndGFiaW5kZXgnKSB0YWJpbmRleCA9ICcwJztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlICBjb25mbGljdCBkZXNjcmlwdGlvbiBzaG91bGQgYmUgZGlzcGxheWVkIGZvciB0aGUgY3VycmVudCBncm91cC5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGdyb3VwIC0gQ3VycmVudCBncm91cFxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICdUcnVlJyBpZiB0aGUgY29uZmxpY3QgZGVzY3JpcHRpb24gc2hvdWxkIGJlIGRpc3BsYXllZCwgb3RoZXJ3aXNlICdmYWxzZScuXG4gICAqL1xuICBkaXNwbGF5Q29uZmxpY3REZXNjcmlwdGlvbihncm91cDogQ29uZmlndXJhdG9yLkdyb3VwKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGdyb3VwLmdyb3VwVHlwZSA9PT0gQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9HUk9VUDtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXlDb25mbGljdERlc2NyaXB0aW9uKGN1cnJlbnRHcm91cClcIj5cbiAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGVzLldBUk5JTkdcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2N4LWljb24+XG4gIHt7IGN1cnJlbnRHcm91cC5uYW1lIH19XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==