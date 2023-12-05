/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ng-select/ng-select";
import * as i3 from "@angular/forms";
import * as i4 from "../../ng-select-a11y/ng-select-a11y.directive";
import * as i5 from "@spartacus/core";
export class SortingComponent {
    constructor() {
        this.sortListEvent = new EventEmitter();
    }
    sortList(sortCode) {
        this.sortListEvent.emit(sortCode);
    }
    get selectedLabel() {
        if (this.selectedOption) {
            return (this.sortOptions?.find((sort) => sort.code === this.selectedOption)
                ?.name ?? this.sortLabels?.[this.selectedOption]);
        }
    }
}
SortingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SortingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SortingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SortingComponent, selector: "cx-sorting", inputs: { sortOptions: "sortOptions", ariaControls: "ariaControls", ariaLabel: "ariaLabel", selectedOption: "selectedOption", placeholder: "placeholder", sortLabels: "sortLabels" }, outputs: { sortListEvent: "sortListEvent" }, ngImport: i0, template: "<ng-select\n  [searchable]=\"false\"\n  [clearable]=\"false\"\n  placeholder=\"{{ placeholder }}\"\n  (change)=\"sortList($event)\"\n  [ngModel]=\"selectedOption\"\n  [cxNgSelectA11y]=\"{\n    ariaLabel: ariaLabel || ('productList.sortResults' | cxTranslate),\n    ariaControls: ariaControls\n  }\"\n>\n  <ng-option *ngFor=\"let sort of sortOptions\" [value]=\"sort.code\">{{\n    sort.name ? sort.name : sortLabels && sort.code ? sortLabels[sort.code] : ''\n  }}</ng-option>\n</ng-select>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i2.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "component", type: i2.NgOptionComponent, selector: "ng-option", inputs: ["value", "disabled"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i4.NgSelectA11yDirective, selector: "[cxNgSelectA11y]", inputs: ["cxNgSelectA11y"] }, { kind: "pipe", type: i5.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SortingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-sorting', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-select\n  [searchable]=\"false\"\n  [clearable]=\"false\"\n  placeholder=\"{{ placeholder }}\"\n  (change)=\"sortList($event)\"\n  [ngModel]=\"selectedOption\"\n  [cxNgSelectA11y]=\"{\n    ariaLabel: ariaLabel || ('productList.sortResults' | cxTranslate),\n    ariaControls: ariaControls\n  }\"\n>\n  <ng-option *ngFor=\"let sort of sortOptions\" [value]=\"sort.code\">{{\n    sort.name ? sort.name : sortLabels && sort.code ? sortLabels[sort.code] : ''\n  }}</ng-option>\n</ng-select>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { sortOptions: [{
                type: Input
            }], ariaControls: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], selectedOption: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], sortLabels: [{
                type: Input
            }], sortListEvent: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL2xpc3QtbmF2aWdhdGlvbi9zb3J0aW5nL3NvcnRpbmcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9saXN0LW5hdmlnYXRpb24vc29ydGluZy9zb3J0aW5nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztBQVF2QixNQUFNLE9BQU8sZ0JBQWdCO0lBaUIzQjtRQUNFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsUUFBUSxDQUFDLFFBQWdCO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsT0FBTyxDQUNMLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQ2pFLEVBQUUsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQ25ELENBQUM7U0FDSDtJQUNILENBQUM7OzZHQWhDVSxnQkFBZ0I7aUdBQWhCLGdCQUFnQixxUkNwQjdCLDZlQWVBOzJGREthLGdCQUFnQjtrQkFMNUIsU0FBUzsrQkFDRSxZQUFZLG1CQUVMLHVCQUF1QixDQUFDLE1BQU07MEVBSS9DLFdBQVc7c0JBRFYsS0FBSztnQkFHTixZQUFZO3NCQURYLEtBQUs7Z0JBR04sU0FBUztzQkFEUixLQUFLO2dCQUdOLGNBQWM7c0JBRGIsS0FBSztnQkFHTixXQUFXO3NCQURWLEtBQUs7Z0JBR04sVUFBVTtzQkFEVCxLQUFLO2dCQUlOLGFBQWE7c0JBRFosTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb3J0TW9kZWwgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1zb3J0aW5nJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NvcnRpbmcuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU29ydGluZ0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpXG4gIHNvcnRPcHRpb25zOiBTb3J0TW9kZWxbXSB8IHVuZGVmaW5lZDtcbiAgQElucHV0KClcbiAgYXJpYUNvbnRyb2xzOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKVxuICBzZWxlY3RlZE9wdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKVxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzb3J0TGFiZWxzOiB7IFtjb2RlOiBzdHJpbmddOiBzdHJpbmcgfSB8IG51bGw7XG5cbiAgQE91dHB1dCgpXG4gIHNvcnRMaXN0RXZlbnQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc29ydExpc3RFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICB9XG5cbiAgc29ydExpc3Qoc29ydENvZGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc29ydExpc3RFdmVudC5lbWl0KHNvcnRDb2RlKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZExhYmVsKCkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9uKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLnNvcnRPcHRpb25zPy5maW5kKChzb3J0KSA9PiBzb3J0LmNvZGUgPT09IHRoaXMuc2VsZWN0ZWRPcHRpb24pXG4gICAgICAgICAgPy5uYW1lID8/IHRoaXMuc29ydExhYmVscz8uW3RoaXMuc2VsZWN0ZWRPcHRpb25dXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiPG5nLXNlbGVjdFxuICBbc2VhcmNoYWJsZV09XCJmYWxzZVwiXG4gIFtjbGVhcmFibGVdPVwiZmFsc2VcIlxuICBwbGFjZWhvbGRlcj1cInt7IHBsYWNlaG9sZGVyIH19XCJcbiAgKGNoYW5nZSk9XCJzb3J0TGlzdCgkZXZlbnQpXCJcbiAgW25nTW9kZWxdPVwic2VsZWN0ZWRPcHRpb25cIlxuICBbY3hOZ1NlbGVjdEExMXldPVwie1xuICAgIGFyaWFMYWJlbDogYXJpYUxhYmVsIHx8ICgncHJvZHVjdExpc3Quc29ydFJlc3VsdHMnIHwgY3hUcmFuc2xhdGUpLFxuICAgIGFyaWFDb250cm9sczogYXJpYUNvbnRyb2xzXG4gIH1cIlxuPlxuICA8bmctb3B0aW9uICpuZ0Zvcj1cImxldCBzb3J0IG9mIHNvcnRPcHRpb25zXCIgW3ZhbHVlXT1cInNvcnQuY29kZVwiPnt7XG4gICAgc29ydC5uYW1lID8gc29ydC5uYW1lIDogc29ydExhYmVscyAmJiBzb3J0LmNvZGUgPyBzb3J0TGFiZWxzW3NvcnQuY29kZV0gOiAnJ1xuICB9fTwvbmctb3B0aW9uPlxuPC9uZy1zZWxlY3Q+XG4iXX0=