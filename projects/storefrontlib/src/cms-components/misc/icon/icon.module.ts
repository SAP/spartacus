import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { IconComponent } from './icon.component';
import { IconConfig } from './icon.config';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule],
  providers: [{ provide: IconConfig, useExisting: Config }],
  exports: [IconComponent],
})
export class IconModule {}
