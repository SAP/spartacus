/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SiteContextType } from './site-context.model';
import * as i0 from "@angular/core";
import * as i1 from "./site-context-selector.component";
export class LanguageCurrencyComponent {
    constructor() {
        this.siteContextType = SiteContextType;
    }
}
LanguageCurrencyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LanguageCurrencyComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
LanguageCurrencyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: LanguageCurrencyComponent, selector: "cx-language-currency-selector", ngImport: i0, template: `
    <cx-site-context-selector
      [context]="siteContextType.LANGUAGE"
    ></cx-site-context-selector>
    <cx-site-context-selector
      [context]="siteContextType.CURRENCY"
    ></cx-site-context-selector>
  `, isInline: true, dependencies: [{ kind: "component", type: i1.SiteContextSelectorComponent, selector: "cx-site-context-selector", inputs: ["context"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LanguageCurrencyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-language-currency-selector',
                    template: `
    <cx-site-context-selector
      [context]="siteContextType.LANGUAGE"
    ></cx-site-context-selector>
    <cx-site-context-selector
      [context]="siteContextType.CURRENCY"
    ></cx-site-context-selector>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UtY3VycmVuY3kuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9taXNjL3NpdGUtY29udGV4dC1zZWxlY3Rvci9sYW5ndWFnZS1jdXJyZW5jeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7QUFjdkQsTUFBTSxPQUFPLHlCQUF5QjtJQVp0QztRQWFXLG9CQUFlLEdBQUcsZUFBZSxDQUFDO0tBQzVDOztzSEFGWSx5QkFBeUI7MEdBQXpCLHlCQUF5QixxRUFWMUI7Ozs7Ozs7R0FPVDsyRkFHVSx5QkFBeUI7a0JBWnJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsUUFBUSxFQUFFOzs7Ozs7O0dBT1Q7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRUeXBlIH0gZnJvbSAnLi9zaXRlLWNvbnRleHQubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1sYW5ndWFnZS1jdXJyZW5jeS1zZWxlY3RvcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGN4LXNpdGUtY29udGV4dC1zZWxlY3RvclxuICAgICAgW2NvbnRleHRdPVwic2l0ZUNvbnRleHRUeXBlLkxBTkdVQUdFXCJcbiAgICA+PC9jeC1zaXRlLWNvbnRleHQtc2VsZWN0b3I+XG4gICAgPGN4LXNpdGUtY29udGV4dC1zZWxlY3RvclxuICAgICAgW2NvbnRleHRdPVwic2l0ZUNvbnRleHRUeXBlLkNVUlJFTkNZXCJcbiAgICA+PC9jeC1zaXRlLWNvbnRleHQtc2VsZWN0b3I+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBMYW5ndWFnZUN1cnJlbmN5Q29tcG9uZW50IHtcbiAgcmVhZG9ubHkgc2l0ZUNvbnRleHRUeXBlID0gU2l0ZUNvbnRleHRUeXBlO1xufVxuIl19