/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input, } from '@angular/core';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/core";
export class ConfiguratorConflictSuggestionComponent {
    constructor() {
        this.groupType = Configurator.GroupType;
        this.tabindex = '0';
        // Intentional empty constructor
    }
    /**
     * Verifies whether the conflict suggestion should be displayed for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the conflict description should be displayed, otherwise 'false'.
     */
    displayConflictSuggestion(group) {
        return group.groupType === Configurator.GroupType.CONFLICT_GROUP &&
            group.attributes
            ? group.attributes.length > 0
            : false;
    }
    createSuggestionUiKey() {
        return 'suggestion--' + this.suggestionNumber;
    }
}
ConfiguratorConflictSuggestionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSuggestionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorConflictSuggestionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorConflictSuggestionComponent, selector: "cx-configurator-conflict-suggestion", inputs: { currentGroup: "currentGroup", attribute: "attribute", suggestionNumber: "suggestionNumber" }, host: { properties: { "tabindex": "this.tabindex" } }, ngImport: i0, template: "<ng-container *ngIf=\"displayConflictSuggestion(currentGroup)\">\n  <div\n    class=\"cx-title\"\n    [attr.aria-label]=\"\n      ('configurator.conflict.suggestionTitle'\n        | cxTranslate: { number: suggestionNumber + 1 }) +\n      ' ' +\n      ('configurator.conflict.suggestionText'\n        | cxTranslate: { attribute: attribute.label })\n    \"\n  >\n    <span aria-hidden=\"true\">{{\n      'configurator.conflict.suggestionTitle'\n        | cxTranslate: { number: suggestionNumber + 1 }\n    }}</span>\n  </div>\n  <span aria-hidden=\"true\">{{\n    'configurator.conflict.suggestionText'\n      | cxTranslate: { attribute: attribute.label }\n  }}</span>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSuggestionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-conflict-suggestion', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayConflictSuggestion(currentGroup)\">\n  <div\n    class=\"cx-title\"\n    [attr.aria-label]=\"\n      ('configurator.conflict.suggestionTitle'\n        | cxTranslate: { number: suggestionNumber + 1 }) +\n      ' ' +\n      ('configurator.conflict.suggestionText'\n        | cxTranslate: { attribute: attribute.label })\n    \"\n  >\n    <span aria-hidden=\"true\">{{\n      'configurator.conflict.suggestionTitle'\n        | cxTranslate: { number: suggestionNumber + 1 }\n    }}</span>\n  </div>\n  <span aria-hidden=\"true\">{{\n    'configurator.conflict.suggestionText'\n      | cxTranslate: { attribute: attribute.label }\n  }}</span>\n</ng-container>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { currentGroup: [{
                type: Input
            }], attribute: [{
                type: Input
            }], suggestionNumber: [{
                type: Input
            }], tabindex: [{
                type: HostBinding,
                args: ['tabindex']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNvbmZsaWN0LXN1Z2dlc3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2NvbmZsaWN0LXN1Z2dlc3Rpb24vY29uZmlndXJhdG9yLWNvbmZsaWN0LXN1Z2dlc3Rpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2NvbmZsaWN0LXN1Z2dlc3Rpb24vY29uZmlndXJhdG9yLWNvbmZsaWN0LXN1Z2dlc3Rpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEdBQ04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7O0FBT25FLE1BQU0sT0FBTyx1Q0FBdUM7SUFTbEQ7UUFKQSxjQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQztRQUVWLGFBQVEsR0FBRyxHQUFHLENBQUM7UUFHdEMsZ0NBQWdDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHlCQUF5QixDQUFDLEtBQXlCO1FBQ2pELE9BQU8sS0FBSyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsU0FBUyxDQUFDLGNBQWM7WUFDOUQsS0FBSyxDQUFDLFVBQVU7WUFDaEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDN0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNaLENBQUM7SUFFRCxxQkFBcUI7UUFDbkIsT0FBTyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ2hELENBQUM7O29JQTVCVSx1Q0FBdUM7d0hBQXZDLHVDQUF1QywwT0NuQnBELCtxQkFxQkE7MkZERmEsdUNBQXVDO2tCQUxuRCxTQUFTOytCQUNFLHFDQUFxQyxtQkFFOUIsdUJBQXVCLENBQUMsTUFBTTswRUFHdEMsWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFJbUIsUUFBUTtzQkFBaEMsV0FBVzt1QkFBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY29uZmlndXJhdG9yLWNvbmZsaWN0LXN1Z2dlc3Rpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uZmlndXJhdG9yLWNvbmZsaWN0LXN1Z2dlc3Rpb24uY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQ29uZmxpY3RTdWdnZXN0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgY3VycmVudEdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXA7XG4gIEBJbnB1dCgpIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZTtcbiAgQElucHV0KCkgc3VnZ2VzdGlvbk51bWJlcjogbnVtYmVyO1xuXG4gIGdyb3VwVHlwZSA9IENvbmZpZ3VyYXRvci5Hcm91cFR5cGU7XG5cbiAgQEhvc3RCaW5kaW5nKCd0YWJpbmRleCcpIHRhYmluZGV4ID0gJzAnO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGNvbnN0cnVjdG9yXG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgY29uZmxpY3Qgc3VnZ2VzdGlvbiBzaG91bGQgYmUgZGlzcGxheWVkIGZvciB0aGUgY3VycmVudCBncm91cC5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGdyb3VwIC0gQ3VycmVudCBncm91cFxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICdUcnVlJyBpZiB0aGUgY29uZmxpY3QgZGVzY3JpcHRpb24gc2hvdWxkIGJlIGRpc3BsYXllZCwgb3RoZXJ3aXNlICdmYWxzZScuXG4gICAqL1xuICBkaXNwbGF5Q29uZmxpY3RTdWdnZXN0aW9uKGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXApOiBib29sZWFuIHtcbiAgICByZXR1cm4gZ3JvdXAuZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0dST1VQICYmXG4gICAgICBncm91cC5hdHRyaWJ1dGVzXG4gICAgICA/IGdyb3VwLmF0dHJpYnV0ZXMubGVuZ3RoID4gMFxuICAgICAgOiBmYWxzZTtcbiAgfVxuXG4gIGNyZWF0ZVN1Z2dlc3Rpb25VaUtleSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnc3VnZ2VzdGlvbi0tJyArIHRoaXMuc3VnZ2VzdGlvbk51bWJlcjtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXlDb25mbGljdFN1Z2dlc3Rpb24oY3VycmVudEdyb3VwKVwiPlxuICA8ZGl2XG4gICAgY2xhc3M9XCJjeC10aXRsZVwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAgICgnY29uZmlndXJhdG9yLmNvbmZsaWN0LnN1Z2dlc3Rpb25UaXRsZSdcbiAgICAgICAgfCBjeFRyYW5zbGF0ZTogeyBudW1iZXI6IHN1Z2dlc3Rpb25OdW1iZXIgKyAxIH0pICtcbiAgICAgICcgJyArXG4gICAgICAoJ2NvbmZpZ3VyYXRvci5jb25mbGljdC5zdWdnZXN0aW9uVGV4dCdcbiAgICAgICAgfCBjeFRyYW5zbGF0ZTogeyBhdHRyaWJ1dGU6IGF0dHJpYnV0ZS5sYWJlbCB9KVxuICAgIFwiXG4gID5cbiAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj57e1xuICAgICAgJ2NvbmZpZ3VyYXRvci5jb25mbGljdC5zdWdnZXN0aW9uVGl0bGUnXG4gICAgICAgIHwgY3hUcmFuc2xhdGU6IHsgbnVtYmVyOiBzdWdnZXN0aW9uTnVtYmVyICsgMSB9XG4gICAgfX08L3NwYW4+XG4gIDwvZGl2PlxuICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj57e1xuICAgICdjb25maWd1cmF0b3IuY29uZmxpY3Quc3VnZ2VzdGlvblRleHQnXG4gICAgICB8IGN4VHJhbnNsYXRlOiB7IGF0dHJpYnV0ZTogYXR0cmlidXRlLmxhYmVsIH1cbiAgfX08L3NwYW4+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==