/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CpqConfiguratorCommonModule } from './common/cpq-configurator-common.module';
import { CpqConfiguratorOccModule } from './occ/cpq-configurator-occ.module';
import { CpqConfiguratorRestModule } from './rest/cpq-configurator-rest.module';
import * as i0 from "@angular/core";
/**
 * Exposes the CPQ flavor of rulebase configurator, which connects to CPQ directly via
 * REST APIs and to commerce via OCC
 */
export class RulebasedCpqConfiguratorModule {
}
RulebasedCpqConfiguratorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedCpqConfiguratorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedCpqConfiguratorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedCpqConfiguratorModule, imports: [CpqConfiguratorCommonModule,
        CpqConfiguratorOccModule,
        CpqConfiguratorRestModule] });
RulebasedCpqConfiguratorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedCpqConfiguratorModule, imports: [CpqConfiguratorCommonModule,
        CpqConfiguratorOccModule,
        CpqConfiguratorRestModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedCpqConfiguratorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CpqConfiguratorCommonModule,
                        CpqConfiguratorOccModule,
                        CpqConfiguratorRestModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZWJhc2VkLWNwcS1jb25maWd1cmF0b3IubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jcHEvcnVsZWJhc2VkLWNwcS1jb25maWd1cmF0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQUVoRjs7O0dBR0c7QUFRSCxNQUFNLE9BQU8sOEJBQThCOzsySEFBOUIsOEJBQThCOzRIQUE5Qiw4QkFBOEIsWUFMdkMsMkJBQTJCO1FBQzNCLHdCQUF3QjtRQUN4Qix5QkFBeUI7NEhBR2hCLDhCQUE4QixZQUx2QywyQkFBMkI7UUFDM0Isd0JBQXdCO1FBQ3hCLHlCQUF5QjsyRkFHaEIsOEJBQThCO2tCQVAxQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCwyQkFBMkI7d0JBQzNCLHdCQUF3Qjt3QkFDeEIseUJBQXlCO3FCQUMxQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDcHFDb25maWd1cmF0b3JDb21tb25Nb2R1bGUgfSBmcm9tICcuL2NvbW1vbi9jcHEtY29uZmlndXJhdG9yLWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ3BxQ29uZmlndXJhdG9yT2NjTW9kdWxlIH0gZnJvbSAnLi9vY2MvY3BxLWNvbmZpZ3VyYXRvci1vY2MubW9kdWxlJztcbmltcG9ydCB7IENwcUNvbmZpZ3VyYXRvclJlc3RNb2R1bGUgfSBmcm9tICcuL3Jlc3QvY3BxLWNvbmZpZ3VyYXRvci1yZXN0Lm1vZHVsZSc7XG5cbi8qKlxuICogRXhwb3NlcyB0aGUgQ1BRIGZsYXZvciBvZiBydWxlYmFzZSBjb25maWd1cmF0b3IsIHdoaWNoIGNvbm5lY3RzIHRvIENQUSBkaXJlY3RseSB2aWFcbiAqIFJFU1QgQVBJcyBhbmQgdG8gY29tbWVyY2UgdmlhIE9DQ1xuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ3BxQ29uZmlndXJhdG9yQ29tbW9uTW9kdWxlLFxuICAgIENwcUNvbmZpZ3VyYXRvck9jY01vZHVsZSxcbiAgICBDcHFDb25maWd1cmF0b3JSZXN0TW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBSdWxlYmFzZWRDcHFDb25maWd1cmF0b3JNb2R1bGUge31cbiJdfQ==