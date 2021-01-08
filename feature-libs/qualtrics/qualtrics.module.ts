import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  QualtricsComponentsModule,
  QualtricsConfig,
} from '@spartacus/qualtrics/components';

@NgModule({
  imports: [QualtricsComponentsModule],
  providers: [
    provideDefaultConfig(<QualtricsConfig>{
      qualtrics: {
        scriptSource: 'assets/qualtrics.js',
      },
    }),
  ],
})
export class QualtricsModule {}
