/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ORDER_APPROVAL_NORMALIZER } from '../../core/connectors/converters';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class OccOrderApprovalListNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        target.values =
            source.orderApprovals?.map((orderApproval) => ({
                ...this.converter.convert(orderApproval, ORDER_APPROVAL_NORMALIZER),
            })) ?? [];
        return target;
    }
}
OccOrderApprovalListNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalListNormalizer, deps: [{ token: i1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccOrderApprovalListNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalListNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalListNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLW9yZGVyLWFwcHJvdmFsLWxpc3Qtbm9ybWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vb3JkZXItYXBwcm92YWwvb2NjL2NvbnZlcnRlcnMvb2NjLW9yZGVyLWFwcHJvdmFsLWxpc3Qtbm9ybWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8zQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7O0FBTTdFLE1BQU0sT0FBTyw4QkFBOEI7SUFHekMsWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFBRyxDQUFDO0lBRW5ELE9BQU8sQ0FDTCxNQUE4QixFQUM5QixNQUFxQztRQUVyQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxHQUFHLEVBQUUsR0FBSSxNQUFjLEVBQWtDLENBQUM7U0FDakU7UUFDRCxNQUFNLENBQUMsTUFBTTtZQUNYLE1BQU0sQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSx5QkFBeUIsQ0FBQzthQUNwRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzsySEFqQlUsOEJBQThCOytIQUE5Qiw4QkFBOEIsY0FGN0IsTUFBTTsyRkFFUCw4QkFBOEI7a0JBSDFDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29udmVydGVyLFxuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBFbnRpdGllc01vZGVsLFxuICBPY2MsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPUkRFUl9BUFBST1ZBTF9OT1JNQUxJWkVSIH0gZnJvbSAnLi4vLi4vY29yZS9jb25uZWN0b3JzL2NvbnZlcnRlcnMnO1xuaW1wb3J0IHsgT3JkZXJBcHByb3ZhbCB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvb3JkZXItYXBwcm92YWwubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT2NjT3JkZXJBcHByb3ZhbExpc3ROb3JtYWxpemVyXG4gIGltcGxlbWVudHMgQ29udmVydGVyPE9jYy5PcmRlckFwcHJvdmFsc0xpc3QsIEVudGl0aWVzTW9kZWw8T3JkZXJBcHByb3ZhbD4+XG57XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlKSB7fVxuXG4gIGNvbnZlcnQoXG4gICAgc291cmNlOiBPY2MuT3JkZXJBcHByb3ZhbHNMaXN0LFxuICAgIHRhcmdldD86IEVudGl0aWVzTW9kZWw8T3JkZXJBcHByb3ZhbD5cbiAgKTogRW50aXRpZXNNb2RlbDxPcmRlckFwcHJvdmFsPiB7XG4gICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQgPSB7IC4uLihzb3VyY2UgYXMgYW55KSB9IGFzIEVudGl0aWVzTW9kZWw8T3JkZXJBcHByb3ZhbD47XG4gICAgfVxuICAgIHRhcmdldC52YWx1ZXMgPVxuICAgICAgc291cmNlLm9yZGVyQXBwcm92YWxzPy5tYXAoKG9yZGVyQXBwcm92YWwpID0+ICh7XG4gICAgICAgIC4uLnRoaXMuY29udmVydGVyLmNvbnZlcnQob3JkZXJBcHByb3ZhbCwgT1JERVJfQVBQUk9WQUxfTk9STUFMSVpFUiksXG4gICAgICB9KSkgPz8gW107XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuIl19