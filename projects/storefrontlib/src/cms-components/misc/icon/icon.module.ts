import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Config, ConfigModule } from '@spartacus/core';
import { defaultIconConfig } from './config/default-icon.config';
import { IconConfig } from './config/icon.config';
import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig(<IconConfig>defaultIconConfig),
  ],
  providers: [{ provide: IconConfig, useExisting: Config }],
  exports: [IconComponent],
})
export class IconModule {}
