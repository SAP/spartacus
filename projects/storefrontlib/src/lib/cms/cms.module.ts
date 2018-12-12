import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ConfigModule, Config } from '@spartacus/core';

import { reducerToken, reducerProvider } from './store/reducers/index';
import { effects } from './store/effects/index';
import { metaReducers } from './store/reducers/index';

// components
import { components } from './components/index';

// guards
import { guards } from './guards/index';

import { CmsModuleConfig, defaultCmsModuleConfig } from './cms-module-config';
import { OccCmsService } from './services/occ-cms.service';
import { ComponentMapperService } from './services/component-mapper.service';
import { DefaultPageService } from './services/default-page.service';
import { OutletModule } from '../outlet/outlet.module';

import { CmsTicketInterceptor } from './smart-edit/cms-ticket.interceptor';

const services: any[] = [
  OccCmsService,
  ComponentMapperService,
  DefaultPageService
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('cms', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(defaultCmsModuleConfig),
    OutletModule
  ],
  providers: [
    reducerProvider,
    ...services,
    ...guards,
    { provide: CmsModuleConfig, useExisting: Config },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CmsTicketInterceptor,
      multi: true
    }
  ],
  declarations: [...components],
  exports: [...components]
})
export class CmsModule {}
