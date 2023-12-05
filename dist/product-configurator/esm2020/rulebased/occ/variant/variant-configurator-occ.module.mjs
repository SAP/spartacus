/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';
import { RulebasedConfiguratorConnector } from '../../core/connectors/rulebased-configurator.connector';
import { OccConfiguratorVariantAddToCartSerializer } from './converters/occ-configurator-variant-add-to-cart-serializer';
import { OccConfiguratorVariantNormalizer } from './converters/occ-configurator-variant-normalizer';
import { OccConfiguratorVariantOverviewNormalizer } from './converters/occ-configurator-variant-overview-normalizer';
import { OccConfiguratorVariantPriceSummaryNormalizer } from './converters/occ-configurator-variant-price-summary-normalizer';
import { OccConfiguratorVariantPriceNormalizer } from './converters/occ-configurator-variant-price-normalizer';
import { OccConfiguratorVariantSerializer } from './converters/occ-configurator-variant-serializer';
import { OccConfiguratorVariantUpdateCartEntrySerializer } from './converters/occ-configurator-variant-update-cart-entry-serializer';
import { defaultOccVariantConfiguratorConfigFactory } from './default-occ-configurator-variant-config';
import { VariantConfiguratorOccAdapter } from './variant-configurator-occ.adapter';
import { VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER, VARIANT_CONFIGURATOR_NORMALIZER, VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER, VARIANT_CONFIGURATOR_OVERVIEW_SERIALIZER, VARIANT_CONFIGURATOR_PRICE_NORMALIZER, VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER, VARIANT_CONFIGURATOR_SERIALIZER, VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER, } from './variant-configurator-occ.converters';
import { OccConfiguratorVariantOverviewSerializer } from './converters/occ-configurator-variant-overview-serializer';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class VariantConfiguratorOccModule {
}
VariantConfiguratorOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOccModule, imports: [CommonModule, i1.ConfigModule] });
VariantConfiguratorOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOccModule, providers: [
        {
            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
            useClass: VariantConfiguratorOccAdapter,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_NORMALIZER,
            useExisting: OccConfiguratorVariantNormalizer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_SERIALIZER,
            useExisting: OccConfiguratorVariantSerializer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER,
            useExisting: OccConfiguratorVariantPriceSummaryNormalizer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_PRICE_NORMALIZER,
            useExisting: OccConfiguratorVariantPriceNormalizer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
            useExisting: OccConfiguratorVariantAddToCartSerializer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
            useExisting: OccConfiguratorVariantUpdateCartEntrySerializer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER,
            useExisting: OccConfiguratorVariantOverviewNormalizer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_OVERVIEW_SERIALIZER,
            useExisting: OccConfiguratorVariantOverviewSerializer,
            multi: true,
        },
    ], imports: [CommonModule,
        ConfigModule.withConfigFactory(defaultOccVariantConfiguratorConfigFactory)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfigModule.withConfigFactory(defaultOccVariantConfiguratorConfigFactory),
                    ],
                    providers: [
                        {
                            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
                            useClass: VariantConfiguratorOccAdapter,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_NORMALIZER,
                            useExisting: OccConfiguratorVariantNormalizer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_SERIALIZER,
                            useExisting: OccConfiguratorVariantSerializer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER,
                            useExisting: OccConfiguratorVariantPriceSummaryNormalizer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_PRICE_NORMALIZER,
                            useExisting: OccConfiguratorVariantPriceNormalizer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
                            useExisting: OccConfiguratorVariantAddToCartSerializer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
                            useExisting: OccConfiguratorVariantUpdateCartEntrySerializer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER,
                            useExisting: OccConfiguratorVariantOverviewNormalizer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_OVERVIEW_SERIALIZER,
                            useExisting: OccConfiguratorVariantOverviewSerializer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb25maWd1cmF0b3Itb2NjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvb2NjL3ZhcmlhbnQvdmFyaWFudC1jb25maWd1cmF0b3Itb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3hHLE9BQU8sRUFBRSx5Q0FBeUMsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBQ3pILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQ3JILE9BQU8sRUFBRSw0Q0FBNEMsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQzlILE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQy9HLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSwrQ0FBK0MsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ3JJLE9BQU8sRUFBRSwwQ0FBMEMsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFDTCwyQ0FBMkMsRUFDM0MsK0JBQStCLEVBQy9CLHdDQUF3QyxFQUN4Qyx3Q0FBd0MsRUFDeEMscUNBQXFDLEVBQ3JDLDZDQUE2QyxFQUM3QywrQkFBK0IsRUFDL0IsaURBQWlELEdBQ2xELE1BQU0sdUNBQXVDLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sMkRBQTJELENBQUM7OztBQXVEckgsTUFBTSxPQUFPLDRCQUE0Qjs7eUhBQTVCLDRCQUE0QjswSEFBNUIsNEJBQTRCLFlBbkRyQyxZQUFZOzBIQW1ESCw0QkFBNEIsYUFoRDVCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsOEJBQThCLENBQUMseUJBQXlCO1lBQ2pFLFFBQVEsRUFBRSw2QkFBNkI7WUFDdkMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLCtCQUErQjtZQUN4QyxXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSwrQkFBK0I7WUFDeEMsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsNkNBQTZDO1lBQ3RELFdBQVcsRUFBRSw0Q0FBNEM7WUFDekQsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHFDQUFxQztZQUM5QyxXQUFXLEVBQUUscUNBQXFDO1lBQ2xELEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSwyQ0FBMkM7WUFDcEQsV0FBVyxFQUFFLHlDQUF5QztZQUN0RCxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsaURBQWlEO1lBQzFELFdBQVcsRUFBRSwrQ0FBK0M7WUFDNUQsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHdDQUF3QztZQUNqRCxXQUFXLEVBQUUsd0NBQXdDO1lBQ3JELEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSx3Q0FBd0M7WUFDakQsV0FBVyxFQUFFLHdDQUF3QztZQUNyRCxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsWUFqREMsWUFBWTtRQUNaLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQywwQ0FBMEMsQ0FBQzsyRkFrRGpFLDRCQUE0QjtrQkFyRHhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWSxDQUFDLGlCQUFpQixDQUFDLDBDQUEwQyxDQUFDO3FCQUMzRTtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLDhCQUE4QixDQUFDLHlCQUF5Qjs0QkFDakUsUUFBUSxFQUFFLDZCQUE2Qjs0QkFDdkMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLCtCQUErQjs0QkFDeEMsV0FBVyxFQUFFLGdDQUFnQzs0QkFDN0MsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLCtCQUErQjs0QkFDeEMsV0FBVyxFQUFFLGdDQUFnQzs0QkFDN0MsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLDZDQUE2Qzs0QkFDdEQsV0FBVyxFQUFFLDRDQUE0Qzs0QkFDekQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLHFDQUFxQzs0QkFDOUMsV0FBVyxFQUFFLHFDQUFxQzs0QkFDbEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLDJDQUEyQzs0QkFDcEQsV0FBVyxFQUFFLHlDQUF5Qzs0QkFDdEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLGlEQUFpRDs0QkFDMUQsV0FBVyxFQUFFLCtDQUErQzs0QkFDNUQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLHdDQUF3Qzs0QkFDakQsV0FBVyxFQUFFLHdDQUF3Qzs0QkFDckQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLHdDQUF3Qzs0QkFDakQsV0FBVyxFQUFFLHdDQUF3Qzs0QkFDckQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBSdWxlYmFzZWRDb25maWd1cmF0b3JDb25uZWN0b3IgfSBmcm9tICcuLi8uLi9jb3JlL2Nvbm5lY3RvcnMvcnVsZWJhc2VkLWNvbmZpZ3VyYXRvci5jb25uZWN0b3InO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yVmFyaWFudEFkZFRvQ2FydFNlcmlhbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LWFkZC10by1jYXJ0LXNlcmlhbGl6ZXInO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yVmFyaWFudE5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yVmFyaWFudE92ZXJ2aWV3Tm9ybWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2MtY29uZmlndXJhdG9yLXZhcmlhbnQtb3ZlcnZpZXctbm9ybWFsaXplcic7XG5pbXBvcnQgeyBPY2NDb25maWd1cmF0b3JWYXJpYW50UHJpY2VTdW1tYXJ5Tm9ybWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2MtY29uZmlndXJhdG9yLXZhcmlhbnQtcHJpY2Utc3VtbWFyeS1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRQcmljZU5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LXByaWNlLW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yVmFyaWFudFNlcmlhbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LXNlcmlhbGl6ZXInO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yVmFyaWFudFVwZGF0ZUNhcnRFbnRyeVNlcmlhbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LXVwZGF0ZS1jYXJ0LWVudHJ5LXNlcmlhbGl6ZXInO1xuaW1wb3J0IHsgZGVmYXVsdE9jY1ZhcmlhbnRDb25maWd1cmF0b3JDb25maWdGYWN0b3J5IH0gZnJvbSAnLi9kZWZhdWx0LW9jYy1jb25maWd1cmF0b3ItdmFyaWFudC1jb25maWcnO1xuaW1wb3J0IHsgVmFyaWFudENvbmZpZ3VyYXRvck9jY0FkYXB0ZXIgfSBmcm9tICcuL3ZhcmlhbnQtY29uZmlndXJhdG9yLW9jYy5hZGFwdGVyJztcbmltcG9ydCB7XG4gIFZBUklBTlRfQ09ORklHVVJBVE9SX0FERF9UT19DQVJUX1NFUklBTElaRVIsXG4gIFZBUklBTlRfQ09ORklHVVJBVE9SX05PUk1BTElaRVIsXG4gIFZBUklBTlRfQ09ORklHVVJBVE9SX09WRVJWSUVXX05PUk1BTElaRVIsXG4gIFZBUklBTlRfQ09ORklHVVJBVE9SX09WRVJWSUVXX1NFUklBTElaRVIsXG4gIFZBUklBTlRfQ09ORklHVVJBVE9SX1BSSUNFX05PUk1BTElaRVIsXG4gIFZBUklBTlRfQ09ORklHVVJBVE9SX1BSSUNFX1NVTU1BUllfTk9STUFMSVpFUixcbiAgVkFSSUFOVF9DT05GSUdVUkFUT1JfU0VSSUFMSVpFUixcbiAgVkFSSUFOVF9DT05GSUdVUkFUT1JfVVBEQVRFX0NBUlRfRU5UUllfU0VSSUFMSVpFUixcbn0gZnJvbSAnLi92YXJpYW50LWNvbmZpZ3VyYXRvci1vY2MuY29udmVydGVycyc7XG5pbXBvcnQgeyBPY2NDb25maWd1cmF0b3JWYXJpYW50T3ZlcnZpZXdTZXJpYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL29jYy1jb25maWd1cmF0b3ItdmFyaWFudC1vdmVydmlldy1zZXJpYWxpemVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDb25maWdNb2R1bGUud2l0aENvbmZpZ0ZhY3RvcnkoZGVmYXVsdE9jY1ZhcmlhbnRDb25maWd1cmF0b3JDb25maWdGYWN0b3J5KSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogUnVsZWJhc2VkQ29uZmlndXJhdG9yQ29ubmVjdG9yLkNPTkZJR1VSQVRPUl9BREFQVEVSX0xJU1QsXG4gICAgICB1c2VDbGFzczogVmFyaWFudENvbmZpZ3VyYXRvck9jY0FkYXB0ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFZBUklBTlRfQ09ORklHVVJBVE9SX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjQ29uZmlndXJhdG9yVmFyaWFudE5vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFZBUklBTlRfQ09ORklHVVJBVE9SX1NFUklBTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjQ29uZmlndXJhdG9yVmFyaWFudFNlcmlhbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFZBUklBTlRfQ09ORklHVVJBVE9SX1BSSUNFX1NVTU1BUllfTk9STUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NDb25maWd1cmF0b3JWYXJpYW50UHJpY2VTdW1tYXJ5Tm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogVkFSSUFOVF9DT05GSUdVUkFUT1JfUFJJQ0VfTk9STUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NDb25maWd1cmF0b3JWYXJpYW50UHJpY2VOb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBWQVJJQU5UX0NPTkZJR1VSQVRPUl9BRERfVE9fQ0FSVF9TRVJJQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRBZGRUb0NhcnRTZXJpYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBWQVJJQU5UX0NPTkZJR1VSQVRPUl9VUERBVEVfQ0FSVF9FTlRSWV9TRVJJQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRVcGRhdGVDYXJ0RW50cnlTZXJpYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBWQVJJQU5UX0NPTkZJR1VSQVRPUl9PVkVSVklFV19OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRPdmVydmlld05vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFZBUklBTlRfQ09ORklHVVJBVE9SX09WRVJWSUVXX1NFUklBTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjQ29uZmlndXJhdG9yVmFyaWFudE92ZXJ2aWV3U2VyaWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFZhcmlhbnRDb25maWd1cmF0b3JPY2NNb2R1bGUge31cbiJdfQ==