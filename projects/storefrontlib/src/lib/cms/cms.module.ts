import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducerToken, reducerProvider } from './store/reducers/index';
import { effects } from './store/effects/index';
import { metaReducers } from './store/reducers/index';

// components
import { components } from './components/index';

// guards
import { guards } from './guards/index';

// services
import { CmsModuleConfig } from './cms-module-config';
import { OccCmsService } from './services/occ-cms.service';
import { ComponentMapperService } from './services/component-mapper.service';
import { DefaultPageService } from './services/default-page.service';

const services: any[] = [
  OccCmsService,
  ComponentMapperService,
  DefaultPageService
];

export function overrideCmsModuleConfig(configOverride: any) {
  return { ...new CmsModuleConfig(), ...configOverride };
}

export const CMS_MODULE_CONFIG_OVERRIDE: InjectionToken<
  string
> = new InjectionToken<string>('CMS_MODULE_CONFIG_OVERRIDE');

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('cms', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [reducerProvider, ...services, ...guards, CmsModuleConfig],
  declarations: [...components],
  exports: [...components]
})
export class CmsModule {
  static forRoot(configOverride?: any): ModuleWithProviders {
    return {
      ngModule: CmsModule,
      providers: [
        {
          provide: CMS_MODULE_CONFIG_OVERRIDE,
          useValue: configOverride
        },
        {
          provide: CmsModuleConfig,
          useFactory: overrideCmsModuleConfig,
          deps: [CMS_MODULE_CONFIG_OVERRIDE]
        }
      ]
    };
  }
}
