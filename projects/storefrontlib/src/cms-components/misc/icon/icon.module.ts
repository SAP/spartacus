import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { IconConfig } from './config/icon.config';
import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule],
  providers: [{ provide: IconConfig, useExisting: Config }],
  exports: [IconComponent],
})
export class IconModule {}
