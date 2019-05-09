import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Config, ConfigModule } from '@spartacus/core';

import { defaultIconConfig } from './default-icon-config';
import { IconComponent } from './icon.component';
import { IconConfig } from './icon.config';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule, ConfigModule.withConfig(defaultIconConfig)],
  providers: [{ provide: IconConfig, useExisting: Config }],
  exports: [IconComponent],
})
export class IconModule {}
