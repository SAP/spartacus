/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export const CONFIGURATOR_TYPE_TEXTFIELD = 'TEXTFIELD';
export class OccConfiguratorTextfieldUpdateCartEntrySerializer {
    constructor() {
        // Intentional empty constructor
    }
    /**
     * Converts the attributes for the updateCartEntry request into OCC format. Most attributes are just copied,
     * except for the backend configurator type that needs to be set to 'TEXTFIELD'
     * @param source Attributes for updating a cart entries' configuration in generic format
     * @returns ttributes for updating a cart entries' configuration in OCC format
     */
    convert(source) {
        const configurationInfos = [];
        source.configuration?.configurationInfos.forEach((info) => this.convertInfo(info, configurationInfos));
        const target = {
            userId: source.userId,
            cartId: source.cartId,
            cartEntryNumber: source.cartEntryNumber,
            configurationInfos: configurationInfos,
        };
        return target;
    }
    convertInfo(source, occConfigurationInfos) {
        const occInfo = {
            configurationLabel: source.configurationLabel,
            configurationValue: source.configurationValue,
            status: source.status,
            configuratorType: CONFIGURATOR_TYPE_TEXTFIELD,
        };
        occConfigurationInfos.push(occInfo);
    }
}
OccConfiguratorTextfieldUpdateCartEntrySerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldUpdateCartEntrySerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorTextfieldUpdateCartEntrySerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldUpdateCartEntrySerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldUpdateCartEntrySerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci10ZXh0ZmllbGQtdXBkYXRlLWNhcnQtZW50cnktc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci90ZXh0ZmllbGQvb2NjL2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci10ZXh0ZmllbGQtdXBkYXRlLWNhcnQtZW50cnktc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFNM0MsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQUcsV0FBVyxDQUFDO0FBR3ZELE1BQU0sT0FBTyxpREFBaUQ7SUFPNUQ7UUFDRSxnQ0FBZ0M7SUFDbEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsT0FBTyxDQUNMLE1BQXVEO1FBRXZELE1BQU0sa0JBQWtCLEdBQXdCLEVBQUUsQ0FBQztRQUNuRCxNQUFNLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQzNDLENBQUM7UUFFRixNQUFNLE1BQU0sR0FBdUQ7WUFDakUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixlQUFlLEVBQUUsTUFBTSxDQUFDLGVBQWU7WUFDdkMsa0JBQWtCLEVBQUUsa0JBQWtCO1NBQ3ZDLENBQUM7UUFFRixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRVMsV0FBVyxDQUNuQixNQUErQyxFQUMvQyxxQkFBbUU7UUFFbkUsTUFBTSxPQUFPLEdBQStDO1lBQzFELGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxrQkFBa0I7WUFDN0Msa0JBQWtCLEVBQUUsTUFBTSxDQUFDLGtCQUFrQjtZQUM3QyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsZ0JBQWdCLEVBQUUsMkJBQTJCO1NBQzlDLENBQUM7UUFDRixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7OElBOUNVLGlEQUFpRDtrSkFBakQsaURBQWlELGNBRHBDLE1BQU07MkZBQ25CLGlEQUFpRDtrQkFEN0QsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbkluZm8gfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JUZXh0ZmllbGQgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci10ZXh0ZmllbGQubW9kZWwnO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yVGV4dGZpZWxkIH0gZnJvbSAnLi4vb2NjLWNvbmZpZ3VyYXRvci10ZXh0ZmllbGQubW9kZWxzJztcblxuZXhwb3J0IGNvbnN0IENPTkZJR1VSQVRPUl9UWVBFX1RFWFRGSUVMRCA9ICdURVhURklFTEQnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZFVwZGF0ZUNhcnRFbnRyeVNlcmlhbGl6ZXJcbiAgaW1wbGVtZW50c1xuICAgIENvbnZlcnRlcjxcbiAgICAgIENvbmZpZ3VyYXRvclRleHRmaWVsZC5VcGRhdGVDYXJ0RW50cnlQYXJhbWV0ZXJzLFxuICAgICAgT2NjQ29uZmlndXJhdG9yVGV4dGZpZWxkLlVwZGF0ZUNhcnRFbnRyeVBhcmFtZXRlcnNcbiAgICA+XG57XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGNvbnN0cnVjdG9yXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgdGhlIGF0dHJpYnV0ZXMgZm9yIHRoZSB1cGRhdGVDYXJ0RW50cnkgcmVxdWVzdCBpbnRvIE9DQyBmb3JtYXQuIE1vc3QgYXR0cmlidXRlcyBhcmUganVzdCBjb3BpZWQsXG4gICAqIGV4Y2VwdCBmb3IgdGhlIGJhY2tlbmQgY29uZmlndXJhdG9yIHR5cGUgdGhhdCBuZWVkcyB0byBiZSBzZXQgdG8gJ1RFWFRGSUVMRCdcbiAgICogQHBhcmFtIHNvdXJjZSBBdHRyaWJ1dGVzIGZvciB1cGRhdGluZyBhIGNhcnQgZW50cmllcycgY29uZmlndXJhdGlvbiBpbiBnZW5lcmljIGZvcm1hdFxuICAgKiBAcmV0dXJucyB0dHJpYnV0ZXMgZm9yIHVwZGF0aW5nIGEgY2FydCBlbnRyaWVzJyBjb25maWd1cmF0aW9uIGluIE9DQyBmb3JtYXRcbiAgICovXG4gIGNvbnZlcnQoXG4gICAgc291cmNlOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuVXBkYXRlQ2FydEVudHJ5UGFyYW1ldGVyc1xuICApOiBPY2NDb25maWd1cmF0b3JUZXh0ZmllbGQuVXBkYXRlQ2FydEVudHJ5UGFyYW1ldGVycyB7XG4gICAgY29uc3QgY29uZmlndXJhdGlvbkluZm9zOiBDb25maWd1cmF0aW9uSW5mb1tdID0gW107XG4gICAgc291cmNlLmNvbmZpZ3VyYXRpb24/LmNvbmZpZ3VyYXRpb25JbmZvcy5mb3JFYWNoKChpbmZvKSA9PlxuICAgICAgdGhpcy5jb252ZXJ0SW5mbyhpbmZvLCBjb25maWd1cmF0aW9uSW5mb3MpXG4gICAgKTtcblxuICAgIGNvbnN0IHRhcmdldDogT2NjQ29uZmlndXJhdG9yVGV4dGZpZWxkLlVwZGF0ZUNhcnRFbnRyeVBhcmFtZXRlcnMgPSB7XG4gICAgICB1c2VySWQ6IHNvdXJjZS51c2VySWQsXG4gICAgICBjYXJ0SWQ6IHNvdXJjZS5jYXJ0SWQsXG4gICAgICBjYXJ0RW50cnlOdW1iZXI6IHNvdXJjZS5jYXJ0RW50cnlOdW1iZXIsXG4gICAgICBjb25maWd1cmF0aW9uSW5mb3M6IGNvbmZpZ3VyYXRpb25JbmZvcyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb252ZXJ0SW5mbyhcbiAgICBzb3VyY2U6IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uSW5mbyxcbiAgICBvY2NDb25maWd1cmF0aW9uSW5mb3M6IE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uSW5mb1tdXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IG9jY0luZm86IE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uSW5mbyA9IHtcbiAgICAgIGNvbmZpZ3VyYXRpb25MYWJlbDogc291cmNlLmNvbmZpZ3VyYXRpb25MYWJlbCxcbiAgICAgIGNvbmZpZ3VyYXRpb25WYWx1ZTogc291cmNlLmNvbmZpZ3VyYXRpb25WYWx1ZSxcbiAgICAgIHN0YXR1czogc291cmNlLnN0YXR1cyxcbiAgICAgIGNvbmZpZ3VyYXRvclR5cGU6IENPTkZJR1VSQVRPUl9UWVBFX1RFWFRGSUVMRCxcbiAgICB9O1xuICAgIG9jY0NvbmZpZ3VyYXRpb25JbmZvcy5wdXNoKG9jY0luZm8pO1xuICB9XG59XG4iXX0=