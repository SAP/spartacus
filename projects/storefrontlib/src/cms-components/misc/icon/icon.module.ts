import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Config, provideDefaultConfig } from '@spartacus/core';
import { fontawesomeIconConfig } from './fontawesome-icon.config';
import { IconComponent } from './icon.component';
import { IconConfig } from './icon.model';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(fontawesomeIconConfig),
    { provide: IconConfig, useExisting: Config },
  ],
  exports: [IconComponent],
})
export class IconModule {}
