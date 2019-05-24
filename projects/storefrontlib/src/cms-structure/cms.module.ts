import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  CmsModule as CmsCoreModule,
  Config,
  ConfigModule,
  defaultCmsModuleConfig,
} from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(defaultCmsModuleConfig),
    CmsCoreModule,
  ],
  providers: [{ provide: CmsConfig, useExisting: Config }],
})
export class CmsModule {}
