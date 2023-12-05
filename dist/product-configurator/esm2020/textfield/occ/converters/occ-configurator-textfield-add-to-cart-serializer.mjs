/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export const CONFIGURATOR_TYPE_TEXTFIELD = 'TEXTFIELD';
export class OccConfiguratorTextfieldAddToCartSerializer {
    constructor() {
        // Intentional empty constructor
    }
    /**
     * Converts addToCart parameters into the OCC format
     * @param source Add to cart parameters in generic format
     * @param target Add to cart parameters in OCC format. Optional, can be used in case converters should be chained
     * @returns Add to cart parameters in OCC format
     */
    convert(source, target) {
        const configurationInfos = [];
        source.configuration?.configurationInfos.forEach((info) => this.convertInfo(info, configurationInfos));
        const resultTarget = {
            ...target,
            userId: source.userId,
            cartId: source.cartId,
            product: { code: source.productCode },
            quantity: source.quantity,
            configurationInfos: configurationInfos,
        };
        return resultTarget;
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
OccConfiguratorTextfieldAddToCartSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldAddToCartSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorTextfieldAddToCartSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldAddToCartSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldAddToCartSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci10ZXh0ZmllbGQtYWRkLXRvLWNhcnQtc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci90ZXh0ZmllbGQvb2NjL2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci10ZXh0ZmllbGQtYWRkLXRvLWNhcnQtc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFNM0MsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQUcsV0FBVyxDQUFDO0FBR3ZELE1BQU0sT0FBTywyQ0FBMkM7SUFPdEQ7UUFDRSxnQ0FBZ0M7SUFDbEMsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0gsT0FBTyxDQUNMLE1BQWlELEVBQ2pELE1BQXFEO1FBRXJELE1BQU0sa0JBQWtCLEdBQXdCLEVBQUUsQ0FBQztRQUNuRCxNQUFNLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQzNDLENBQUM7UUFFRixNQUFNLFlBQVksR0FBaUQ7WUFDakUsR0FBRyxNQUFNO1lBQ1QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUNyQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsa0JBQWtCLEVBQUUsa0JBQWtCO1NBQ3ZDLENBQUM7UUFFRixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRVMsV0FBVyxDQUNuQixNQUErQyxFQUMvQyxxQkFBbUU7UUFFbkUsTUFBTSxPQUFPLEdBQStDO1lBQzFELGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxrQkFBa0I7WUFDN0Msa0JBQWtCLEVBQUUsTUFBTSxDQUFDLGtCQUFrQjtZQUM3QyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsZ0JBQWdCLEVBQUUsMkJBQTJCO1NBQzlDLENBQUM7UUFDRixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7d0lBaERVLDJDQUEyQzs0SUFBM0MsMkNBQTJDLGNBRDlCLE1BQU07MkZBQ25CLDJDQUEyQztrQkFEdkQsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbkluZm8gfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JUZXh0ZmllbGQgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci10ZXh0ZmllbGQubW9kZWwnO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yVGV4dGZpZWxkIH0gZnJvbSAnLi4vb2NjLWNvbmZpZ3VyYXRvci10ZXh0ZmllbGQubW9kZWxzJztcblxuZXhwb3J0IGNvbnN0IENPTkZJR1VSQVRPUl9UWVBFX1RFWFRGSUVMRCA9ICdURVhURklFTEQnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZEFkZFRvQ2FydFNlcmlhbGl6ZXJcbiAgaW1wbGVtZW50c1xuICAgIENvbnZlcnRlcjxcbiAgICAgIENvbmZpZ3VyYXRvclRleHRmaWVsZC5BZGRUb0NhcnRQYXJhbWV0ZXJzLFxuICAgICAgT2NjQ29uZmlndXJhdG9yVGV4dGZpZWxkLkFkZFRvQ2FydFBhcmFtZXRlcnNcbiAgICA+XG57XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGNvbnN0cnVjdG9yXG4gIH1cbiAgLyoqXG4gICAqIENvbnZlcnRzIGFkZFRvQ2FydCBwYXJhbWV0ZXJzIGludG8gdGhlIE9DQyBmb3JtYXRcbiAgICogQHBhcmFtIHNvdXJjZSBBZGQgdG8gY2FydCBwYXJhbWV0ZXJzIGluIGdlbmVyaWMgZm9ybWF0XG4gICAqIEBwYXJhbSB0YXJnZXQgQWRkIHRvIGNhcnQgcGFyYW1ldGVycyBpbiBPQ0MgZm9ybWF0LiBPcHRpb25hbCwgY2FuIGJlIHVzZWQgaW4gY2FzZSBjb252ZXJ0ZXJzIHNob3VsZCBiZSBjaGFpbmVkXG4gICAqIEByZXR1cm5zIEFkZCB0byBjYXJ0IHBhcmFtZXRlcnMgaW4gT0NDIGZvcm1hdFxuICAgKi9cbiAgY29udmVydChcbiAgICBzb3VyY2U6IENvbmZpZ3VyYXRvclRleHRmaWVsZC5BZGRUb0NhcnRQYXJhbWV0ZXJzLFxuICAgIHRhcmdldD86IE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZC5BZGRUb0NhcnRQYXJhbWV0ZXJzXG4gICk6IE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZC5BZGRUb0NhcnRQYXJhbWV0ZXJzIHtcbiAgICBjb25zdCBjb25maWd1cmF0aW9uSW5mb3M6IENvbmZpZ3VyYXRpb25JbmZvW10gPSBbXTtcbiAgICBzb3VyY2UuY29uZmlndXJhdGlvbj8uY29uZmlndXJhdGlvbkluZm9zLmZvckVhY2goKGluZm8pID0+XG4gICAgICB0aGlzLmNvbnZlcnRJbmZvKGluZm8sIGNvbmZpZ3VyYXRpb25JbmZvcylcbiAgICApO1xuXG4gICAgY29uc3QgcmVzdWx0VGFyZ2V0OiBPY2NDb25maWd1cmF0b3JUZXh0ZmllbGQuQWRkVG9DYXJ0UGFyYW1ldGVycyA9IHtcbiAgICAgIC4uLnRhcmdldCxcbiAgICAgIHVzZXJJZDogc291cmNlLnVzZXJJZCxcbiAgICAgIGNhcnRJZDogc291cmNlLmNhcnRJZCxcbiAgICAgIHByb2R1Y3Q6IHsgY29kZTogc291cmNlLnByb2R1Y3RDb2RlIH0sXG4gICAgICBxdWFudGl0eTogc291cmNlLnF1YW50aXR5LFxuICAgICAgY29uZmlndXJhdGlvbkluZm9zOiBjb25maWd1cmF0aW9uSW5mb3MsXG4gICAgfTtcblxuICAgIHJldHVybiByZXN1bHRUYXJnZXQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29udmVydEluZm8oXG4gICAgc291cmNlOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbkluZm8sXG4gICAgb2NjQ29uZmlndXJhdGlvbkluZm9zOiBPY2NDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbkluZm9bXVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBvY2NJbmZvOiBPY2NDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbkluZm8gPSB7XG4gICAgICBjb25maWd1cmF0aW9uTGFiZWw6IHNvdXJjZS5jb25maWd1cmF0aW9uTGFiZWwsXG4gICAgICBjb25maWd1cmF0aW9uVmFsdWU6IHNvdXJjZS5jb25maWd1cmF0aW9uVmFsdWUsXG4gICAgICBzdGF0dXM6IHNvdXJjZS5zdGF0dXMsXG4gICAgICBjb25maWd1cmF0b3JUeXBlOiBDT05GSUdVUkFUT1JfVFlQRV9URVhURklFTEQsXG4gICAgfTtcbiAgICBvY2NDb25maWd1cmF0aW9uSW5mb3MucHVzaChvY2NJbmZvKTtcbiAgfVxufVxuIl19