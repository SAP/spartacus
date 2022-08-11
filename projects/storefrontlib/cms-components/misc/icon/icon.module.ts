import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultIconConfig } from './default-icon.config';
import { fontawesomeIconConfig } from './fontawesome-icon.config';
import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultIconConfig),
    // TODO: move the opinionated fontawesome config to a recipe
    provideDefaultConfig(fontawesomeIconConfig),
  ],
  exports: [IconComponent],
})
export class IconModule {}
