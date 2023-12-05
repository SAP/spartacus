/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CmsModule } from './cms/cms.module';
import { ConfigInitializerModule } from './config/config-initializer/config-initializer.module';
import { ConfigValidatorModule } from './config/config-validator/config-validator.module';
import { ConfigModule } from './config/config.module';
import { FeaturesConfigModule } from './features-config/features-config.module';
import { GlobalMessageModule } from './global-message/global-message.module';
import { HttpModule } from './http/http.module';
import { I18nModule } from './i18n/i18n.module';
import { LazyLoadingModule } from './lazy-loading/lazy-loading.module';
import { BaseOccModule } from './occ/base-occ.module';
import { MetaTagConfigModule } from './occ/config/meta-tag-config.module';
import { ProcessModule } from './process/process.module';
import { SiteContextModule } from './site-context/site-context.module';
import { StateModule } from './state/state.module';
import * as i0 from "@angular/core";
import * as i1 from "./state/state.module";
import * as i2 from "./config/config.module";
import * as i3 from "./config/config-initializer/config-initializer.module";
import * as i4 from "./config/config-validator/config-validator.module";
import * as i5 from "./i18n/i18n.module";
import * as i6 from "./cms/cms.module";
import * as i7 from "./global-message/global-message.module";
import * as i8 from "./process/process.module";
import * as i9 from "./features-config/features-config.module";
import * as i10 from "./site-context/site-context.module";
import * as i11 from "./occ/config/meta-tag-config.module";
import * as i12 from "./occ/base-occ.module";
import * as i13 from "./lazy-loading/lazy-loading.module";
import * as i14 from "./http/http.module";
export class BaseCoreModule {
    static forRoot() {
        return {
            ngModule: BaseCoreModule,
        };
    }
}
BaseCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BaseCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BaseCoreModule, imports: [i1.StateModule, i2.ConfigModule, i3.ConfigInitializerModule, i4.ConfigValidatorModule, i5.I18nModule, i6.CmsModule, i7.GlobalMessageModule, i8.ProcessModule, i9.FeaturesConfigModule, i10.SiteContextModule, i11.MetaTagConfigModule, i12.BaseOccModule, i13.LazyLoadingModule, i14.HttpModule] });
BaseCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseCoreModule, imports: [StateModule.forRoot(),
        ConfigModule.forRoot(),
        ConfigInitializerModule.forRoot(),
        ConfigValidatorModule.forRoot(),
        I18nModule.forRoot(),
        CmsModule.forRoot(),
        GlobalMessageModule.forRoot(),
        ProcessModule.forRoot(),
        FeaturesConfigModule.forRoot(),
        SiteContextModule.forRoot(),
        MetaTagConfigModule.forRoot(),
        BaseOccModule.forRoot(),
        LazyLoadingModule.forRoot(),
        HttpModule.forRoot()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        StateModule.forRoot(),
                        ConfigModule.forRoot(),
                        ConfigInitializerModule.forRoot(),
                        ConfigValidatorModule.forRoot(),
                        I18nModule.forRoot(),
                        CmsModule.forRoot(),
                        GlobalMessageModule.forRoot(),
                        ProcessModule.forRoot(),
                        FeaturesConfigModule.forRoot(),
                        SiteContextModule.forRoot(),
                        MetaTagConfigModule.forRoot(),
                        BaseOccModule.forRoot(),
                        LazyLoadingModule.forRoot(),
                        HttpModule.forRoot(),
                        /* This module should be imported by default starting from version 7.0 (CXSPA-3680)*/
                        //ErrorHandlingModule.forRoot(),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2Jhc2UtY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUNoRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDaEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQXVCbkQsTUFBTSxPQUFPLGNBQWM7SUFDekIsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7U0FDekIsQ0FBQztJQUNKLENBQUM7OzJHQUxVLGNBQWM7NEdBQWQsY0FBYzs0R0FBZCxjQUFjLFlBbkJ2QixXQUFXLENBQUMsT0FBTyxFQUFFO1FBQ3JCLFlBQVksQ0FBQyxPQUFPLEVBQUU7UUFDdEIsdUJBQXVCLENBQUMsT0FBTyxFQUFFO1FBQ2pDLHFCQUFxQixDQUFDLE9BQU8sRUFBRTtRQUMvQixVQUFVLENBQUMsT0FBTyxFQUFFO1FBQ3BCLFNBQVMsQ0FBQyxPQUFPLEVBQUU7UUFDbkIsbUJBQW1CLENBQUMsT0FBTyxFQUFFO1FBQzdCLGFBQWEsQ0FBQyxPQUFPLEVBQUU7UUFDdkIsb0JBQW9CLENBQUMsT0FBTyxFQUFFO1FBQzlCLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtRQUMzQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUU7UUFDN0IsYUFBYSxDQUFDLE9BQU8sRUFBRTtRQUN2QixpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7UUFDM0IsVUFBVSxDQUFDLE9BQU8sRUFBRTsyRkFNWCxjQUFjO2tCQXJCMUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsV0FBVyxDQUFDLE9BQU8sRUFBRTt3QkFDckIsWUFBWSxDQUFDLE9BQU8sRUFBRTt3QkFDdEIsdUJBQXVCLENBQUMsT0FBTyxFQUFFO3dCQUNqQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUU7d0JBQy9CLFVBQVUsQ0FBQyxPQUFPLEVBQUU7d0JBQ3BCLFNBQVMsQ0FBQyxPQUFPLEVBQUU7d0JBQ25CLG1CQUFtQixDQUFDLE9BQU8sRUFBRTt3QkFDN0IsYUFBYSxDQUFDLE9BQU8sRUFBRTt3QkFDdkIsb0JBQW9CLENBQUMsT0FBTyxFQUFFO3dCQUM5QixpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7d0JBQzNCLG1CQUFtQixDQUFDLE9BQU8sRUFBRTt3QkFDN0IsYUFBYSxDQUFDLE9BQU8sRUFBRTt3QkFDdkIsaUJBQWlCLENBQUMsT0FBTyxFQUFFO3dCQUMzQixVQUFVLENBQUMsT0FBTyxFQUFFO3dCQUVwQixxRkFBcUY7d0JBQ3JGLGdDQUFnQztxQkFDakM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zTW9kdWxlIH0gZnJvbSAnLi9jbXMvY21zLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWdJbml0aWFsaXplck1vZHVsZSB9IGZyb20gJy4vY29uZmlnL2NvbmZpZy1pbml0aWFsaXplci9jb25maWctaW5pdGlhbGl6ZXIubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ1ZhbGlkYXRvck1vZHVsZSB9IGZyb20gJy4vY29uZmlnL2NvbmZpZy12YWxpZGF0b3IvY29uZmlnLXZhbGlkYXRvci5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlIH0gZnJvbSAnLi9jb25maWcvY29uZmlnLm1vZHVsZSc7XG5pbXBvcnQgeyBGZWF0dXJlc0NvbmZpZ01vZHVsZSB9IGZyb20gJy4vZmVhdHVyZXMtY29uZmlnL2ZlYXR1cmVzLWNvbmZpZy5tb2R1bGUnO1xuaW1wb3J0IHsgR2xvYmFsTWVzc2FnZU1vZHVsZSB9IGZyb20gJy4vZ2xvYmFsLW1lc3NhZ2UvZ2xvYmFsLW1lc3NhZ2UubW9kdWxlJztcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICcuL2h0dHAvaHR0cC5tb2R1bGUnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSB9IGZyb20gJy4vaTE4bi9pMThuLm1vZHVsZSc7XG5pbXBvcnQgeyBMYXp5TG9hZGluZ01vZHVsZSB9IGZyb20gJy4vbGF6eS1sb2FkaW5nL2xhenktbG9hZGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgQmFzZU9jY01vZHVsZSB9IGZyb20gJy4vb2NjL2Jhc2Utb2NjLm1vZHVsZSc7XG5pbXBvcnQgeyBNZXRhVGFnQ29uZmlnTW9kdWxlIH0gZnJvbSAnLi9vY2MvY29uZmlnL21ldGEtdGFnLWNvbmZpZy5tb2R1bGUnO1xuaW1wb3J0IHsgUHJvY2Vzc01vZHVsZSB9IGZyb20gJy4vcHJvY2Vzcy9wcm9jZXNzLm1vZHVsZSc7XG5pbXBvcnQgeyBTaXRlQ29udGV4dE1vZHVsZSB9IGZyb20gJy4vc2l0ZS1jb250ZXh0L3NpdGUtY29udGV4dC5tb2R1bGUnO1xuaW1wb3J0IHsgU3RhdGVNb2R1bGUgfSBmcm9tICcuL3N0YXRlL3N0YXRlLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBTdGF0ZU1vZHVsZS5mb3JSb290KCksXG4gICAgQ29uZmlnTW9kdWxlLmZvclJvb3QoKSxcbiAgICBDb25maWdJbml0aWFsaXplck1vZHVsZS5mb3JSb290KCksXG4gICAgQ29uZmlnVmFsaWRhdG9yTW9kdWxlLmZvclJvb3QoKSxcbiAgICBJMThuTW9kdWxlLmZvclJvb3QoKSxcbiAgICBDbXNNb2R1bGUuZm9yUm9vdCgpLFxuICAgIEdsb2JhbE1lc3NhZ2VNb2R1bGUuZm9yUm9vdCgpLFxuICAgIFByb2Nlc3NNb2R1bGUuZm9yUm9vdCgpLFxuICAgIEZlYXR1cmVzQ29uZmlnTW9kdWxlLmZvclJvb3QoKSxcbiAgICBTaXRlQ29udGV4dE1vZHVsZS5mb3JSb290KCksIC8vIHNob3VsZCBiZSBpbXBvcnRlZCBhZnRlciBSb3V0ZXJNb2R1bGUuZm9yUm9vdCwgYmVjYXVzZSBpdCBvdmVyd3JpdGVzIFVybFNlcmlhbGl6ZXJcbiAgICBNZXRhVGFnQ29uZmlnTW9kdWxlLmZvclJvb3QoKSxcbiAgICBCYXNlT2NjTW9kdWxlLmZvclJvb3QoKSxcbiAgICBMYXp5TG9hZGluZ01vZHVsZS5mb3JSb290KCksXG4gICAgSHR0cE1vZHVsZS5mb3JSb290KCksXG5cbiAgICAvKiBUaGlzIG1vZHVsZSBzaG91bGQgYmUgaW1wb3J0ZWQgYnkgZGVmYXVsdCBzdGFydGluZyBmcm9tIHZlcnNpb24gNy4wIChDWFNQQS0zNjgwKSovXG4gICAgLy9FcnJvckhhbmRsaW5nTW9kdWxlLmZvclJvb3QoKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQmFzZUNvcmVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEJhc2VDb3JlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBCYXNlQ29yZU1vZHVsZSxcbiAgICB9O1xuICB9XG59XG4iXX0=