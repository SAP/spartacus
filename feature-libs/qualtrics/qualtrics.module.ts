import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { QualtricsComponentsModule } from '@spartacus/qualtrics/components';
import { QualtricsConfig } from './components/qualtrics-loader';

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
