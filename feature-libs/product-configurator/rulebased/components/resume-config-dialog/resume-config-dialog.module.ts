import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorResumeConfigDialogComponent } from './configurator-resume-config-dialog.component';
import { defaultConfiguratorResumeConfigDialogLayoutConfig } from './default-configurator-resume-config-dialog-layout.config';

@NgModule({
  declarations: [ConfiguratorResumeConfigDialogComponent],
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultConfiguratorResumeConfigDialogLayoutConfig),
  ],
})
export class ResumeConfigDialogModule {}
