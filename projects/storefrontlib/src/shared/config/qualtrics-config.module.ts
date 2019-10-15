import { NgModule } from '@angular/core';
import { Config, provideConfig } from '@spartacus/core';
import { QualtricsConfig } from './qualtrics-config';

@NgModule({
  providers: [
    provideConfig({
      qualtrics: {},
    }),
    {
      provide: QualtricsConfig,
      useExisting: Config,
    },
  ],
})
export class QualtricsConfigModule {}
