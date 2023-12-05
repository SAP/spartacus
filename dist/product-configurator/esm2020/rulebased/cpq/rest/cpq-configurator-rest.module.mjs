/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { RulebasedConfiguratorConnector } from '@spartacus/product-configurator/rulebased';
import { CpqConfiguratorNormalizer } from '../common/converters/cpq-configurator-normalizer';
import { CpqConfiguratorOverviewNormalizer } from '../common/converters/cpq-configurator-overview-normalizer';
import { CpqConfiguratorSerializer } from '../common/converters/cpq-configurator-serializer';
import { CpqConfiguratorValueSerializer } from '../common/converters/cpq-configurator-value-serializer';
import { CPQ_CONFIGURATOR_NORMALIZER, CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER, CPQ_CONFIGURATOR_QUANTITY_SERIALIZER, CPQ_CONFIGURATOR_SERIALIZER, } from '../common/converters/cpq-configurator.converters';
import { CpqConfiguratorRestAdapter } from './cpq-configurator-rest.adapter';
import { defaultCpqConfiguratorEndpointConfig } from './default-cpq-configurator-endpoint.config';
import * as i0 from "@angular/core";
export class CpqConfiguratorRestModule {
}
CpqConfiguratorRestModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorRestModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestModule, imports: [CommonModule] });
CpqConfiguratorRestModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestModule, providers: [
        {
            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
            useClass: CpqConfiguratorRestAdapter,
            multi: true,
        },
        //TODO: CXSPA-3392 move converters from here to cpq-configurator-common module
        {
            provide: CPQ_CONFIGURATOR_NORMALIZER,
            useClass: CpqConfiguratorNormalizer,
            multi: true,
        },
        {
            provide: CPQ_CONFIGURATOR_SERIALIZER,
            useClass: CpqConfiguratorSerializer,
            multi: true,
        },
        {
            provide: CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
            useClass: CpqConfiguratorValueSerializer,
            multi: true,
        },
        {
            provide: CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
            useClass: CpqConfiguratorOverviewNormalizer,
            multi: true,
        },
        provideDefaultConfig(defaultCpqConfiguratorEndpointConfig),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        {
                            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
                            useClass: CpqConfiguratorRestAdapter,
                            multi: true,
                        },
                        //TODO: CXSPA-3392 move converters from here to cpq-configurator-common module
                        {
                            provide: CPQ_CONFIGURATOR_NORMALIZER,
                            useClass: CpqConfiguratorNormalizer,
                            multi: true,
                        },
                        {
                            provide: CPQ_CONFIGURATOR_SERIALIZER,
                            useClass: CpqConfiguratorSerializer,
                            multi: true,
                        },
                        {
                            provide: CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
                            useClass: CpqConfiguratorValueSerializer,
                            multi: true,
                        },
                        {
                            provide: CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
                            useClass: CpqConfiguratorOverviewNormalizer,
                            multi: true,
                        },
                        provideDefaultConfig(defaultCpqConfiguratorEndpointConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1yZXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY3BxL3Jlc3QvY3BxLWNvbmZpZ3VyYXRvci1yZXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDM0YsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDN0YsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDOUcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDN0YsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDeEcsT0FBTyxFQUNMLDJCQUEyQixFQUMzQixvQ0FBb0MsRUFDcEMsb0NBQW9DLEVBQ3BDLDJCQUEyQixHQUM1QixNQUFNLGtEQUFrRCxDQUFDO0FBQzFELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLDRDQUE0QyxDQUFDOztBQW1DbEcsTUFBTSxPQUFPLHlCQUF5Qjs7c0hBQXpCLHlCQUF5Qjt1SEFBekIseUJBQXlCLFlBaEMxQixZQUFZO3VIQWdDWCx5QkFBeUIsYUE5QnpCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsOEJBQThCLENBQUMseUJBQXlCO1lBQ2pFLFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNELDhFQUE4RTtRQUM5RTtZQUNFLE9BQU8sRUFBRSwyQkFBMkI7WUFDcEMsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsMkJBQTJCO1lBQ3BDLFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLG9DQUFvQztZQUM3QyxRQUFRLEVBQUUsOEJBQThCO1lBQ3hDLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSxvQ0FBb0M7WUFDN0MsUUFBUSxFQUFFLGlDQUFpQztZQUMzQyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Qsb0JBQW9CLENBQUMsb0NBQW9DLENBQUM7S0FDM0QsWUE5QlMsWUFBWTsyRkFnQ1gseUJBQXlCO2tCQWpDckMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBRXZCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsOEJBQThCLENBQUMseUJBQXlCOzRCQUNqRSxRQUFRLEVBQUUsMEJBQTBCOzRCQUNwQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRCw4RUFBOEU7d0JBQzlFOzRCQUNFLE9BQU8sRUFBRSwyQkFBMkI7NEJBQ3BDLFFBQVEsRUFBRSx5QkFBeUI7NEJBQ25DLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSwyQkFBMkI7NEJBQ3BDLFFBQVEsRUFBRSx5QkFBeUI7NEJBQ25DLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxvQ0FBb0M7NEJBQzdDLFFBQVEsRUFBRSw4QkFBOEI7NEJBQ3hDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxvQ0FBb0M7NEJBQzdDLFFBQVEsRUFBRSxpQ0FBaUM7NEJBQzNDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNELG9CQUFvQixDQUFDLG9DQUFvQyxDQUFDO3FCQUMzRDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUnVsZWJhc2VkQ29uZmlndXJhdG9yQ29ubmVjdG9yIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQnO1xuaW1wb3J0IHsgQ3BxQ29uZmlndXJhdG9yTm9ybWFsaXplciB9IGZyb20gJy4uL2NvbW1vbi9jb252ZXJ0ZXJzL2NwcS1jb25maWd1cmF0b3Itbm9ybWFsaXplcic7XG5pbXBvcnQgeyBDcHFDb25maWd1cmF0b3JPdmVydmlld05vcm1hbGl6ZXIgfSBmcm9tICcuLi9jb21tb24vY29udmVydGVycy9jcHEtY29uZmlndXJhdG9yLW92ZXJ2aWV3LW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgQ3BxQ29uZmlndXJhdG9yU2VyaWFsaXplciB9IGZyb20gJy4uL2NvbW1vbi9jb252ZXJ0ZXJzL2NwcS1jb25maWd1cmF0b3Itc2VyaWFsaXplcic7XG5pbXBvcnQgeyBDcHFDb25maWd1cmF0b3JWYWx1ZVNlcmlhbGl6ZXIgfSBmcm9tICcuLi9jb21tb24vY29udmVydGVycy9jcHEtY29uZmlndXJhdG9yLXZhbHVlLXNlcmlhbGl6ZXInO1xuaW1wb3J0IHtcbiAgQ1BRX0NPTkZJR1VSQVRPUl9OT1JNQUxJWkVSLFxuICBDUFFfQ09ORklHVVJBVE9SX09WRVJWSUVXX05PUk1BTElaRVIsXG4gIENQUV9DT05GSUdVUkFUT1JfUVVBTlRJVFlfU0VSSUFMSVpFUixcbiAgQ1BRX0NPTkZJR1VSQVRPUl9TRVJJQUxJWkVSLFxufSBmcm9tICcuLi9jb21tb24vY29udmVydGVycy9jcHEtY29uZmlndXJhdG9yLmNvbnZlcnRlcnMnO1xuaW1wb3J0IHsgQ3BxQ29uZmlndXJhdG9yUmVzdEFkYXB0ZXIgfSBmcm9tICcuL2NwcS1jb25maWd1cmF0b3ItcmVzdC5hZGFwdGVyJztcbmltcG9ydCB7IGRlZmF1bHRDcHFDb25maWd1cmF0b3JFbmRwb2ludENvbmZpZyB9IGZyb20gJy4vZGVmYXVsdC1jcHEtY29uZmlndXJhdG9yLWVuZHBvaW50LmNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IFJ1bGViYXNlZENvbmZpZ3VyYXRvckNvbm5lY3Rvci5DT05GSUdVUkFUT1JfQURBUFRFUl9MSVNULFxuICAgICAgdXNlQ2xhc3M6IENwcUNvbmZpZ3VyYXRvclJlc3RBZGFwdGVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICAvL1RPRE86IENYU1BBLTMzOTIgbW92ZSBjb252ZXJ0ZXJzIGZyb20gaGVyZSB0byBjcHEtY29uZmlndXJhdG9yLWNvbW1vbiBtb2R1bGVcbiAgICB7XG4gICAgICBwcm92aWRlOiBDUFFfQ09ORklHVVJBVE9SX05PUk1BTElaRVIsXG4gICAgICB1c2VDbGFzczogQ3BxQ29uZmlndXJhdG9yTm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQ1BRX0NPTkZJR1VSQVRPUl9TRVJJQUxJWkVSLFxuICAgICAgdXNlQ2xhc3M6IENwcUNvbmZpZ3VyYXRvclNlcmlhbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IENQUV9DT05GSUdVUkFUT1JfUVVBTlRJVFlfU0VSSUFMSVpFUixcbiAgICAgIHVzZUNsYXNzOiBDcHFDb25maWd1cmF0b3JWYWx1ZVNlcmlhbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IENQUV9DT05GSUdVUkFUT1JfT1ZFUlZJRVdfTk9STUFMSVpFUixcbiAgICAgIHVzZUNsYXNzOiBDcHFDb25maWd1cmF0b3JPdmVydmlld05vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRDcHFDb25maWd1cmF0b3JFbmRwb2ludENvbmZpZyksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENwcUNvbmZpZ3VyYXRvclJlc3RNb2R1bGUge31cbiJdfQ==