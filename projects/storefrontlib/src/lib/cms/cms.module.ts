import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CmsTicketInterceptor } from './smart-edit/cms-ticket.interceptor';

import {
  ConfigModule,
  Config,
  CmsConfig,
  CmsModule as CmsCoreModule,
  defaultCmsModuleConfig
} from '@spartacus/core';

// components
import { components } from './components/index';

// guards
import { guards } from './guards/index';

import { OutletModule } from '../outlet/outlet.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(defaultCmsModuleConfig),
    OutletModule,
    CmsCoreModule
  ],
  providers: [
    ...guards,
    { provide: CmsConfig, useExisting: Config },
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
