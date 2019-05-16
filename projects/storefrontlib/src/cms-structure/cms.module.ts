import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  CmsModule as CmsCoreModule,
  Config,
  ConfigModule,
  defaultCmsModuleConfig,
} from '@spartacus/core';
import { CmsPageGuard } from './guards/index';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(defaultCmsModuleConfig),
    CmsCoreModule,
  ],
  providers: [CmsPageGuard, { provide: CmsConfig, useExisting: Config }],
})
export class CmsModule {}
