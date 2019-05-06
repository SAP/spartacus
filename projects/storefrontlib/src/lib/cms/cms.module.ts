import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  CmsModule as CmsCoreModule,
  Config,
  ConfigModule,
  defaultCmsModuleConfig,
} from '@spartacus/core';
import { OutletDirective } from '../../cms-structure/outlet/outlet.directive';
import { OutletModule } from '../../cms-structure/outlet/outlet.module';
// guards
import { guards } from './guards/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(defaultCmsModuleConfig),
    OutletModule,
    CmsCoreModule,
  ],
  providers: [...guards, { provide: CmsConfig, useExisting: Config }],
  declarations: [],
  exports: [OutletDirective],
})
export class CmsModule {}
