/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';
import { ConfiguratorTextfieldAdapter } from '../core/connectors/configurator-textfield.adapter';
import { CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER, CONFIGURATION_TEXTFIELD_NORMALIZER, CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER, } from '../core/connectors/converters';
import { OccConfiguratorTextfieldAddToCartSerializer } from './converters/occ-configurator-textfield-add-to-cart-serializer';
import { OccConfiguratorTextfieldNormalizer } from './converters/occ-configurator-textfield-normalizer';
import { OccConfiguratorTextfieldUpdateCartEntrySerializer } from './converters/occ-configurator-textfield-update-cart-entry-serializer';
import { defaultOccConfiguratorTextfieldConfigFactory } from './default-occ-configurator-textfield-config';
import { OccConfiguratorTextfieldAdapter } from './occ-configurator-textfield.adapter';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class TextfieldConfiguratorOccModule {
}
TextfieldConfiguratorOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorOccModule, imports: [CommonModule, i1.ConfigModule] });
TextfieldConfiguratorOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorOccModule, providers: [
        {
            provide: ConfiguratorTextfieldAdapter,
            useClass: OccConfiguratorTextfieldAdapter,
        },
        {
            provide: CONFIGURATION_TEXTFIELD_NORMALIZER,
            useExisting: OccConfiguratorTextfieldNormalizer,
            multi: true,
        },
        {
            provide: CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER,
            useExisting: OccConfiguratorTextfieldAddToCartSerializer,
            multi: true,
        },
        {
            provide: CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER,
            useExisting: OccConfiguratorTextfieldUpdateCartEntrySerializer,
            multi: true,
        },
    ], imports: [CommonModule,
        ConfigModule.withConfigFactory(defaultOccConfiguratorTextfieldConfigFactory)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfigModule.withConfigFactory(defaultOccConfiguratorTextfieldConfigFactory),
                    ],
                    providers: [
                        {
                            provide: ConfiguratorTextfieldAdapter,
                            useClass: OccConfiguratorTextfieldAdapter,
                        },
                        {
                            provide: CONFIGURATION_TEXTFIELD_NORMALIZER,
                            useExisting: OccConfiguratorTextfieldNormalizer,
                            multi: true,
                        },
                        {
                            provide: CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER,
                            useExisting: OccConfiguratorTextfieldAddToCartSerializer,
                            multi: true,
                        },
                        {
                            provide: CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER,
                            useExisting: OccConfiguratorTextfieldUpdateCartEntrySerializer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLWNvbmZpZ3VyYXRvci1vY2MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3RleHRmaWVsZC9vY2MvdGV4dGZpZWxkLWNvbmZpZ3VyYXRvci1vY2MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDakcsT0FBTyxFQUNMLDhDQUE4QyxFQUM5QyxrQ0FBa0MsRUFDbEMsb0RBQW9ELEdBQ3JELE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFFLDJDQUEyQyxFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDN0gsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDeEcsT0FBTyxFQUFFLGlEQUFpRCxFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFDekksT0FBTyxFQUFFLDRDQUE0QyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDM0csT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7OztBQWdDdkYsTUFBTSxPQUFPLDhCQUE4Qjs7MkhBQTlCLDhCQUE4Qjs0SEFBOUIsOEJBQThCLFlBNUJ2QyxZQUFZOzRIQTRCSCw4QkFBOEIsYUF0QjlCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsNEJBQTRCO1lBQ3JDLFFBQVEsRUFBRSwrQkFBK0I7U0FDMUM7UUFDRDtZQUNFLE9BQU8sRUFBRSxrQ0FBa0M7WUFDM0MsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsOENBQThDO1lBQ3ZELFdBQVcsRUFBRSwyQ0FBMkM7WUFDeEQsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLG9EQUFvRDtZQUM3RCxXQUFXLEVBQUUsaURBQWlEO1lBQzlELEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixZQTFCQyxZQUFZO1FBRVosWUFBWSxDQUFDLGlCQUFpQixDQUM1Qiw0Q0FBNEMsQ0FDN0M7MkZBd0JRLDhCQUE4QjtrQkE5QjFDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBRVosWUFBWSxDQUFDLGlCQUFpQixDQUM1Qiw0Q0FBNEMsQ0FDN0M7cUJBQ0Y7b0JBQ0QsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSw0QkFBNEI7NEJBQ3JDLFFBQVEsRUFBRSwrQkFBK0I7eUJBQzFDO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxrQ0FBa0M7NEJBQzNDLFdBQVcsRUFBRSxrQ0FBa0M7NEJBQy9DLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSw4Q0FBOEM7NEJBQ3ZELFdBQVcsRUFBRSwyQ0FBMkM7NEJBQ3hELEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxvREFBb0Q7NEJBQzdELFdBQVcsRUFBRSxpREFBaUQ7NEJBQzlELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWdNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yVGV4dGZpZWxkQWRhcHRlciB9IGZyb20gJy4uL2NvcmUvY29ubmVjdG9ycy9jb25maWd1cmF0b3ItdGV4dGZpZWxkLmFkYXB0ZXInO1xuaW1wb3J0IHtcbiAgQ09ORklHVVJBVElPTl9URVhURklFTERfQUREX1RPX0NBUlRfU0VSSUFMSVpFUixcbiAgQ09ORklHVVJBVElPTl9URVhURklFTERfTk9STUFMSVpFUixcbiAgQ09ORklHVVJBVElPTl9URVhURklFTERfVVBEQVRFX0NBUlRfRU5UUllfU0VSSUFMSVpFUixcbn0gZnJvbSAnLi4vY29yZS9jb25uZWN0b3JzL2NvbnZlcnRlcnMnO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yVGV4dGZpZWxkQWRkVG9DYXJ0U2VyaWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2MtY29uZmlndXJhdG9yLXRleHRmaWVsZC1hZGQtdG8tY2FydC1zZXJpYWxpemVyJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZE5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci10ZXh0ZmllbGQtbm9ybWFsaXplcic7XG5pbXBvcnQgeyBPY2NDb25maWd1cmF0b3JUZXh0ZmllbGRVcGRhdGVDYXJ0RW50cnlTZXJpYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL29jYy1jb25maWd1cmF0b3ItdGV4dGZpZWxkLXVwZGF0ZS1jYXJ0LWVudHJ5LXNlcmlhbGl6ZXInO1xuaW1wb3J0IHsgZGVmYXVsdE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZENvbmZpZ0ZhY3RvcnkgfSBmcm9tICcuL2RlZmF1bHQtb2NjLWNvbmZpZ3VyYXRvci10ZXh0ZmllbGQtY29uZmlnJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZEFkYXB0ZXIgfSBmcm9tICcuL29jYy1jb25maWd1cmF0b3ItdGV4dGZpZWxkLmFkYXB0ZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuXG4gICAgQ29uZmlnTW9kdWxlLndpdGhDb25maWdGYWN0b3J5KFxuICAgICAgZGVmYXVsdE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZENvbmZpZ0ZhY3RvcnlcbiAgICApLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBDb25maWd1cmF0b3JUZXh0ZmllbGRBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZEFkYXB0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDT05GSUdVUkFUSU9OX1RFWFRGSUVMRF9OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZE5vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IENPTkZJR1VSQVRJT05fVEVYVEZJRUxEX0FERF9UT19DQVJUX1NFUklBTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjQ29uZmlndXJhdG9yVGV4dGZpZWxkQWRkVG9DYXJ0U2VyaWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQ09ORklHVVJBVElPTl9URVhURklFTERfVVBEQVRFX0NBUlRfRU5UUllfU0VSSUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NDb25maWd1cmF0b3JUZXh0ZmllbGRVcGRhdGVDYXJ0RW50cnlTZXJpYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVGV4dGZpZWxkQ29uZmlndXJhdG9yT2NjTW9kdWxlIHt9XG4iXX0=