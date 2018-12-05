import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  ConfigModule,
  Config,
  CmsModuleConfig,
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
    OutletModule
  ],
  providers: [...guards, { provide: CmsModuleConfig, useExisting: Config }],
  declarations: [...components],
  exports: [...components]
})
export class CmsModule {}
