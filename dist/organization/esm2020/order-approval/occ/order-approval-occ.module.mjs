/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OrderApprovalAdapter } from '../core/connectors/order-approval.adapter';
import { ORDER_APPROVALS_NORMALIZER, ORDER_APPROVAL_DECISION_NORMALIZER, ORDER_APPROVAL_NORMALIZER, } from '../core/connectors/converters';
import { OccOrderApprovalAdapter } from './adapters/occ-order-approval.adapter';
import { OccOrderApprovalDecisionNormalizer } from './converters/occ-order-approval-decision-normalizer';
import { OccOrderApprovalListNormalizer } from './converters/occ-order-approval-list-normalizer';
import { OccOrderApprovalNormalizer } from './converters/occ-order-approval-normalizer';
import { defaultOccOrderApprovalConfig } from './config/default-occ-organization-config';
import * as i0 from "@angular/core";
export class OrderApprovalOccModule {
}
OrderApprovalOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalOccModule, imports: [CommonModule] });
OrderApprovalOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalOccModule, providers: [
        provideDefaultConfig(defaultOccOrderApprovalConfig),
        {
            provide: OrderApprovalAdapter,
            useClass: OccOrderApprovalAdapter,
        },
        {
            provide: ORDER_APPROVAL_NORMALIZER,
            useExisting: OccOrderApprovalNormalizer,
            multi: true,
        },
        {
            provide: ORDER_APPROVALS_NORMALIZER,
            useExisting: OccOrderApprovalListNormalizer,
            multi: true,
        },
        {
            provide: ORDER_APPROVAL_DECISION_NORMALIZER,
            useExisting: OccOrderApprovalDecisionNormalizer,
            multi: true,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccOrderApprovalConfig),
                        {
                            provide: OrderApprovalAdapter,
                            useClass: OccOrderApprovalAdapter,
                        },
                        {
                            provide: ORDER_APPROVAL_NORMALIZER,
                            useExisting: OccOrderApprovalNormalizer,
                            multi: true,
                        },
                        {
                            provide: ORDER_APPROVALS_NORMALIZER,
                            useExisting: OccOrderApprovalListNormalizer,
                            multi: true,
                        },
                        {
                            provide: ORDER_APPROVAL_DECISION_NORMALIZER,
                            useExisting: OccOrderApprovalDecisionNormalizer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYXBwcm92YWwtb2NjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vb3JkZXItYXBwcm92YWwvb2NjL29yZGVyLWFwcHJvdmFsLW9jYy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pGLE9BQU8sRUFDTCwwQkFBMEIsRUFDMUIsa0NBQWtDLEVBQ2xDLHlCQUF5QixHQUMxQixNQUFNLCtCQUErQixDQUFDO0FBRXZDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRWhGLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3pHLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQTJCekYsTUFBTSxPQUFPLHNCQUFzQjs7bUhBQXRCLHNCQUFzQjtvSEFBdEIsc0JBQXNCLFlBeEJ2QixZQUFZO29IQXdCWCxzQkFBc0IsYUF2QnRCO1FBQ1Qsb0JBQW9CLENBQUMsNkJBQTZCLENBQUM7UUFDbkQ7WUFDRSxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLFFBQVEsRUFBRSx1QkFBdUI7U0FDbEM7UUFDRDtZQUNFLE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsMEJBQTBCO1lBQ25DLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLGtDQUFrQztZQUMzQyxXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixZQXRCUyxZQUFZOzJGQXdCWCxzQkFBc0I7a0JBekJsQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLDZCQUE2QixDQUFDO3dCQUNuRDs0QkFDRSxPQUFPLEVBQUUsb0JBQW9COzRCQUM3QixRQUFRLEVBQUUsdUJBQXVCO3lCQUNsQzt3QkFDRDs0QkFDRSxPQUFPLEVBQUUseUJBQXlCOzRCQUNsQyxXQUFXLEVBQUUsMEJBQTBCOzRCQUN2QyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsMEJBQTBCOzRCQUNuQyxXQUFXLEVBQUUsOEJBQThCOzRCQUMzQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsa0NBQWtDOzRCQUMzQyxXQUFXLEVBQUUsa0NBQWtDOzRCQUMvQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJBcHByb3ZhbEFkYXB0ZXIgfSBmcm9tICcuLi9jb3JlL2Nvbm5lY3RvcnMvb3JkZXItYXBwcm92YWwuYWRhcHRlcic7XG5pbXBvcnQge1xuICBPUkRFUl9BUFBST1ZBTFNfTk9STUFMSVpFUixcbiAgT1JERVJfQVBQUk9WQUxfREVDSVNJT05fTk9STUFMSVpFUixcbiAgT1JERVJfQVBQUk9WQUxfTk9STUFMSVpFUixcbn0gZnJvbSAnLi4vY29yZS9jb25uZWN0b3JzL2NvbnZlcnRlcnMnO1xuXG5pbXBvcnQgeyBPY2NPcmRlckFwcHJvdmFsQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLW9yZGVyLWFwcHJvdmFsLmFkYXB0ZXInO1xuXG5pbXBvcnQgeyBPY2NPcmRlckFwcHJvdmFsRGVjaXNpb25Ob3JtYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL29jYy1vcmRlci1hcHByb3ZhbC1kZWNpc2lvbi1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY09yZGVyQXBwcm92YWxMaXN0Tm9ybWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2Mtb3JkZXItYXBwcm92YWwtbGlzdC1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY09yZGVyQXBwcm92YWxOb3JtYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL29jYy1vcmRlci1hcHByb3ZhbC1ub3JtYWxpemVyJztcbmltcG9ydCB7IGRlZmF1bHRPY2NPcmRlckFwcHJvdmFsQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1vY2Mtb3JnYW5pemF0aW9uLWNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0T2NjT3JkZXJBcHByb3ZhbENvbmZpZyksXG4gICAge1xuICAgICAgcHJvdmlkZTogT3JkZXJBcHByb3ZhbEFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogT2NjT3JkZXJBcHByb3ZhbEFkYXB0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBPUkRFUl9BUFBST1ZBTF9OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY09yZGVyQXBwcm92YWxOb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBPUkRFUl9BUFBST1ZBTFNfTk9STUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NPcmRlckFwcHJvdmFsTGlzdE5vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE9SREVSX0FQUFJPVkFMX0RFQ0lTSU9OX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjT3JkZXJBcHByb3ZhbERlY2lzaW9uTm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQXBwcm92YWxPY2NNb2R1bGUge31cbiJdfQ==